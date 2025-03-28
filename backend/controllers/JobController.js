const mongoose = require('mongoose');
const Job = require('../models/Job');

const createJob = async (req, res) => {
  try {

    const employerId = mongoose.Types.ObjectId(req.user.id);
    
    const jobData = {
      ...req.body,
      employerId: employerId
    };

    console.log('Job Creation Data:', jobData);

    const job = await Job.create(jobData);
    
    res.status(201).json({ 
      success: true, 
      data: job 
    });
  } catch (error) {
    console.error('Job Creation Error:', error);
    res.status(500).json({ 
      success: false, 
      message: error.message,
      errorDetails: error.errors 
    });
  }
};

const getJobs = async (req, res) => {
  try {
    const query = {};
    if (req.query.status) {
      query.status = req.query.status;
    }
    if (req.query.jobType) {
      query.jobType = req.query.jobType;
    }
    if (req.query.location) {
      query.location = { $regex: req.query.location, $options: 'i' };
    }
    if (req.query.keyword) {
      query.$or = [
        { title: { $regex: req.query.keyword, $options: 'i' } },
        { company: { $regex: req.query.keyword, $options: 'i' } }
      ];
    }
    
    const jobs = await Job.find(query)
      .sort({ createdAt: -1 })
      .populate('employerId', 'companyName email');
    
    res.status(200).json({ 
      success: true, 
      count: jobs.length, 
      data: jobs 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


const getJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id)
      .populate('employerId', 'name email');
    
    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }
    
    res.status(200).json({ success: true, data: job });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateJob = async (req, res) => {
  try {
    let job = await Job.findById(req.params.id);
    
    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }
    
    if (job.employerId.toString() !== req.user.id) {
      return res.status(401).json({ success: false, message: 'Not authorized to update this job' });
    }
    
    job = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    
    res.status(200).json({ success: true, data: job });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    
    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }
    
    if (job.employerId.toString() !== req.user.id) {
      return res.status(401).json({ success: false, message: 'Not authorized to delete this job' });
    }
    
    await job.remove();
    
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getEmployerJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ employerId: req.user.id })
      .sort({ createdAt: -1 });
    
    res.status(200).json({ 
      success: true, 
      count: jobs.length, 
      data: jobs 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createJob,
  getJobs,
  getJob,
  updateJob,
  deleteJob,
  getEmployerJobs
};
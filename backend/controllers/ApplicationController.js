const Application = require('../models/Application');
const Job = require('../models/Job');

const createApplication = async (req, res) => {
  try {
    req.body.applicantId = req.user.id;

    const job = await Job.findById(req.body.jobId);
    
    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }
    
    if (job.status !== 'open') {
      return res.status(400).json({ success: false, message: 'Job is not open for applications' });
    }
    
    const existingApplication = await Application.findOne({
      jobId: req.body.jobId,
      applicantId: req.user.id
    });
    
    if (existingApplication) {
      return res.status(400).json({ success: false, message: 'You have already applied to this job' });
    }
    
    const application = await Application.create(req.body);
    
    res.status(201).json({ success: true, data: application });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getJobApplications = async (req, res) => {
  try {
    const job = await Job.findById(req.params.jobId);
    
    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }
    
    if (job.employerId.toString() !== req.user.id) {
      return res.status(401).json({ success: false, message: 'Not authorized to view these applications' });
    }
    
    const applications = await Application.find({ jobId: req.params.jobId })
      .populate('applicantId', 'name email')
      .sort({ appliedAt: -1 });
    
    res.status(200).json({ 
      success: true, 
      count: applications.length, 
      data: applications 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getUserApplications = async (req, res) => {
  try {
    const applications = await Application.find({ applicantId: req.user.id })
      .populate('jobId', 'title company location')
      .sort({ appliedAt: -1 });
    
    res.status(200).json({ 
      success: true, 
      count: applications.length, 
      data: applications 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getApplication = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id)
      .populate('jobId', 'title company location')
      .populate('applicantId', 'name email');
    
    if (!application) {
      return res.status(404).json({ success: false, message: 'Application not found' });
    }
    
    const job = await Job.findById(application.jobId);
    
    if (!job) {
      return res.status(404).json({ success: false, message: 'Associated job not found' });
    }
    
    if (application.applicantId._id.toString() !== req.user.id && 
        job.employerId.toString() !== req.user.id) {
      return res.status(401).json({ success: false, message: 'Not authorized to view this application' });
    }
    
    res.status(200).json({ success: true, data: application });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateApplicationStatus = async (req, res) => {
  try {
    let application = await Application.findById(req.params.id);
    
    if (!application) {
      return res.status(404).json({ success: false, message: 'Application not found' });
    }
    
    const job = await Job.findById(application.jobId);
    
    if (!job) {
      return res.status(404).json({ success: false, message: 'Associated job not found' });
    }
    
    if (job.employerId.toString() !== req.user.id) {
      return res.status(401).json({ success: false, message: 'Not authorized to update this application' });
    }
    

    application = await Application.findByIdAndUpdate(
      req.params.id, 
      { status: req.body.status }, 
      {
        new: true,
        runValidators: true
      }
    );
    
    res.status(200).json({ success: true, data: application });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteApplication = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);
    
    if (!application) {
      return res.status(404).json({ success: false, message: 'Application not found' });
    }
    
    if (application.applicantId.toString() !== req.user.id) {
      return res.status(401).json({ success: false, message: 'Not authorized to delete this application' });
    }
    
    await application.remove();
    
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createApplication,
  getJobApplications,
  getUserApplications,
  getApplication,
  updateApplicationStatus,
  deleteApplication
};
const EmployerProfile = require('../models/EmployerProfile');

const createOrUpdateEmployerProfile = async (req, res) => {
  try {
    let profile = await EmployerProfile.findOne({ userId: req.user.id });
    
    if (profile) {
      profile = await EmployerProfile.findOneAndUpdate(
        { userId: req.user.id }, 
        req.body,
        {
          new: true,
          runValidators: true
        }
      );
      return res.status(200).json({ success: true, data: profile });
    }
    
    req.body.userId = req.user.id;
    profile = await EmployerProfile.create(req.body);
    
    res.status(201).json({ success: true, data: profile });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getMyEmployerProfile = async (req, res) => {
  try {
    const profile = await EmployerProfile.findOne({ userId: req.user.id });
    
    if (!profile) {
      return res.status(404).json({ success: false, message: 'Profile not found' });
    }
    
    res.status(200).json({ success: true, data: profile });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getEmployerProfileByUserId = async (req, res) => {
  try {
    const profile = await EmployerProfile.findOne({ userId: req.params.userId });
    
    if (!profile) {
      return res.status(404).json({ success: false, message: 'Profile not found' });
    }
    
    res.status(200).json({ success: true, data: profile });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getAllEmployerProfiles = async (req, res) => {
  try {
    const profiles = await EmployerProfile.find()
      .populate('userId', 'name email');
    
    res.status(200).json({ 
      success: true, 
      count: profiles.length, 
      data: profiles 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteEmployerProfile = async (req, res) => {
  try {
    const profile = await EmployerProfile.findOne({ userId: req.user.id });
    
    if (!profile) {
      return res.status(404).json({ success: false, message: 'Profile not found' });
    }
    
    await profile.remove();
    
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createOrUpdateEmployerProfile,
  getMyEmployerProfile,
  getEmployerProfileByUserId,
  getAllEmployerProfiles,
  deleteEmployerProfile
};
const { expect } = require('chai');
const mongoose = require('mongoose');
const app = require('../server');


describe('Task Manager API Tests', function() {
  describe('Basic Server Configuration', function() {
    it('should have a working environment', function() {
      expect(process.env.NODE_ENV || 'development').to.be.a('string');
    });

    it('should have defined models', function() {
      const User = require('../models/User');
      const Task = require('../models/Task');
      expect(User).to.not.be.undefined;
      expect(Task).to.not.be.undefined;
    });
  });

  describe('User Model', function() {
    const User = require('../models/User');
    
    it('should create a valid user schema', function() {
      expect(User.schema.path('email')).to.exist;
      expect(User.schema.path('password')).to.exist;
    });
  });
  
  describe('Task Model', function() {
    const Task = require('../models/Task');
    
    it('should create a valid task schema', function() {
      expect(Task.schema.path('title')).to.exist;
      expect(Task.schema.path('description')).to.exist;
    });
  });

  describe('Routes Configuration', function() {
    it('should have task routes configured', function() {
      const taskRoutes = require('../routes/TaskRoutes');
      expect(taskRoutes).to.not.be.undefined;
    });

    it('should have auth routes configured', function() {
      const authRoutes = require('../routes/authRoutes');
      expect(authRoutes).to.not.be.undefined;
    });
  });

  describe('Controllers', function() {
    it('should have task controller defined', function() {
      const taskController = require('../controllers/TaskController');
      expect(taskController).to.not.be.undefined;
    });

    it('should have auth controller defined', function() {
      const authController = require('../controllers/authController');
      expect(authController).to.not.be.undefined;
    });
  });
});



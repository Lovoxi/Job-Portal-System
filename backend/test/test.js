const { expect } = require('chai');
const mongoose = require('mongoose');
const app = require('../server');
//111
describe('Job Portal API Tests', function() {
   describe('Basic Server Configuration', function() {
     it('should have a working environment', function() {
       expect(process.env.NODE_ENV || 'development').to.be.a('string');
     });

     it('should have defined models', function() {
       const User = require('../models/User');
       expect(User).to.not.be.undefined;
     });
   });

   describe('User Model', function() {
     const User = require('../models/User');

     it('should create a valid user schema', function() {
       expect(User.schema.path('email')).to.exist;
       expect(User.schema.path('password')).to.exist;
     });
   });

   describe('Routes Configuration', function() {
     it('should have auth routes configured', function() {
       const authRoutes = require('../routes/authRoutes');
       expect(authRoutes).to.not.be.undefined;
     });
   });

   describe('Controllers', function() {
     it('should have auth controller defined', function() {
       const authController = require('../controllers/authController');
       expect(authController).to.not.be.undefined;
     });
   });
});
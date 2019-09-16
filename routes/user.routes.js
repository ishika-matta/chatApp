const express=require('express');
const router=express.Router();
const user=require('../controllers/user.controller');

router.post('/register',user.registerController);
router.post('/login',user.loginController);
router.post('/resetPassword',user.resetPasswordController);
router.post('/forgotPassword',user.forgotPasswordController);

module.exports=router;

//const {check, validationResult} = require('express-validator/check');





























/*
module.exports = (app) => {
    const user = require('../controllers/user.controller');

    // Register a new user
    app.post('/register', user.registerController());
    /*

    // Retrieve all Notes
    app.get('/notes', notes.findAll);

    // Retrieve a single Note with noteId
    app.get('/notes/:noteId', notes.findOne);

    // Update a Note with noteId
    app.put('/notes/:noteId', notes.update);

    // Delete a Note with noteId
    app.delete('/notes/:noteId', notes.delete);
    
}
*/








/*const express=require('express');
const router=express.Router();
const servicesUser=require('../services/user.services');

router.post('/regsiter',servicesUser.register);
module.exports=router;*/




















/*module.exports = (app) => {
    const user = require('../controllers/user.controller');

    // New user registration
    app.post('/user', user.register);

    // Login user
    app.get('/user', user.login);

    // Forgot password
    app.get('/user', user.forgotPassword);

    // Reset password
    app.put('/user', user.resetPassword);
*/
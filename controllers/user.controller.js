const userService = require('../services/user.services');
const expressValidator = require('express-validator');
const validator = require("email-validator");
const passport = require('passport');

exports.registerController = (req, res) => {
  let responseResult = {};

  req.checkBody("firstName", 'first name is required').not().isEmpty();
  req.checkBody("lastName", 'last name is required').not().isEmpty();

  //let email=req.body.email;
  req.check("email", 'valid email is required').isEmail();
  /*req.check("email",'email is already in use').custom(email => {
   if (alreadyHaveEmail(email)) {
     throw new Error('Email already registered')
   }
 }),*/

  //let pass=req.body.password;
  req.check("password", 'password must be 5 characters long').isLength({ min: 5 });
  var error = req.validationErrors();
  if (error) {
    responseResult.success = false;
    responseResult.message = "validation error";
    //responseResult.errors = error;
    console.log(error);
    return res.status(400).send(responseResult);

  }
  else {
    var userObj = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password

    }
    userService.registerService(userObj, (err, result) => {

      if (err) {
        responseResult.success = false;
        responseResult.message = "registration error";
        responseResult.errors = err;
        return res.status(400).send(responseResult);

      }

      else {
        responseResult.success = true;
        responseResult.result = result;
        return res.status(201).send(responseResult);
      }
    })
  }
}

exports.loginController = (req, res) => {
  let responseResult = {};
  var userObj = {
    email: req.body.email,
    password: req.body.password
  }


  userService.loginService(userObj, (err, result) => {

    if (err) {
      responseResult.success = false;
      //responseResult.message = "invalid email id/password";
      responseResult.errors = err;
      return res.status(400).send(responseResult);

    }

    else {
      responseResult.success = true;
      responseResult.result = result;
      responseResult.message = "verified.logged in";
      return res.status(200).send(responseResult);
    }
  })
}

exports.resetPasswordController = (req, res) => {
  let responseResult = {};
  var userObj = {
    email:req.user.email,
    token: req.headers.token,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword
  }
  console.log(userObj.email);


  userService.resetPasswordService(userObj, (err, result) => {

    if (err) {
      responseResult.success = false;
      responseResult.message = "reset password not done";
      responseResult.errors = err;
      return res.status(400).send(responseResult);

    }

    else {
      responseResult.success = true;
      responseResult.result = result;
      responseResult.message = "reset password done";
      return res.status(200).send(responseResult);
    }
  })
}

exports.forgotPasswordController = (req, res) => {
  let responseResult = {};
  var userObj = {
    email: req.body.email,
  }


  userService.forgotPasswordService(userObj, (err, result) => {

    if (err) {
      responseResult.success = false;
      responseResult.message = "forgot password mail sent";
      responseResult.errors = err;
      return res.status(400).send(responseResult);

    }

    else {
      responseResult.success = true;
      responseResult.result = result;
      responseResult.message = "forgot password mail sent";
      return res.status(200).send(responseResult);
    }
  })
}




/*module.exports.login=(req,res,next)=>{
  passport.authenticate('local',(err,user,info)=>{
    if(err)
    return res.status(400).json(err);
    else if(user)
    return res.status(200).json({"token":user.generateJwt()})
    else
    return res.status(404).json(info);

  })(req,res);
}*/










const userService = require('../services/user.services');
const expressValidator = require('express-validator');

exports.registerController = (req , res) => {
 let responseResult={};
 var userObj={
     firstName:req.body.firstName,
     lastName:req.body.lastName,
     email:req.body.email,
     password:req.body.password

 }
   userService.registerService(userObj , (err , result) => {


        req.checkBody(req.body.firstName, 'first name is required').not().isEmpty();
        let email=req.body.email;
       req.checkBody(email,'valid email is required').isEmail();
        let pass=req.body.password;
        req.checkBody(pass,'password must be 5 characters long').isLength({min:5});
        var error=req.validationError();
    if(err||error){
           responseResult.success = false;
           responseResult.errors = err;
           return res.status(400).send(responseResult); 
    }
    else{
            responseResult.success = true;
            responseResult.result = result;
            return res.status(200).send(responseResult); 
    }
   })
}

    
    
    
    





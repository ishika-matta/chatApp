const passport=require('passport');
const bodyParser = require('body-parser');
const cors=require('cors');
const localStrategy=require('passport-local').Strategy;
const mongoose=require('mongoose');
const userSchema=require('../models/user.model')
//var userSchema=new mongoose.Schema({ name: 'userc'});
var user=mongoose.model('userModel',userSchema);
//var user=mongoose.model('userCollection');
passport.use(
    new localStrategy({ usernameField:'username'},//'email'},
    (username,password,done)=>{
        user.findOne({username:username},
            (err,user)=>{
                if(err)
                return done(err);
                //else if(!user)
                //return done(null,false,{message:'Email is  not registered'});
                else if(!user.verifyPassword(password))
                return done(null,false,{message:'Wrong password'});
                else
                return done(null,password);

            })
    })
)
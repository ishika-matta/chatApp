const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/database.config');
const nodeMailer = require('nodemailer');

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        //required:true
    },
    lastName: {
        type: String,
        //required:true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    confirmPassword: {
        type: String,

    },
    token: {
        type: String,
        default: null
    },
    saltSecret: String
},
    {
        timestamps: true
    });



userSchema.pre('save', function (next) {
    const bcrypt = require('bcrypt');
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(this.password, salt, (err, hash) => {
            this.password = hash;
            this.saltSecret = salt;
            next();
        });
    });
});



let userCollection = mongoose.model('User', userSchema);

class userModel {
    hash(password) {
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(password, salt);
        return hash;


    }

    register(body, callback) {

        const user = new userCollection({
            firstName: body.firstName,
            lastName: body.lastName,
            email: body.email,
            password: body.password,

        })
        var reg = user.save((err, result) => {
            if (err)
                callback({ message: "error" });

            else {
                console.log("user registration done");
                callback(null, result);
            }
        })
        return reg;
    }


    login(userData, callback) {
        const bycrpt = require('bcrypt');
        userCollection.findOne({ email: userData.email }, function (err, res) {
            if (err) {
                callback(err);
                console.log("error ....92");
            }
            else if (!res) {
                console.log("this email is not registered");
                callback({ message: "this email is not registered" });
            }

            else {
                bycrpt.compare(userData.password, res.password, function (err, result) {
                    if (result === true) {
                        console.log(".......116");
                        var loginToken = jwt.sign({ _id: res._id, name: res.firstName, email: res.email }, db.JWT_SECRET, { expiresIn: '2s' });

                        /*res.updateOne({token:loginToken },(err, res0)=>{
                            if (err) 
                                callback(err);
                                else
                                callback(null, res0);
                         })*/

                        callback(null, res);


                    }
                    else {
                        console.log("password did not match");
                        callback({ message: "password did not match" });
                    }

                });
            }
        })
    }
    forgotPassword(userData, callback) {
        userCollection.findOne({ email: userData.email }, function (err, res) {
            if (err) {
                callback(err);
                console.log("error inside forgot password....155");
            }
            else if (!res) {
                console.log("this email is not registered");
                callback({ message: "this email is not registered" });
            }
            else {
                //here for sending emails
                var forgotPasswordToken = jwt.sign({  email: res.email }, db.JWT_SECRET, { expiresIn: '5d' });

                userCollection.updateOne({ email: userData.email }, { token: forgotPasswordToken }, (err, res0) => {
                    if (err)
                        callback(err);
                    else {
                        //callback(null, res0);
                        console.log("user registered here at line 189.......");
                        var transporter = nodeMailer.createTransport({
                            service: "Gmail",
                            auth: {
                                user: "tommoody1107@gmail.com",
                                pass: 'bridgelabs'
                            }
                        });

                        var mailOptions = {
                            from: "tommoody1107@gmail.com",
                            to: userData.email,
                            subject: 'reset password',
                            text: 'click the link to reset the password http://localhost:5000/resetPassword' + forgotPasswordToken,

                        };
                        transporter.sendMail(mailOptions, function (err, info) {
                            if (err) {
                                callback(null, err);
                            }
                            console.log('Mail sent:');
                        });

                    }
                });
            }
        });
    }

    resetPassword(userData, callback) {
        
        const bycrpt = require('bcrypt');
        userCollection.findOne({ email: userData.email }, (err, res) => {
            if (err) {
                callback(err);
            }
            else {
                if (res.token === userData.token) {
                    if (userData.password == userData.confirmPassword) {
                        userCollection.updateOne({ email: res.email }, { password: this.hash(userData.password) }, (err, info) => {
                            if (err)
                                callback(err)
                            else {
                                console.log("reset password done..187");
                                callback(null, info);
                            }
                        })
                    }

                    else {
                        console.log("result false ..passwords did not match.....");
                        callback({message: "passwords did not match"});
                    }
                }
                else {
                    console.log("token did not match");
                    callback(err);

                }
              
            }
        })
    }
}







//         (err,user)=>{
//             if(err)
//             return done(err);
//             //else if(!user)
//             //return done(null,false,{message:'Email is  not registered'});
//             else if(!user.verifyPassword(password))
//             return done(null,false,{message:'Wrong password'});
//             else
//             return done(null,password);

//         })

// }



module.exports = new userModel(); 
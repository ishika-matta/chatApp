const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    firstName: {
        type:String,
        required:true
    },
    lastName: {
        type:String,
        required:true
    },
    email: {
        type:String,
        required:true
    },
    password: {
        type:String,
        required:true
    },
    saltSecret:String
},
 {
    timestamps: true
});

userSchema.pre('save',function(next){
    const bcrypt=require('bcrypt');
    bcrypt.genSalt(10,(err,salt)=>{
        bcrypt.hash(this.password,salt,(err,hash)=>{
            this.password=hash;
            this.saltSecret=salt;
            next();
        });
    });
});





let userCollection = mongoose.model('User', userSchema);

class userModel {

    register(body,callback) {

        const user=new userCollection({
            firstName: body.firstName,
            lastName: body.lastName,
            email: body.email,
            password: body.password,

        })
        var reg = user.save((err, result) => {
        if (err) 
        callback(err);
        
         else {
        console.log("user registration done");
        callback(null, result);
        }
        })
        return reg;
        }
        

}
module.exports = new userModel(); 
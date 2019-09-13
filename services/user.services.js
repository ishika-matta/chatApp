
const userModel = require('../models/user.model');

exports.registerService = (body, callback)=>{

userModel.register(body , (err , result) => {
    if(err)
        callback(err);
    else{
        callback(null ,result);
    }
})
}






/*const userModel = require('../models/user.model');

module.exports.register=(req,res,next)=>{
    console.log('inside user services register function');
}*/














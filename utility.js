const jwt=require('jsonwebtoken');
const db=require('../chatApp/config/database.config');
module.exports={
    
    verify(req,res,next){
        var token=req.header("token");
        if(!token)
        return res.status(401).send("token is not provided");
        try{
            const decode=jwt.verify(token,db.JWT_SECRET);
            req.user=decode;
            next();
        }
        catch(err){
            console.log("error in token verification", err);
            res.status(400).send("invalid token");
        }
    }
}

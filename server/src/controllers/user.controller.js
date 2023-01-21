const {createNewUser,login}=require('../models/user.model');


exports.regisetr=(req,res,next)=>{
    //prepare parameters
    const{userName,email,password}=req.body;
    //run method
    createNewUser(userName,email,password)
    .then(()=>{res.send("done")})
    .catch(err=>{
        //custom error =>>email duplicated
        if(err.code===11000 ){
            var error=new Error(`email :${email} is already taken`)
            next(error);
        }
        next(err);
    });

};

exports.postlogin=(req,res,next)=>{
    //prepare parameters
    const{email,password}=req.body;
    //run method
    login(email,password)
    .then(token=>{res.json({token})})
    .catch(err=>{next(err)})

};

exports.me=(req,res,next)=>{
    const{user}=req;
    res.json({user})
};

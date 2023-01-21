const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt=require("bcrypt");
const jwt = require('jsonwebtoken');
 
// define the Schema (the structure of the article)
const UserSchema = new Schema({
  userName: String,
  email: { type: String, required: true, index: true, unique: true },
  password:{ type: String, required: true },
  isAdmin:{ type:Boolean,default:false}
  
});
 
 
// Create a model based on that schema
const User = mongoose.model("User", UserSchema);

// export the model
exports.User=User;


// export the methods
exports.createNewUser=async(userName,email,password)=>{
    try{
        let hash=await bcrypt.hash(password, 10);
        const newUser=new User({
            userName,
            email,
            password:hash
        });
        await newUser.save();
        return ;
    }catch(err){ 
        throw (err);
    }
};

exports.login=async(email,password)=>{
    try{
        const user=await User.findOne({email});
        if(!user){
            throw new Error("no user matches this email")
        }else{
            const matched= await bcrypt.compare(password,user.password);
            if(!matched){
                throw new Error("password is not correct")

            }else{
                const secret = process.env.JWT_SECRET;
                const expire = process.env.JWT_EXPIRATION;
                const token=jwt.sign({ _id: user._id },secret,{ expiresIn: expire });
                return token;
            }
        }
    }catch(err){ 
        throw (err);
    }
};








 





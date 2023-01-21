
const{Item}=require('../models/item.model');


const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// define the Schema (the structure of the article)
const OrderSchema = mongoose.Schema({
    name: {type: String,required:true},
    price: {type: Number,required:true},
    amount: {type: Number,required:true},
    image: { type: String, required: true },
    userId: {type: String,required:true},
    productId: {type: String ,required:true},
    address: {type: String ,required:true},
    phoneNumber:{type:Number,required:true},
    status: {type: String,default: "pending"}

});

// Create a model based on that schema
const Order = mongoose.model("Order", OrderSchema);



// export methods
exports.addOrder=async(user,name,price,amount,productId,address,phoneNumber,itemId,image)=>{
    const newOrder=new Order({
        name,
        price,
        amount,
        productId,
        address,
        image,
        phoneNumber,
        userId:user._id
    });
    try{
        await newOrder.save();
        await Item.findByIdAndDelete(itemId);
        return;
    }catch(err){
        throw(err);
    }
};


 //////failed trial/////

// await Promise.all([

//     newOrder.save()
//     ,
//     Item.findByIdAndDelete(item_id)

// ]);
// return;


exports.deletingOrder=async(user,order_id)=>{
    try{
        const order=await Order.findById(order_id);
        if(order.status==="pending"){
            await Order.findByIdAndDelete(order_id);
            return;
        }else{
            const error=new Error('sorry this order on the way to you so you cant cancel it');
            error.status=401;
            throw (error);
        }
    }catch(err){
        throw(err);
    }
};

//admin 
exports.gettingOrders=async()=>{
    try{
        const orders=await Order.find();
        return orders;
    }catch(err){
        throw(err);
    }
};

//user 
exports.getOrders=async(user)=>{
    try{
        const orders=await Order.find({userId:user._id});
        return orders;
    }catch(err){
        throw(err);
    }
};

exports.updatingOrder=async(order_id)=>{
    try{
        await Order.updateOne({_id:order_id},{status:"sent"});
        return;
    }catch(err){
        throw(err);
    }
};





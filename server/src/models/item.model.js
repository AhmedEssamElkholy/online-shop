const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// define the Schema (the structure of the article)
const ItemSchema = mongoose.Schema({
  name: {type: String , required:true},
  price: {type: Number ,required:true},
  amount: {type: Number ,required:true},
  image: { type: String, required: true },
  userId: {type: String ,required:true},
  productId: {type: String ,required:true},
  timestamp: Number
});

// Create a model based on that schema
const Item = mongoose.model("Item", ItemSchema);

//export the model
exports.Item=Item;



//export methods
exports.addItem=async(user,name,price,amount,productId,image)=>{
    try{
        const newItem=new Item({
            name,
            price,
            amount,
            userId:user._id,
            productId,
            image
        });
        await newItem.save();
        return;
    }catch(err){
        throw(err);
    }
};


exports.gettingItems=async(user)=>{
    try{
        const items=await Item.find({userId:user._id});
        return items;
    }catch(err){
        throw(err);
    }
};

exports.deletingItem=async(user,item_id)=>{
    try{
        // check failedddd
        await Item.findByIdAndDelete(item_id);
        return;
    }catch(err){
        throw(err);
    }
};

exports.updatingItem=async(user,item_id,amount)=>{
    try{
        // check failedddd
        await Item.updateOne({_id:item_id},{amount});
        return;
    }catch(err){
        throw(err);
    }
};
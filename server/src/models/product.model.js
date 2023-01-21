const mongoose = require("mongoose");
const Schema = mongoose.Schema;
 
// define the Schema (the structure of the article)
const ProductSchema = mongoose.Schema({
  name: { type: String, required: true},
  image: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true}
});
 
// Create a model based on that schema
const Product = mongoose.model("Product", ProductSchema);


//export methods
exports.addProduct=async(name,image,price,description,category)=>{
    try{
      const newproduct =new Product({
        name,
        image,
        price,
        description,
        category
      });
      await newproduct.save();
      return;
    }catch(err){
        throw(err);
    }
};

exports.gettingProducts=async(category)=>{
  const categories=["phones","clothes","computers"];
  try{
    if( category && categories.includes(category) ){
      const products=await Product.find({category});
      return products;
    }else{
      const products=await Product.find();
      return products;
    }

  }catch(err){
    throw(err);
  }
};

exports.updatingProduct=async(productId,newData)=>{
  try{
    await Product.updateOne({_id:productId},newData);
    return;

  }catch(err){
    throw(err);
  }
};

exports.deletingProduct=async(productId)=>{
  try{
    await Product.findByIdAndDelete(productId);
    return;

  }catch(err){
    throw(err);
  }
};
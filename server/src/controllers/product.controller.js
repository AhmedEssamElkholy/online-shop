const{addProduct,gettingProducts,updatingProduct,deletingProduct}=require('../models/product.model');


exports.postProduct=(req,res,next)=>{
    
    //prepare parameters
    const {user}=req;
    const{name,price,description,category}=req.body;
    const image=req.file.filename;

    //run method
    addProduct(name,image,price,description,category)
    .then(()=>{res.send("added")})
    .catch(err=>{
        next(err);
        
    });

};

exports.getProduct=(req,res,next)=>{
    //prepare parameters
    const{user}=req;
    const category=req.params.category;

    //run method
    gettingProducts(category)
    .then((products)=>{
        res.json(products)
    } )
    .catch(err=>{
        next(err);
    })

};

exports.updateProduct=(req,res,next)=>{
    //prepare parameters
    const{user}=req;
    const newData=req.body;
        // console.log(newData);
    const productId=req.params.productId;

    //run method
    updatingProduct(productId,newData)
    .then(()=>{res.send("updated")})
    .catch(err=>{
        next(err)
    })
    
};

exports.deleteProduct=(req,res,next)=>{
    //prepare parameters
    const{user}=req;
    const productId=req.params.productId;

    //run method
    deletingProduct(productId)
    .then(()=>{res.send("deleted")})
    .catch(err=>{
        next(err)
    })
    
};
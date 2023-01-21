const{addItem,gettingItems,deletingItem,updatingItem}=require('../models/item.model');

exports.postItem=(req,res,next)=>{
    // prepare parameters
    const{user}=req;
    const{name,price,amount,productId,image}=req.body;

    //run method
    addItem(user,name,price,amount,productId,image)
    .then(()=>{res.send("added")})
    .catch(err=>{
        // console.log(err);
        next(err);
    })
};

exports.getItem=(req,res,next)=>{
    //prepaer parameters
    const{user}=req;

    //run method
    gettingItems(user)
    .then((items=>{res.json(items)}))
    .catch(err=>{
        console.log(err);
        next(err);
    });

};

exports.deleteItem=(req,res,next)=>{
    //prepaer parameters
    const{user}=req;
    const item_id=req.params.item_id;

    //run method
    deletingItem(user,item_id)
    .then(()=>{res.send("deleted")})
    .catch(err=>{
        console.log(err);
        next(err);
    });

};


exports.updateItem=(req,res,next)=>{
    //prepaer parameters
    const{user}=req;
    const item_id=req.params.item_id;
    const{amount}=req.body;

    //run method
    updatingItem(user,item_id,amount)
    .then(()=>{res.send("updated")})
    .catch(err=>{
        console.log(err);
        next(err);
    });

};
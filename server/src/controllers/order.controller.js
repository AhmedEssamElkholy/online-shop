const{addOrder,deletingOrder,gettingOrders,getOrders,updatingOrder}=require('../models/order.model');


exports.postOrder=(req,res,next)=>{
    //prepare parameters
    const{user}=req;
    const{name,price,amount,productId,address,phoneNumber,itemId,image}=req.body;

    //run method
    addOrder(user,name,price,amount,productId,address,phoneNumber,itemId,image)
    .then(()=>{res.send("order is added and item is deleted")})
    .catch(err=>{
        console.log(err);
        next(err);
    })
};

exports.deleteOrder=(req,res,next)=>{
    //prepare parameters
    const{user}=req;
    const order_id = req.params.order_id;
    
    //run method
    deletingOrder(user,order_id)
    .then(()=>{res.send("deleted")})
    .catch(err=>{
        console.log(err);
        next(err);
    })
};
//admin
exports.getOrder=(req,res,next)=>{
    //prepare parameters

    //run method
    gettingOrders()
    .then(orders=>{res.json(orders)})
    .catch(err=>{
        next(err);
    })
};
//user
exports.getOrders=(req,res,next)=>{
    //prepare parameters
    const{user}=req;

    //run method
    getOrders(user)
    .then(orders=>{res.json(orders)})
    .catch(err=>{
        next(err);
    })
};

exports.updateOrder=(req,res,next)=>{
    //prepare parameters
    const order_id = req.params.order_id;

    //run method
    updatingOrder(order_id)
    .then(()=>{res.send("updated")})
    .catch(err=>{
        console.log(err);
        next(err);
    })

};
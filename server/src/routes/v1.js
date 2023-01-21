const express = require('express');
const router = express.Router();
const passport = require('passport');


const userController = require('../controllers/user.controller');
const productController = require('../controllers/product.controller');
const itemController = require('../controllers/item.controller');
const orderController = require('../controllers/order.controller');



const{isAdmin}=require('../config/admin.guard');
const{upload}=require('../config/multer');


// register and Auth
router.post('/register', userController.regisetr);
router.post('/auth', userController.postlogin);

// -------------- ! Protected Routes -------------- //
router.get('/product/:category?', productController.getProduct);




// Customize auth message Protect the routes
router.all('*', (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if (err || !user) {
      const error = new Error('You are not authorized to access this area');
      error.status = 401;
      throw error;
      
    }else{
      req.user = user;
      req.user.password = undefined;

      return next();

    }
  })(req, res, next);
});



// -------------- Protected Routes -------------- //
router.get('/me', userController.me);


//admin Routes
router.post('/product',isAdmin,upload, productController.postProduct);
router.put('/product/:productId',isAdmin, productController.updateProduct);
router.delete('/product/:productId',isAdmin, productController.deleteProduct);
router.get('/manage-order',isAdmin, orderController.getOrder);
router.put('/order/:order_id',isAdmin, orderController.updateOrder);


//user Routes====>items
router.post('/item', itemController.postItem);
router.get('/item', itemController.getItem);
router.delete('/item/:item_id', itemController.deleteItem);
router.put('/item/:item_id', itemController.updateItem);

//user Routes====>orders
router.post('/order', orderController.postOrder);
router.get('/order', orderController.getOrders);
router.delete('/order/:order_id', orderController.deleteOrder);




module.exports = router;

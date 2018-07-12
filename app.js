const express = require('express');
const morgan = require('morgan');

const app = express();
                                              //no .js
const productRoutes = require('./api/routes/products');

const orderRoutes = require('./api/routes/orders');


app.use(morgan('dev'));


//all the url ending with /products, will be forward to productRoutes, which is product.js
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

//handle 404 error
app.use('/', (request, response ,next) => {
  const error = new Error('Not Found');
  error.status = 404;
  //pass error, forward request in line 20
  next(error);
});

//handle all different error
app.use('/', (error,request, response, next) =>{
  response.status(error.status || 500);
  response.json({
    error:{
    	message:error.message
    }
  });
});

//don't need this anymore, we will use something else to set up the server

// //app.use() sets up middleware
// app.use((request,response,next) => {
// 	//200 = everything is ok, send a json response
//   response.status(200).json({
//   	message: 'It works!!'
//   });
// });

module.exports = app;
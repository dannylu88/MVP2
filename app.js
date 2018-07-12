const express = require('express');

const app = express();
                                              //no .js
const productRoutes = require('./api/routes/products');

//all the url ending with /products, will be forward to productRoutes, which is product.js
app.use('/products', productRoutes);

//don't need this anymore, we will use something else to set up the server

// //app.use() sets up middleware
// app.use((request,response,next) => {
// 	//200 = everything is ok, send a json response
//   response.status(200).json({
//   	message: 'It works!!'
//   });
// });

module.exports = app;
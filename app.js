const express = require('express');

//get access to next function then print the get/post... methods
const morgan = require('morgan');

const app = express();

//allow to use request.body.
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
                                              //no .js
const productRoutes = require('./api/routes/products');

const orderRoutes = require('./api/routes/orders');




console.log('pass',process.env.MONGO_ATLAS_PW);  //encode handle special character $#%&*
mongoose.connect('mongodb+srv://dannylu8:' + encodeURIComponent(process.env.MONGO_ATLAS_PW) + '@dannylu8-ycguh.mongodb.net/test?retryWrites=true',
  // {
  //   useMongoClient:true    //---> no longer needed for mongoose 5.0.x
  // }
  {
  	useNewUrlParser: true
  }
);

app.use(morgan('dev'));              //true can handle nested object
app.use('/', bodyParser.urlencoded({extended:false}));
app.use('/', bodyParser.json());

//handle Cross orgin problem, allow different ports to access server
//normall you want to give *, everyone can access that's how internet work
//if this doesn't exist, only same port can access our server
app.use((request,response,next) =>{
	                                        // * means everyone has access
	                                        //or you can do http google.com, means only google have access
	response.header('Access-Control-Allow-Origin', '*');
	//which header send along with request
	response.header('Access-Control-Allow-Headers', '*');

    //Browser will always send OPTION method first, before GET or POST...
	if(request.method === 'OPTION'){
		               //only allow the following methods for the browers to send
		               //those are the methods that we are going to use
      response.header('Access-Control-Allow-Methods', 'PUT,POST,PATCH,DELETE,GET');
      return response.status(200).json({});
	}
	//this next will allow to continue, without it, it will blocked the entire server from here
	next();
});


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
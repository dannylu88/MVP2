const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');


const Product = require('../models/product');

//I want to only load or send the request to the product.js,
//only targeting with /products url ending

//NOTE: 因为我们在app.js的app.use已经说了/product, 所以这里如果再用/products 就会找/products/products
//      所以这里只要 / 就ok
router.get('/', (request,response,next) =>{
  Product.find()
  
  .exec()
  .then(docs =>{
    console.log(docs);
    response.status(200).json(docs);
  })
  .catch(err =>{
    console.log(err);
    response.status(500).json({
    	error:err
    });
  });

  //dont need this anymore, we need function to handle all products
  // response.status(200).json({
  //   message:'Handling get request to /products'
  // });
});

router.post('/', (request,response,next) => {
	// const product = {
	// //body from body parser, name from API doc (they will tell you what you get from API)
 //      name: request.body.name,
 //      price: request.body.price
	// };

    //create a new instance for product
    const product = new Product ({
      _id: new mongoose.Types.ObjectId(),  //--> will be a unique ID
      name:request.body.name,
      price:request.body.price
    });
    //method provide by mongoose to save, and store to database
    product.save()
    .then(result => {
      console.log(result);
      response.status(201).json({
      message:'Handling post request to /products',
      createdProduct: result
  });
    })
    .catch(err => {
    	console.log(err);
    	response.status(500).json({
    		error:err
    	})
    });
  
  //was sending a response immediately, need to move this into the .then function,
  //so only success will give response
  // response.status(201).json({
  //   message:'Handling post request to /products',
  //   createdProduct: product
  // });
});

// '/:productId', will get the encode productId into the URL
router.get('/:productId', (request,response,next)=>{
  const id = request.params.productId;
  //Product refer to the model(define on top with require())
  Product.findById(id)
  .exec()
  .then( doc =>{
  	//this will show in the terminal, if we do something else here,
  	//e.g: I added 'data from db', it will change on console, but not in postman
  	//becuz I only do a GET request from db, not POST, nothing change in db
  	console.log('doc from database',doc);
  	if(doc){
  		response.status(200).json(doc);
  	}else{
  		response.status(400).json({
  			message:'not valid entry found by ID'
  		});
  	}
  	
  })
  .catch(err =>{
  	console.log(err);
  	//do something more rather than just console.log(err)
  	response.status(500).json({
  		error:err
  	});

  	//  response.xxxxx --> if you do that, it will run before the .then.catch finish,
  	//  we want to run it step by step
  })
  /*
  we don't need this anymore after connected to database,
  刚刚下面的只是hardcode static file,之前用来测试router有没有连接上的
  if(id ==='special'){
  	response.status(200).json({
      message:'You discovered the special ID',
      id: id
  	});
  } else{
  	response.status(200).json({
      message:'You passed an ID'      
  	});
  }
  */
});

router.patch('/:productId', (request, response, next) =>{
  const id = request.params.productId;
  const updateOperation = {};

  //iterate body 
  for(const ops of request.body){
  	//this would something name or price
  	/*
  	[   if you want to chcange the name to litter tiger 6, here what in the post body
      {   find name property, set to value
      	  propName and value can be name by urself
  	    "propName":"name", "value":"little tiger 6"
        }	
     ]
  	*/
  	updateOperation[ops.propName] = ops.value;
  }
  Product.update({
  	//1st param, look for what we want to update, this case look for _id:id, _id has id property of .....
  	_id:id
  },
  // 2nd param, how you want to change it, but if you it like below, it will ask you to change both new and price
  //{$set: {name:request.body.newName, price:request.body.newPrice}}
  //so we do it another way
  /*
   首先我们弄一个empty obj，然后loop requestbody,把我们要改的value放进去那个obj,最后告诉set,你要改的就是那个obj
  */
  {$set: updateOperation})
  .exec()
  .then(result =>{
  	console.log(response);
  	response.status(200).json(result);
  })
  .catch(err =>{
  	console.log(err);
  	response.status(500).json({
  		error:err
  	});
  });

  //dont need this anymore, below are just check for route to work or not
  // response.status(200).json({
  //   message:'Updated product!'
  // });
});

router.delete('/:productId', (request, response, next) =>{
	const id = request.params.productId;
	//model name 
	Product.remove({
		_id: id  //--> unique id
	})
	.exec()
	.then(result =>{
		console.log('SUCCESS delete')
		response.status(200).json(result);
	})
	.catch(err =>{
		console.log(err);
		response.status(500).json({
			error:err
		})
	});

 //don't need this anymore, these are to just check if the route work
	// response.status(200).json({
 //      message:'Deleted Product'
	// });
})

module.exports = router;
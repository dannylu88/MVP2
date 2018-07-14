const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');

const Order = require('../models/order.js');
const Product = require('../models/product.js');

router.get('/', (request, response, next) => {
  //dont need static
  // response.status(200).json({
  //   message:'message were fetched'
  // });
  //no arg means find all
  Order.find()
  //only response those 3 category
  .select('product quantity _id')
  //populate will show all information that in product.js too
  .populate('product', 'name') //---> if added 2nd argument, only show name prop in product when call /order
  .exec()
  .then(docs =>{
  	response.status(200).json(docs);
  })
  .catch(err =>{
  	response.stats(500).json({
  		error:err
  	});
  });
});

router.post('/', (request,response,next) =>{
	

	//don not need these static file anymore
	// const order = {
 //      productId: request.body.productId,
 //      quantity:request.body.quantity
	// };

	//using Order constructor to make new order, and we can configure it with object
	const order = new Order({
		                   //objectId is call to make new unique id
		_id: mongoose.Types.ObjectId(),
		quantity: request.body.quantity,
		product: request.body.productId
	});
	order.save()
    //exec is not needed here, exec turn into real promise, need that for findbyid,
    //but not for save, save has buildin
	//.exec()
	.then(result =>{
		console.log(result);
		response.status(201).json(result);
	})
	.catch( err => {
		response.status(500).json({
			error:err
		});
	});
 
  //don't need this status anymore
  // response.status(201).json({
  //   message:'Order was created',
  //   order:order
  // });
});

router.get('/:orderId', (request,response,next) =>{
  Order.findById(request.params.orderId)
  .populate('product')
  .exec()
  .then(order =>{
  	response.status(200).json({
       order:order
  	});
  })
  .catch(err =>{
  	response.status(500).json({
  		error:err
  	});
  });
  //static
  // response.status(200).json({
  //   message:'Order details',
  //   orderId:request.params.orderId
  // });
});

router.delete('/:orderId', (request, response, next) =>{
	//remove by id
	Order.remove({_id:request.params.orderId})
	.exec()
	.then( result =>{
		message:'order deleted'
	})
	.catch( err=>{
		response.status(500).json({
			error:err
		});
	});
})

module.exports = router;
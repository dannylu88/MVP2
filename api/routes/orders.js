const express = require('express');
const router = express.Router();

router.get('/', (request, response, next) => {
  response.status(200).json({
    message:'message were fetched'
  });
});

router.post('/', (request,response,next) =>{
	const order = {
      productId: request.body.productId,
      quantity:request.body.quantity
	};
  response.status(201).json({
    message:'Order was created',
    order:order
  });
});

router.get('/:orderId', (request,response,next) =>{
  response.status(200).json({
    message:'Order details',
    orderId:request.params.orderId
  });
});

router.delete('/:orderId', (request, response, next) =>{
	response.status(200).json({
      message:'Order delete'
	});
})

module.exports = router;
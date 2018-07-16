const Order = require('../models/order.js')


exports.getAllOrders = (request, response, next) => {
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
};


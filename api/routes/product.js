const express = require('express');
const router = express.Router();

//I want to only load or send the request to the product.js,
//only targeting with /products url ending

//NOTE: 因为我们在app.js的app.use已经说了/product, 所以这里如果再用/products 就会找/products/products
//      所以这里只要 / 就ok
router.get('/', (request,response,next) =>{
  response.status(200).json({
    message:'Handling get request to /products'
  });
});

router.post('/', (request,response,next) => {
  response.status(200).json({
    message:'Handling post request to /products'
  });
});

module.exports = router;
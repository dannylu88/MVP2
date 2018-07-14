const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
  _id:mongoose.Schema.Types.ObjectId,
             //type --> read unique id from above    //reference model call Product
  product: {type: mongoose.Schema.Types.Object, ref:'Product', required:true},
  quantity: {type: Number, default:1}
});

                     //this model is name schema, load schema name 'oderSchema'
module.exports = mongoose.model('Order', orderSchema);
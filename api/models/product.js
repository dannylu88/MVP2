//define how product look like in model

const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  _id:mongoose.Schema.Types.ObjectId,   //_id is convention, mongoose.type.objectid is the moogoose internal syntax
  name:{type:String, required:true},
  price:{type:Number, required:true}
});

				   //model is mongoose internal function
				              //product is the name for your model (you can choose)
				                          //schema is the name of schema you want to export
module.exports = mongoose.model('Product', productSchema);
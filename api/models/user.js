	const mongoose = require('mongoose');

	const userSchema = mongoose.Schema({
		_id:mongoose.Schema.Types.ObjectId,
		email:{
			type:String, 
			required:true, 
			//these regExp will make sure input is an actual e-mail
			match:/^\S+@\S+\.\S+$/
		},
		password: {type:String, required:true}
	});

	module.exports = mongoose.model('User', userSchema);
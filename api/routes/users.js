const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const User = require('../models/user.js');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');




router.post('/signup', (request, response, next ) =>{
  //prevent signup with same email address
  User.find({email: request.body.email})
    .exec()
    .then(user =>{
    	//don't use if(user), if you do, user will be just an empty array, it still exist
    	//so we should use user.length >0
    	if(user.length > 0){             //409 = conflict, 422 is ok too
    		return response.status(409).json({
    			message: 'email already exist'
    		})
    	}else{
    		bcrypt.hash(request.body.password, 10, (err,hash) =>{
               if(err){
      	         return response.status(500).json({
      		     error:err
      	       });
             }else {
      	
               const user = new User({
                _id: new mongoose.Types.ObjectId(),
                email:request.body.email,
                password: hash
              });
                 user.save()
                     .then(result =>{
         	             console.log(result);
         	             response.status(201).json({
         	             message: 'User created'
                         })
                     })
                    .catch(err =>{
                   	console.log(err);
         	        response.status(500).json({
         		    error:err
         	          });
                    });
                }
             });
    	   }
        })
 });

router.post('/login', (request, response, next) =>{
  User.find({email: request.body.email})
      .exec()
      .then(user =>{
      	if (user.length < 1){    //unauthorized
      		return response.status(401).json({
      			message:'Authorization failed'
      		})
      	}
      	bcrypt.compare(request.body.password, user[0].password, (err, result) =>{
          if(err){
          	return response.status(401).json({
              message:'Authorization failed'
          	});
          }
          if(result){
          	//using token with jsonwebtoken
          	const token = jwt.sign(
          	{
          		email: user[0].email,  //--> 1st variable
          		userId:user[0]._id
          	}, 
          	process.env.JWT_KEY,
          	{
          		expiresIn:"600000",
          		token:token
          	});
          	 return response.status(200).json({
          	 	message: 'Authorization successful'
          	 });
          }
          response.status(401).json({
            message:'Authorization failed'
          });
      	});
      })
      .catch( err=>{
      	console.log(err);
      	response.status(500).json({
      		error:err
      	})
      });
});

router.delete('/:userId', (request, response, next) =>{
  User.remove({_id: request.params.userId})
    .exec()
    .then( result =>{
    	response.status(200).json({
          message:'user deleted'
    	});
    })
    .catch( err =>{
    	console.log(err);
    	response.status(500).json({
          error:err
    	});
    });
});

module.exports = router;
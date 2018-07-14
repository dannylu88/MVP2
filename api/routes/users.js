const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const User = require('../models/user.js');

const bcrypt = require('bcrypt');




router.post('/signup', (request, response, next ) =>{
  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    email:request.body.email,
    password:bcrypt.hash(request.body.password, )
  });
});

module.exports = router;
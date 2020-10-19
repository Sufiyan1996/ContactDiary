const express = require('express');
const router = express.Router();
const {check,validationResult} = require('express-validator/check');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../models/User');
const auth = require('../middleware/auth')

// @route: GET /api/auth
// desc:  get login user
// access: private

router.get('/',[auth],async (req,res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server Error');
    }
});


// @route: POST /api/auth
// desc:  auth user and get token
// access: public

router.post('/',[
check('email','Email is required').isEmail(),
check('password','Password is required').not().isEmpty()
],async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
       return res.status(400).json({errors:errors.array()});
    }

  try {
    const{email,password} = req.body;
    const user = await User.findOne({email});
    if(!user){
        return res.status(400).json({msg:'Invalid Email'});
    }

    const match = await bcrypt.compare(password,user.password);
    if (!match){
        return res.status(400).json({msg:'Invalid Credential'});
    }

    const payload = {
        user:{
            id:user.id
        }
    }

    jwt.sign(payload,config.get('jwtSecret'),{expiresIn:3600000},(error,token) => {
        if(error) console.log(error.message);
        res.send({token});
    })
     
  } catch (error) {
      console.log(error.message);
      res.status(500).send('Server Error');
  }
});

module.exports = router;
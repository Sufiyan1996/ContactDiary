const express = require('express');
const router = express.Router();
const {check,validationResult} = require('express-validator/check');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../models/User');

// @route: POST /api/users
// desc: Register user
// access: public

router.post('/',[
    check('name','Name is required').not().isEmpty(),
    check('email','Email is required').isEmail(),
    check('password','Password is required min 6 characters').isLength({
        min:6
    })
],async (req,res) => { 
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors:errors.array() })
    }

    try {
        const {name,email,password} = req.body;

        let user = await User.findOne({email});
            if (user) {
                  return res.status(400).json({msg:'Email Already Exists'})
            }

            user = new User({
                name,
                email,
                password
            });

            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password,salt);
            await user.save(); 
            
            const payload = {
                user:{
                    id:user.id
                }
            }

            jwt.sign(payload,config.get('jwtSecret'),{expiresIn:3600000},(err,token)=>{
                if(err) console.log(err.message);
                res.send({token})
            })

    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server Error')
    }
});

module.exports = router;
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')
const Contact = require('../models/Contact')
const {check,validationResult} = require('express-validator/check');
const { json } = require('express');

// @route: GET /api/contacts
// desc:  get Contacts
// access: public

router.get('/',[auth], async (req,res) => {
    try {
        const contact = await Contact.find({user:req.user.id});
        res.json(contact);
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server Error');
    }
});


// @route: POST /api/contacts
// desc:  Add new Contacts
// access: private

router.post('/',[auth,[
    check('name','Name is required').not().isEmpty()
]],async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    try {
        const {name,email,phone,type} = req.body;

    const newContact = new Contact({
        name,
        email,
        phone,
        type,
        user:req.user.id
    });

    const contact = await newContact.save();
    res.json(contact);
    
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server Error');
    }
});


// @route: PUT /api/contacts
// desc:  Add new Contacts
// access: private

router.put('/:id',auth, async (req,res) => { 

    const {name,email,phone,type} = req.body;

    const contactfields = {};
    if(name) contactfields.name = name;
    if(email) contactfields.email = email;
    if(phone) contactfields.phone = phone;
    if(type) contactfields.type = type;

    try {
        
    let currentContact = await Contact.findById(req.params.id);
    console.log(currentContact);
    if(!currentContact) {
        return res.status(404).json({msg:'Contact not found'});
    }

    if(currentContact.user.toString() !== req.user.id){
        return res.status(401).json({msg:'User not authorized'});
    }
    console.log(req.user.id)
    console.log(contactfields)

    currentContact = await Contact.findByIdAndUpdate(
        req.params.id,
        {$set:contactfields},
         {new: true}
        );

        res.json(currentContact);

    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server Error');
    }
 
});


// @route: DELETE /api/contacts
// desc:  Delete Contacts
// access: private

router.delete('/:id',auth,async (req,res) => {
    try {
        const contact = await Contact.findById(req.params.id);
    if(!contact)
    {
        return res.status(400).json({msg:'Contact was not found'});
    }

    if(contact.user.toString() !== req.user.id){
        return res.status(400).json({msg:'User not authorized'});
    }

    await Contact.findByIdAndRemove(req.params.id);

    res.send('Contact Removed');
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({error : error.array()});
    }
});

module.exports = router;
const express = require('express');
const connectDB = require('./config/db');
const app = express();
const path = require('path');

// Connect Mongo DB
connectDB();

// Init Middleware
app.use(express.json({extended:false}))

// Define PORT to connect server
const PORT = process.env.PORT || 5000;

// Define Routes
app.use('/api/auth',require('./routes/auth'));
app.use('/api/users',require('./routes/users'));
app.use('/api/contacts',require('./routes/contacts'));

if(process.env.NODE_ENV = 'production'){
    //Set static folder
    app.use(express.static('client/build'));

    app.get('*',(req, res)=> {
        res.sendFile(path.resolve(__dirname,'client','build','index.html'));
    })
}

//Listening the port and connect to server
app.listen(PORT,() => console.log(`Server connected on port ${PORT}`))
const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//var dt = require('./myfirstmodule');
const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');

//mongoose.connect('mongodb+srv://rshaler:Icrq2401@cluster0-2uamy.mongodb.net/test?retryWrites=true',
mongoose.connect('mongodb+srv://rshaler:' + process.env.MONGODB_ATLAS_PW + '@cluster0-2uamy.mongodb.net/test?retryWrites=true',
    {
        //useMongoClient: true
        useNewUrlParser: true
    }
);
   

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
);
    if (req.method === ' OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'POST, PUT, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

// resource routes
app.use('/products', productRoutes); 
app.use('/orders', orderRoutes);

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

app.use((req, res, next) => {
    res.status(200).json({
        message: 'It Works!!!'
        //message: 'The date and time are currently: ' + dt.myDateTime()
    });
});


module.exports = app;
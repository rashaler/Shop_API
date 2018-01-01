const express = require('express');
const app = express();
//var dt = require('./myfirstmodule');
const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');

app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

/*
app.use((req, res, next) => {
    res.status(200).json({
        message: 'It Works!'
        //message: 'The date and time are currently: ' + dt.myDateTime()
    });
});
*/

module.exports = app;
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Product = require('../models/product');

router.get('/', (req, res, next) => {
    Product.find()
    .select('name price _id')
    .exec()
    .then(docs => {
        //console.log(docs);
        //if (docs.length > 0) {
            const response = {
                count: docs.length,
                products: docs
            };
            res.status(200).json(response);
        //} else {
        //    res.status(404).json({
        //        message: "No product entries exist"
        //    });
        //}
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

router.post('/', (req, res, next) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });
    product.save().then(result => {
        console.log(result);
    })
    .catch(err=>console.log(err));
    res.status(201).json({
       message: 'Handling POST request to /products',
       createdProduct: product  
    });
    
});

router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;
    Product.findById(id)
        .exec()
        .then(doc => {
            console.log("From Database:", doc);
            if (doc) {
                res.status(200).json(doc);
            } else {
                res.status(404).json({message: 'No entry found for this Id'});
            }
            
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});

router.patch('/:productId', (req, res, next) => {
    const id = req.params.productId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Product.update({ _id: id }, { $set: updateOps })
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.delete('/:productId', (req, res, next) => {
    const id = req.params.productId;
    Product.deleteOne({_id: id})
    .exec()
    .then(result=> {
        res.status(200).json(result);
    })
    .catch(err=> {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
    /*
    if(id === 'special') {
        res.status(200).json({
            message: 'Cannot delete special Id!',
            id: id
        });
    } else {
        res.status(200).json({
            message: 'Deleted product!'
        });
    }
    */

});


module.exports = router;
const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
       message: 'Orders were fetched' 
    });
    
});

router.post('/', (req, res, next) => {
    res.status(201).json({
       message: 'Order was created.' 
    });
    
});

router.get('/:orderId', (req, res, next) => {
    const id = req.params.orderId;
    if(id === 'special') {
        res.status(200).json({
            message: 'You discoverd the special Id',
            id: id
        });
    } else {
        res.status(200).json({
            message: 'Order details',
            orderId: req.params.orderId
        });
    }

});

router.delete('/:orderId', (req, res, next) => {
    const id = req.params.orderId;
    if(id === 'special') {
        res.status(200).json({
            message: 'Cannot delete special Id',
            id: id
        });
    } else {
        res.status(200).json({
            message: 'Deleted order',
            orderId: req.params.orderId
        });
    }

});


module.exports = router;
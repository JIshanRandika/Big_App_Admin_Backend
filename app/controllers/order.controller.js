const Order = require('../models/order.model.js');

// POST a Order
exports.createOrder = (req, res) => {


    const order = new Order({
        orderID: req.body.orderID,
        shopName: req.body.shopName,
        itemAndQuantity: req.body.itemAndQuantity,
        acceptStatus: req.body.acceptStatus,
        readyStatus: req.body.readyStatus,
        completeStatus: req.body.completeStatus,
    });

    // Save a order in the MongoDB
    order.save().then(data => {
        res.status(200).json(data);
    }).catch(err => {
        res.status(500).json({
            message: "Fail!",
            error: err.message
        });
    });
};


// UPDATE a Accept Order
exports.updateAcceptOrder = (req, res) => {
    // Find order and update it
    Order.findByIdAndUpdate(
        req.body._id,
        {

            acceptStatus: req.body.acceptStatus,

        },
        {new: true}
    ).select('-__v')
        .then(item => {
            if(!item) {
                return res.status(404).send({
                    message: "Error -> Can NOT update a order with id = " + req.params.id,
                    error: "Not Found!"
                });
            }

            res.status(200).json(item);
        }).catch(err => {
        return res.status(500).send({
            message: "Error -> Can not update a order with id = " + req.params.id,
            error: err.message
        });
    });
}



// UPDATE a Ready Order
exports.updateReadyOrder = (req, res) => {
    // Find order and update it
    Order.findByIdAndUpdate(
        req.body._id,
        {

            readyStatus: req.body.readyStatus,
        },
        {new: true}
    ).select('-__v')
        .then(item => {
            if(!item) {
                return res.status(404).send({
                    message: "Error -> Can NOT update a order with id = " + req.params.id,
                    error: "Not Found!"
                });
            }

            res.status(200).json(item);
        }).catch(err => {
        return res.status(500).send({
            message: "Error -> Can not update a order with id = " + req.params.id,
            error: err.message
        });
    });
}


// UPDATE a Completed Order
exports.updateCompleteOrder = (req, res) => {
    // Find order and update it
    Order.findByIdAndUpdate(
        req.body._id,
        {

            completeStatus: req.body.completeStatus,
        },
        {new: true}
    ).select('-__v')
        .then(item => {
            if(!item) {
                return res.status(404).send({
                    message: "Error -> Can NOT update a order with id = " + req.params.id,
                    error: "Not Found!"
                });
            }

            res.status(200).json(item);
        }).catch(err => {
        return res.status(500).send({
            message: "Error -> Can not update a order with id = " + req.params.id,
            error: err.message
        });
    });
}


//neworderforuser
exports.neworderforuser = async(req, res) => {
    // Ingredient.find().select('-__v')
    // console.log(req);
    let searchShopname=req.body.searchShopname;
    console.log('back')
    console.log(searchShopname);
    // let trueIngredients=[];

    let itemList=await Order.find({shopName:searchShopname,acceptStatus:'waiting'}).select(['shopName','orderID','itemAndQuantity', 'acceptStatus', 'readyStatus', 'completeStatus']);


    return res.status(200).send(itemList);
};



//acceptedorderforuser
exports.acceptedorderforuser = async(req, res) => {
    // Ingredient.find().select('-__v')
    // console.log(req);
    let searchShopname=req.body.searchShopname;
    console.log('back')
    console.log(searchShopname);
    // let trueIngredients=[];

    let itemList=await Order.find({shopName:searchShopname,readyStatus:'waiting',acceptStatus:'done'}).select(['shopName','orderID','itemAndQuantity', 'acceptStatus', 'readyStatus', 'completeStatus']);


    return res.status(200).send(itemList);
};

//readyorderforuser
exports.readyorderforuser = async(req, res) => {
    // Ingredient.find().select('-__v')
    // console.log(req);
    let searchShopname=req.body.searchShopname;
    console.log('back')
    console.log(searchShopname);
    // let trueIngredients=[];

    let itemList=await Order.find({shopName:searchShopname,completeStatus:'waiting',readyStatus:'done'}).select(['shopName','orderID','itemAndQuantity', 'acceptStatus', 'readyStatus', 'completeStatus']);


    return res.status(200).send(itemList);
};

//completedorderforuser
exports.completedorderforuser = async(req, res) => {
    // Ingredient.find().select('-__v')
    // console.log(req);
    let searchShopname=req.body.searchShopname;
    console.log('back')
    console.log(searchShopname);
    // let trueIngredients=[];

    let itemList=await Order.find({shopName:searchShopname,completeStatus:'done'}).select(['shopName','orderID','itemAndQuantity', 'acceptStatus', 'readyStatus', 'completeStatus']);


    return res.status(200).send(itemList);
};

// DELETE a Order
exports.deleteOrder = (req, res) => {
    let itemId = req.params.id

    Order.findByIdAndRemove(itemId).select('-__v -_id')
        .then(item => {
            if(!item) {
                res.status(404).json({
                    message: "Does Not exist a order with id = " + itemId,
                    error: "404",
                });
            }
            res.status(200).json({});
        }).catch(err => {
        return res.status(500).send({
            message: "Error -> Can NOT delete a order with id = " + itemId,
            error: err.message
        });
    });
};
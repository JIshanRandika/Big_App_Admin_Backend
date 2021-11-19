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


//orders for users
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
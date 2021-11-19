const Item = require('../models/item.model.js');
const {items} = require("./item.controller");

// POST a Item
exports.createItem = (req, res) => {



    const item = new Item({
        username: req.body.username,
        itemID: req.body.itemID,
        itemName: req.body.itemName,
        // quantity: req.body.quantity,
        itemStatus: req.body.itemStatus,
    });

    // Save a Item in the MongoDB
    item.save().then(data => {
        res.status(200).json(data);
    }).catch(err => {
        res.status(500).json({
            message: "Fail!",
            error: err.message
        });
    });
};

// FETCH all Items
exports.items = (req, res) => {
    Item.find().select('-__v').then(itemInfos => {
        res.status(200).json(itemInfos);
    }).catch(error => {
        // log on console
        console.log(error);

        res.status(500).json({
            message: "Error!",
            error: error
        });
    });
};




exports.itemforuser = async(req, res) => {
    // Ingredient.find().select('-__v')
    // console.log(req);
    let searchUsername=req.body.searchUsername;
    console.log('back')
    console.log(searchUsername);
    // let trueIngredients=[];

    let itemList=await Item.find({username:searchUsername}).select(['username','itemID','itemName', 'quantity', 'itemStatus']);


    return res.status(200).send(itemList);
};



















// get a Item by Id
exports.getItem = (req, res) => {
    Item.findById(req.params.id).select('-__v')
        .then(item => {
            res.status(200).json(item);
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Item not found with id " + req.params.id,
                error: err
            });
        }
        return res.status(500).send({
            message: "Error retrieving Item with id " + req.params.id,
            error: err
        });
    });
};

// UPDATE a Item
exports.updateItem = (req, res) => {
    // Find item and update it
    Item.findByIdAndUpdate(
        req.body._id,
        {
            username: req.body.username,
            itemID: req.body.itemID,
            itemName: req.body.itemName,
            quantity: req.body.quantity,
            itemStatus: req.body.itemStatus
        },
        {new: true}
    ).select('-__v')
        .then(item => {
            if(!item) {
                return res.status(404).send({
                    message: "Error -> Can NOT update a item with id = " + req.params.id,
                    error: "Not Found!"
                });
            }

            res.status(200).json(item);
        }).catch(err => {
        return res.status(500).send({
            message: "Error -> Can not update a item with id = " + req.params.id,
            error: err.message
        });
    });
};

// DELETE a Item
exports.deleteItem = (req, res) => {
    let itemId = req.params.id

    Item.findByIdAndRemove(itemId).select('-__v -_id')
        .then(item => {
            if(!item) {
                res.status(404).json({
                    message: "Does Not exist a item with id = " + itemId,
                    error: "404",
                });
            }
            res.status(200).json({});
        }).catch(err => {
        return res.status(500).send({
            message: "Error -> Can NOT delete a item with id = " + itemId,
            error: err.message
        });
    });
};

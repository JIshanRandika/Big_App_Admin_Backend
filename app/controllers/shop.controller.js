const Shop = require('../models/user.model.js');


// FETCH all Shops
exports.items = (req, res) => {
    Shop.find().select('-__v').then(itemInfos => {
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
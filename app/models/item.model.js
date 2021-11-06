const mongoose = require('mongoose');

var name = 'item';

const ItemSchema = mongoose.Schema({
    username: String,
    itemID: String,
    itemName: String,
    quantity: String,
    itemStatus: String,

});

module.exports = mongoose.model(`${name}`, ItemSchema);

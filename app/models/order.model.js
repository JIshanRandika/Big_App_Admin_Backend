const mongoose = require('mongoose');

var name = 'order';

const OrderSchema = mongoose.Schema({
    orderID: String,
    shopName: String,
    itemAndQuantity: [],
    acceptStatus: String,
    readyStatus: String,
    completeStatus: String

});

module.exports = mongoose.model(`${name}`, OrderSchema);

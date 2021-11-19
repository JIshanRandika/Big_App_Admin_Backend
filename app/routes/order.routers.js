const orders = require("../controllers/order.controller.js");
module.exports = function(app) {

    var orders = require('../controllers/order.controller.js');

    app.post('/api/order', orders.createOrder);
    app.post('/api/orderforuser', orders.orderforuser);

}

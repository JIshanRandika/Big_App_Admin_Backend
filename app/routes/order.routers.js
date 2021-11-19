const orders = require("../controllers/order.controller.js");
module.exports = function(app) {

    var orders = require('../controllers/order.controller.js');

    app.post('/api/order', orders.createOrder);
    app.post('/api/neworderforuser', orders.neworderforuser);
    app.post('/api/acceptedorderforuser', orders.acceptedorderforuser);
    app.post('/api/readyorderforuser', orders.readyorderforuser);
    app.post('/api/completedorderforuser', orders.completedorderforuser);


    app.put('/api/updateAcceptOrder', orders.updateAcceptOrder);
    app.put('/api/updateReadyOrder', orders.updateReadyOrder);
    app.put('/api/updateCompleteOrder', orders.updateCompleteOrder);

}

const shops = require("../controllers/shop.controller.js");
module.exports = function(app) {

    var shops = require('../controllers/shop.controller.js');


    app.get('/api/shops', shops.shops);

}

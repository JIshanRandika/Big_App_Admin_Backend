module.exports = function(app) {

    var items = require('../controllers/item.controller.js');

    app.post('/api/item', items.createItem);
    app.get('/api/item/:id', items.getItem);
    app.get('/api/items', items.items);
    app.put('/api/item', items.updateItem);
    app.delete('/api/item/:id', items.deleteItem);
}

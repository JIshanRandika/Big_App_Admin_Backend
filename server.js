const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dbConfig = require("./app/config/db.config");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};



app.use(cors(corsOptions));



// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");
const Item = require('./app/models/item.model.js');


const Role = db.role;

// db.mongoose
//   .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
//   })
//   .then(() => {
//     console.log("Successfully connect to MongoDB.");
//     initial();
//   })
//   .catch(err => {
//     console.error("Connection error", err);
//     process.exit();
//   });




const mongoose = require('mongoose');


mongoose.connect(dbConfig.url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async () => {
      console.log("Successfully connected to MongoDB.");


      // username: String,
      //     itemID: String,
      //     itemName: String,
      //     quantity: String,
      //     itemStatus: String,



      const Items = [
        { username: 'test', itemID: '1',
          itemName: 'item1', quantity: 10,itemStatus:'Y'},
        { username: 'test', itemID: '2',
          itemName: 'item2', quantity: 15,itemStatus:'N'},
        { username: 'test', itemID: '3',
          itemName: 'item3', quantity: 20,itemStatus:'Y'},
      ]

      for(let i=0; i<Items.length; i++){

        const item = new Item({
          username: Items[i].username,
          itemID: Items[i].itemID,
          itemName: Items[i].itemName,
          quantity: Items[i].quantity,
          itemStatus: Items[i].itemStatus
        });

        // Save a Customer in the MongoDB
        await item.save();
      }






      Role.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
          new Role({
            name: "user"
          }).save(err => {
            if (err) {
              console.log("error", err);
            }

            console.log("added 'user' to roles collection");
          });

          new Role({
            name: "moderator"
          }).save(err => {
            if (err) {
              console.log("error", err);
            }

            console.log("added 'moderator' to roles collection");
          });

          new Role({
            name: "admin"
          }).save(err => {
            if (err) {
              console.log("error", err);
            }

            console.log("added 'admin' to roles collection");
          });
        }
      });
      // const roles = [
      //   { name: 'user'},
      //   { name: 'admin'},
      //   { name: 'moderator'}
      // ]
      //
      // for(let i=0; i<roles.length; i++) {
      //
      //   const role = new Role({
      //     firstname: roles[i].name,
      //   });
      //
      //   await role.save();
      //
      // }



    }).catch(err => {
  console.log('Could not connect to MongoDB.');
  process.exit();
});








// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Ishan application." });
});

// routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);
require('./app/routes/item.router.js')(app);



// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });

      new Role({
        name: "moderator"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'moderator' to roles collection");
      });

      new Role({
        name: "admin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });
}

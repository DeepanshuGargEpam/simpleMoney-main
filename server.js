const express = require("express");
const cors = require("cors");
const dbConfig = require("./app/config/db.config");

const app = express();
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(function(request, response, next){
  response.header("Access-Control-Allow-Origin", "*");
  response.header('Access-Control-Allow-Credentials', true);
  response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, authorization, accessToken, uuId, utz,platform,osVersion,deviceModel,appVersion ");
  response.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
  next();
});

const db = require("./app/models");
const Role = db.role;

db.mongoose
  .connect(process.env.MONGODB_URI ||`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });


// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to application." });
});

// routes
require("./app/routes/authRoutes")(app);
require("./app/routes/transactionRoutes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
  Role.estimatedDocumentCount().then(function(err){
    if (!err) {
      var new_user = new Role({
        name: 'user',
    })
      
    new_user.save().then(function (models) {
      console.log(models);
    })
    .catch(function (err) {
      console.log(err);
    });
    }
  });
}
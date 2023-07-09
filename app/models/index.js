const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./userModel");
db.role = require("./role.model");
db.transaction=require('./transaction.model')

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;
const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: String,
    password: String,
    isDeleted:{
      type:Number,
      default:0  //0=notdeleted 1=deleted
    },
    created: {
      type: Date,
      default: Date.now
  },

  updated: {
      type: Date,
      default: Date.now
  },
  })
);

module.exports = User;
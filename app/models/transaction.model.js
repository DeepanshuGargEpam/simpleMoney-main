const mongoose = require("mongoose");
const User = require("./userModel");
const Schema = mongoose.Schema;
const Transaction = mongoose.model(
  "Transaction",
  new Schema({
    userId: {type:Schema.Types.ObjectId,ref:User},
    transactionType: {
        type: Number,
        default: 1 //1=expense 2=investment 3=income
    },
    category:{
        type:Number,
        default:1 //1=stock 2= mutual funds 3=salary 4=investment 5=wifi 6=entertainment
    },
    amount:{
        type:Number
    },
    paymentMethod:{
        type:Number,
        default:1 //1=cash 2=debitcard 3=creditcard 4=UPI 
    },
    isDeleted:{
        type:Number,
        default:0  //0=not deleted 1=deleted  
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

module.exports = Transaction;
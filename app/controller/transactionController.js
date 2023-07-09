const db = require("../models");
const Transaction = db.transaction;


exports.add = async (req, res) => {
  const addTransaction = new Transaction({
    userId: req.body.userId,
    transactionType:req.body.type,
    category:req.body.category,
    amount:req.body.amount,
    paymentMethod:req.body.paymentMethod

  });

  addTransaction.save().then((result) => {
    res.send({ message: "transaction added successfully!",result });
    
  }).catch(function (err) {
    res.status(500).send({ message: err });
      return;
  });
};

exports.getList=(req,res)=>{
    let year,query={};
    if(req.query.year){
        year=new Date(req.query.year),
        console.log(year,query)
        query["created"]={"$gte":year}
    }
    
    query.userId= req.userId
    Transaction.find(query).then((result) => {
        res.send({ message: "transaction list successfully!",result });
    })
    .catch(function (err) {
        res.status(500).send({ message: err });
          return;
      });
}

const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  const user = new User({
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password, 8)
  });

  user.save().then((user) => {
    res.send({ message: "User was registered successfully!",user });
    
  }).catch(function (err) {
    res.status(500).send({ message: err });
      return;
  });
};

exports.signin = (req, res) => {
  User.findOne({
    username: req.body.username
  }).then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }
      const token = jwt.sign({ id: user._id },
                              config.secret,
                              {
                                algorithm: 'HS256',
                                allowInsecureKeySizes: true,
                                expiresIn: 86400, // 24 hours
                              });
     return res.status(200).send({
        message:"User Signin",
        id: user._id,
        username: user.username,
        accessToken: token
      });
    }).catch(function (err) {
      res.status(500).send({ message: err });
        return;
    });
};

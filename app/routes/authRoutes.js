const verifySignUp = require("../middleware/verifySignup");
const controller = require("../controller/authController");

module.exports = function(app) {

  app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail
    ],
    controller.signup
  );

  app.post("/api/auth/signin", controller.signin);
};
const authJwt = require("../middleware/authJWT");
const controller = require("../controller/transactionController");

module.exports = function(app) {
    
  app.post(
    "/api/transaction/add",
    [
        authJwt.verifyToken
    ],
        controller.add
  );

app.get("/api/transaction/getList",
    [
        authJwt.verifyToken
    ],
        controller.getList);
};
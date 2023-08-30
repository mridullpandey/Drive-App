
const router = require("express").Router();
router.get("/", function (req, res) {
    res.send(
      '<body style="font-family: Helvetica !important; background-color: black">' +
      '<div style="display: flex; flex:1; height: 100% ; justify-content: center; align-items: center; min-height: 100vh !important; font-size: 28px !important; color: salmon !important;">' +
      "Node-Template Microservice 🧾  is working fine!</div></body>"
    );
  })
module.exports = router;

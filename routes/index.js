
const DriveController = require('../app/modules/drive/controller')
const { apiEndPoints } = require("../app/common/constants")
const { validateAuthToken, verifyApiKey, parseQueryParams } = require('../middleware/authentication')
const router = require("express").Router()
router.get("/", function (req, res) {
  res.send(
    '<body style="font-family: Helvetica !important; background-color: black">' +
    '<div style="display: flex; flex:1; height: 100% ; justify-content: center; align-items: center; min-height: 100vh !important; font-size: 28px !important; color: salmon !important;">' +
    "Drive-App Microservice 🧾  is working fine!</div></body>"
  );
})
router.post(apiEndPoints.getFile, DriveController.getfile)
router.get(apiEndPoints.driveLoginUrl, DriveController.driveLoginUrl)
router.get(apiEndPoints.driveCallbackUrl, DriveController.driveCallbackUrl)
router.get(apiEndPoints.registerApp, DriveController.registerApp)




// router.get(apiEndPoints.list,validateAuthToken,DriveController.getAll)
module.exports = router;

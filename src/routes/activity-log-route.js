const express = require("express");
const router = express.Router();
const activity_log_module = require("../modules/activity-log-module");

router.post("/view_activity_log", (req, res) => {
  if (req.body.hasOwnProperty("user-token")) {
    activity_log_module.view_activity_log(
      req.body,
      (status, message, result) => {
        res.json({ status, message, result });
      }
    );
  } else {
    let message = "";
    if (!req.body.hasOwnProperty("user-token")) {
      message = "User token parameter is missing";
    }
    res.json({
      status: false,
      message,
    });
  }
});

module.exports = router;

const express = require("express");
const router = express.Router();
const activityLogRouter = require("./activity-log-route")

/** GET /health-check - Check service health */
router.get("/health-check", (req, res) => res.send("OK"));
router.use("/activity_log",activityLogRouter);

module.exports = router;

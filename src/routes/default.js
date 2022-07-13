const express = require("express");
const router = express.Router();


router.get("/", (req, res) => res.send("Welcome to TaskDu APIs"));

module.exports = router;

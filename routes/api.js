const express = require("express");
const router = express.Router();

router.use("/user", require("./apis/user"));
router.use("/phrase", require("./apis/phrase"));

module.exports = router;

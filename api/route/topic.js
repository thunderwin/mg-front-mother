const express = require("express");
const Controller = require("../controller/topic");
const router = express.Router(); // eslint-disable-line new-cap

router.route("/send").get(Controller.addTopic);

module.exports = router;

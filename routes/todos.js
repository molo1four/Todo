const express = require("express");

const { getTodos, checkComp } = require("../controllers/todos");

const router = express.Router();

router.route("/").get(getTodos);
router.route("/check").post(checkComp);

module.exports = router;

const express = require("express");
const auth = require("../middleware/auth");

const { getFriend, getFriendsPost } = require("../controllers/friends");

const router = express.Router();

// 각 경로 별로 데이터 가져올 수 있도록, router 셋팅
router.route("/").post(auth, getFriend).get(auth, getFriendsPost);

module.exports = router;

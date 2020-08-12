// db 연결
const connection = require("../db/mysql_connection");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const path = require("path");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

// @desc 친구 맺기
// @route POST /api/v1/friends
// @request
// @response success
exports.getFriend = async (req, res, next) => {
  let token = req.user.token;
  let user_id = req.user.id;
  let taker_user_id = req.body.taker_user_id;

  let query = `select * from sns_token where user_id = ${user_id} and token = "${token}"`;
  console.log(query);
  try {
    [result] = await connection.query(query);

    if (result.length != 0) {
      try {
        query = `insert into sns_share (giver_user_id,taker_user_id) values (${user_id},${taker_user_id})`;
        console.log(query);

        [result] = await connection.query(query);
        res.status(200).json({ success: true });
      } catch (e) {
        res.status(400).json({ success: false, message: "2번 쿼리 오류" });
      }
    } else {
      res
        .status(200)
        .json({ success: false, message: "affectedRows가 1이 아님" });
    }
  } catch (e) {
    res.status(400).json({ success: false, message: "1번 쿼리 오류" });
  }
};

// @desc 친구들의 포스팅을 최근 순으로 가져오는 기능
// @route GET /api/v1/friends
// @request auth
// @response success
exports.getFriendsPost = async (req, res, next) => {
  let token = req.user.token;
  let user_id = req.user.id;
  let offset = req.query.offset;
  let limit = req.query.limit;

  let query = `select * from sns_token where user_id = ${user_id} and token = "${token}"`;
  console.log(query);
  try {
    [result] = await connection.query(query);
    if (result.length != 0) {
      query = `select * from sns_post as p join sns_share as s on p.user_id = s.giver_user_id where s.giver_user_id = ${user_id} or s.taker_user_id = ${user_id} order by p.created_at desc limit ${offset},${limit}`;
      try {
        [result] = await connection.query(query);
        res.status(200).json({ success: true, result: result });
      } catch (e) {
        res.status(500).json({ e });
      }
    }
  } catch (e) {
    res.status(500).json({ e });
  }
};

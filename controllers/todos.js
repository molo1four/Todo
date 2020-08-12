const connection = require("../db/mysql_connection");

// @desc    모든 할 일 목록을 불러오는 API
// @route   GET /api/v1/todos
// @parameters offset,limit (query)
exports.getTodos = async (req, res, next) => {
  let offset = req.query.offset;
  let limit = req.query.limit;

  let query = `select * from todo limit ${offset},${limit}`;

  try {
    [result] = await connection.query(query);
    res.status(200).json({ success: true, result: result });
  } catch (e) {
    console.log(e);
    res.status(500).json({ success: false });
  }
};

// @desc    완료여부 체크 및 해제
// @route   POST /api/v1/todos
// @parameters

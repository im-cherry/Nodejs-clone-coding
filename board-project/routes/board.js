var express = require("express");
var router = express.Router();
var mysql_conn = require("../db/db_conn")();
var conn = mysql_conn.init();

/* 게시판 목록 - GET */
router.get("/list", function (req, res, next) {
  var sql =
    "select idx, name, title, date_format(modidate, '%Y-%m-%d %H:%i:%s') modidate, date_format(regdate, '%Y-%m-%d %H:%i:%s') regdate, hit from board";
  conn.query(sql, function (err, result) {
    if (err) console.log("에러: " + err);
    res.render("board", { title: "게시판 리스트", boardList: result });
  });
});

/* 게시판 글쓰기 - GET */
router.get("/write", function (req, res, next) {
  res.render("write", { title: "게시판 글쓰기" });
});

/* 게시판 글쓰기 - POST */
router.post("/write", function (req, res, next) {
  var name = req.body.name;
  var title = req.body.title;
  var content = req.body.content;
  var password = req.body.password;
  var datas = [name, title, content, password];

  var sql =
    "insert into board(name, title, content, regdate, modidate, password, hit) values(?,?,?,now(),now(),?,0)";
  conn.query(sql, datas, function (err, result) {
    if (err) console.log("에러: " + err);
    res.redirect("/board/list");
  });
});

/* 게시판 글읽기 - GET */
router.get("/read/:idx", function (req, res, next) {
  var idx = req.params.idx;

  // 조회수 증가
  let sql = "update board set hit=hit+1 where idx=?";
  conn.query(sql, [idx], function (err, result) {
    if (err) console.log("에러: " + err);
  });

  // 게시글 상세조회하기
  sql =
    "select idx, name, title, content, date_format(modidate, '%Y-%m-%d %H:%i:%s') modidate, date_format(regdate, '%Y-%m-%d %H:%i:%s') regdate, hit from board where idx=?";
  conn.query(sql, [idx], function (err, result) {
    if (err) console.log("에러: " + err);
    res.render("read", { title: "게시판 글 상세보기", board: result[0] });
  });
});

/* 게시판 글수정 - POST */
router.post("/update", function (req, res, next) {
  var idx = req.body.idx;
  var name = req.body.name;
  var title = req.body.title;
  var content = req.body.content;
  var password = req.body.password;
  var datas = [name, title, content, idx, password];

  var sql =
    "update board set name=?, title=?, content=?, modidate=now() where idx=? and password=?";
  conn.query(sql, datas, function (err, result) {
    if (err) console.log("에러: " + err);
    if (result.affectedRows == 0) {
      res.send(
        "<script>alert('패스워드가 일치하지 않습니다.');history.back();</script>"
      );
    } else {
      res.redirect("/board/read/" + idx);
    }
  });
});

/* 게시판 글삭제 - POST */
router.post("/delete", function (req, res, next) {
  var idx = req.body.idx;
  var password = req.body.password;
  var datas = [idx, password];

  var sql = "delete from board where idx=? and password=?";
  conn.query(sql, datas, function (err, result) {
    if (err) console.log("에러: " + err);
    if (result.affectedRows == 0) {
      res.send(
        "<script>alert('패스워드가 일치하지 않습니다.');history.back();</script>"
      );
    } else {
      res.redirect("/board/list");
    }
  });
});

module.exports = router;

const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('navigation', { title: '首页',res:res});
});

router.get('/index', function(req, res, next) {
  res.render('index', { title: '首页',res:res});
});
module.exports = router;

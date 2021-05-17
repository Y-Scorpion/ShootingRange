const openPath = require('./openPath')
const express = require('express');
const routers = require('./routers');
const createError = require('http-errors');
const router = express.Router();


router.use(function (req, res, next) {
  console.log("看谁进来了"+req.path)
  // if (!req.cookies.token && openPath.indexOf(req.path) < 0) {

  if(openPath.indexOf(req.path)<0){
    console.log("请求到了")
  }
  next()
})
/**
 * 循环注册进路由
 */
for (const route of routers) {
  router.use(route.path, require(route.component))
}

// router.use('/',require('../routes/index'))
// router.use('*',require('../routes/404'))
// catch 404 and forward to error handler
router.use(function(req, res, next) {
  next(createError(404));
});
// error handler
router.use(function(err,req, res,next) {
  // set locals, only providing error in development
  console.log(err)
  // res.locals.error = req.app.get('env') === 'development' ? err : {};
  // res.locals.error.status = err.status?404:500
  res.status(err.status || 500)
  res.render("navigation",{ title: err.status,res:res})
});
module.exports = router;

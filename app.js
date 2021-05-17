const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan'); //日志系统
const fs = require('fs');
const ejs = require('ejs');
const interceptor = require('./middlewares/interceptor')
const app = express();
// view engine setup  //设置视图解析地址  + 设置框架视图
app.set('views', path.join(__dirname, 'views'));
app.engine('html', ejs.__express);
app.set('view engine', 'html');

app.use(logger('dev'));
// console.log(app.get('env')) //development 开发环境 production 生产环境
if(app.get('env') === 'production') {
  //生成日志文件
  const accessLogfile = fs.createWriteStream(path.join(__dirname,'/logs/access.log'), {
    flags: 'a'
  });
  app.use(logger("combined",{
    stream: accessLogfile
  }));
}
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname,'public')));

// app.use('/', require('./routes/index'));
// app.use('/users', require('./routes/users'));
// app.use('*',require('./routes/404'))
app.use(interceptor)

module.exports = app;

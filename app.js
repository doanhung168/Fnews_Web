require('dotenv').config()
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');

const indexRouter = require('./routes/page');
const usersRouter = require('./routes/api/users');


const db = require('./config/db')
db.connectDB(process.env.DATABASE_URL)

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/', indexRouter);
app.use('/users', usersRouter);

const multipart = require('connect-multiparty');
const multipartMiddleware = multipart();
const fs = require('fs');

app.post('/upload', multipartMiddleware, function(req, res) {
  console.log(req.body, req.files);
  try {
    fs.readFile(req.files.upload.path, function (err, data) {
      const newPath = __dirname + '/public/images/' + req.files.upload.name;
      fs.writeFile(newPath, data, function (err) {
        if (err) console.log({err: err});
        else {
          console.log(req.files.upload.originalFilename);
          //     imgl = '/images/req.files.upload.originalFilename';
          //     let img = "<script>window.parent.CKEDITOR.tools.callFunction('','"+imgl+"','ok');</script>";
          //    res.status(201).send(img);

          let fileName = req.files.upload.name;
          let url = '/images/'+fileName;
          let msg = 'Upload successfully';
          let funcNum = req.query.CKEditorFuncNum;
          console.log({url,msg,funcNum});

          res.status(201).send("<script>window.parent.CKEDITOR.tools.callFunction('"+funcNum+"','"+url+"','"+msg+"');</script>");
        }
      });
    });
  } catch (error) {
    console.log(error.message);
  }
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

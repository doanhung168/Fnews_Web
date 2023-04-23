require('dotenv').config()
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const session = require('express-session')
const passport = require('passport')
const mongoose = require('mongoose')

const userRouter = require('./routes/user_router');
const authRouter = require('./routes/auth_router')
const newsRouter = require('./routes/news_router')
const viewRouter = require('./routes/view_router')
const fieldRouter = require('./routes/field_router')
const otherRouter = require('./routes/other_router')
const videoRouter = require('./routes/video_router')


mongoose.connect(process.env.DATABASE_URL)
  .then(() => console.log('Database Connected!'))
  .catch((err) => console.log(err))

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(session({ secret: 'cats', resave: true, saveUninitialized: true }))
app.use(passport.initialize())
app.use(passport.session())
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({
  limit: '100mb',
  extended: true,
  parameterLimit: 100000
}))
app.use(bodyParser.json({ limit: '100mb' }))


app.use('', viewRouter)
app.use('/user', userRouter)
app.use('/news', newsRouter)
app.use('/auth', authRouter)
app.use('/other', otherRouter)
app.use('/field', fieldRouter)
app.use('/video', videoRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

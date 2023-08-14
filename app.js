const path = require('path');
const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const debug = require('debug')('app');
const compression = require('compression');
const helmet = require('helmet');
const RateLimit = require('express-rate-limit');

const devDbUrl = 'mongodb+srv://andrianarivodavid:M0lASDvMMNaryTUa@cluster0.tb7c5wk.mongodb.net/?retryWrites=true&w=majority';
const mongoDB = process.env.MONGODB_URI || devDbUrl;

async function main() {
  await mongoose.connect(mongoDB);
}

main().catch((err) => debug(err));

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const catalogRouter = require('./routes/catalog');

const app = express();

app.use(compression());

const limiter = RateLimit({
  windowMs: 60000, // 1 minute
  max: 500,
});
app.use(limiter);

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      'script-src': ['\'self\''],
    },
  }),
);

// view engine setup
app.use(expressLayouts);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/catalog', catalogRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

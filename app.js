const fs = require('fs');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;
const flash = require('connect-flash');
const dotenv = require('dotenv');

if (fs.existsSync(path.join(__dirname, '.env'))) {
  dotenv.config();
}

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/shipit');
mongoose.connection.on('error', (err) => {
  console.log(err);
  process.exit(1);
});

const views = require('./routes/views');
const api = require('./routes/api');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const MongoStore = require('connect-mongo')(session);

app.use(session({
  secret: process.env.SESSION_SECRET,
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
  }),
  resave: false,
  saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// Pass the user data to our Jade templates
app.use((req, res, next) => {
  const u = req.user;
  if (u) {
    delete u.hash;
  }

  res.locals.user = u;
  return next();
});

// pass passport for configuration
require('./config/passport.js')(passport);

// middleware to redirect the user to the dashboard if they already logged in
function isNotLoggedIn(req, res, next) {
  return (req.isAuthenticated() ? res.redirect('/') : next());
}

// Require that the user is not signed in
app.get('/login', isNotLoggedIn, views.login);

// Require that the user is signed in
app.get('/', ensureLoggedIn('/login'), views.index);
app.get('/student', ensureLoggedIn('/login'), views.student);
app.get('/professor', ensureLoggedIn('/login'), views.professor);

// API methods
app.post('/api/login', passport.authenticate('local-login', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true,
}));
app.post('/api/logout', api.postLogout);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
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

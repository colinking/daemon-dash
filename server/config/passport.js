const LocalStrategy = require('passport-local').Strategy;
// const helpers = require('../routes/helpers');

// load user model
const User = require('../models/user');

console.log('herewerwe');

module.exports = (passport) => {
  // =========================================================================
  // passport session setup ==================================================
  // =========================================================================
  // required for persistent login sessions
  // passport needs ability to serialize and unserialize users out of session

  // used to serialize the user for the session
  passport.serializeUser((user, done) => {
    console.log('here');
    done(null, user.id);
  });

  // used to deserialize the user
  passport.deserializeUser((id, done) => {
    console.log('here2');
    User.findById(id).lean().exec((err, user) => {
      done(err, user);
    });
  });

  // =========================================================================
  // LOCAL LOGIN  ============================================================
  // =========================================================================
  passport.use(new LocalStrategy({
    // by default, local strategy uses username and password,
    // we will override with email
    usernameField: 'email',
    passwordField: 'password',

    // allows us to pass back the entire request to the callback
    passReqToCallback: true,
  }, (req, rawEmail, password, done) => {
    const email = rawEmail.toLowerCase();
    console.log(email);
    console.log(password);
    User.findOne({ email }, (err, user) => {
      if (err) done(err);
      else if (!user) {
        req.session.submission = req.body;
        done({ err: 'weiufew' }, false);
      } else {
        user.comparePassword(password, (err2, valid) => {
          if (err) {
            console.log(err2);
            done(err);
          } else if (!valid) {
            req.session.submission = req.body;
            done({ err: 'wegwe' }, false);
          } else done(null, user);
        });
      }
    });
  }));
};

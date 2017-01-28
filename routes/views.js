const express = require('express');

const router = express.Router();

router.index = (req, res) => {
  res.redirect((req.user.type === 'patient' ? '/medications' : '/patients'));
};

router.login = (req, res) => {
  let sub = {};
  if (req.session.submission) {
    sub = req.session.submission;
    req.session.submission = null;
  }

  res.render('login', {
    title: 'Login',
    messages: req.flash('loginFlash'),
    hideNav: true,
    submission: sub,
  });
};

module.exports = router;

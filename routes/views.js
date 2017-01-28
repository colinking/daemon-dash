const express = require('express');

const router = express.Router();

router.index = (req, res) => {
  res.redirect((req.user.type === 'student' ? '/student' : '/professor'));
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

router.student = (req, res) => {
  res.render('student', {
    title: 'Student',
    messages: req.flash('studentsFlash'),
    hideNav: false,
  });
};

router.professor = (req, res) => {
  res.render('professor', {
    title: 'Professor',
    messages: req.flash('professorsFlash'),
    hideNav: false,
  });
};

module.exports = router;

const express = require('express');
const Lecture = require('./models/lecture');

const router = express.Router();

const sendJSON = (res, json) => {
  res.setHeader('content-type', 'application/json');
  res.send(JSON.stringify(json));
};

router.postLogout = (req, res) => {
  req.logout();
  // req.flash('loginFlash', {
  //   text: 'You have been logged out.',
  //   class: 'success',
  // });
  sendJSON(res, { redirect: '/login' });
};

router.getReq = (req, res) => {
  sendJSON(res, {
    isAuthenticated: req.isAuthenticated(),
    type: (req.isAuthenticated() ? req.user.type : null),
  });
};

router.getLectures = (req, res) => {
  Lecture.find().sort({ date: -1 }).exec((err, lectures) => {
    if (err) {
      sendJSON(res, { err });
    } else {
      sendJSON(res, { lectures });
    }
  });
};

export default router;

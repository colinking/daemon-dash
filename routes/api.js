const express = require('express');
const User = require('../models/user');

const router = express.Router();

const sendJSON = (res, json) => {
  res.setHeader('content-type', 'application/json');
  res.send(JSON.stringify(json));
};

router.postLogout = (req, res) => {
  req.logout();
  req.flash('loginFlash', {
    text: 'You have been logged out.',
    class: 'success',
  });
  sendJSON(res, { redirect: '/login' });
};

router.getPatients = (req, res) => {
  User
    .find({
      type: 'patient'
    })
    .sort({ name: 1 })
    .exec((err, response) => {
      if (err) {
        console.err(err);
      }
      console.log(response);
      sendJSON(res, response);
    });
};

router.upload = (req, res) => {
  console.log(req.file);
  res.send();
};

module.exports = router;

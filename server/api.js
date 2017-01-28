const express = require('express');
// const User = require('../models/user');

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

export default router;

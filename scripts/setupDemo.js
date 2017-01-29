/**
 * This script is used to initialize our MongoDB database
 * so that it includes a handful of patients, doctors and
 * medications for demo purposes.
 */
/* eslint no-console: "off"*/

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

/*
 * Load environment variables.
 */
if (fs.existsSync(path.join(__dirname, '../.env'))) {
  dotenv.config();
}

mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('error', (err) => {
  if (err) {
    throw err;
  }
});

const User = require('../server/models/user');
const Lecture = require('../server/models/lecture');

function clearDatabase(cb) {
  // Clear the user database
  User.remove({}, (err) => {
    if (err) cb(err);
    else {
      console.log('Cleared User database...');
      // Clear lecture database
      Lecture.remove({}, (err2) => {
        if (err) cb(err2);
        else {
          console.log('Cleared Lecture database...');
          cb(null);
        }
      });
    }
  });
}

const userbase = [
  new User({
    name: 'Nelson',
    email: 'nelson@example.com',
    hash: 'nelson',
    type: 'professor',
  }),
  new User({
    name: 'Darshan Shah',
    email: 'darshan@example.com',
    hash: 'darshan',
    type: 'student',
  }),
  new User({
    name: 'Colin King',
    email: 'colin@example.com',
    hash: 'colin',
    type: 'student',
  }),
  new User({
    name: 'Craig Weiss',
    email: 'craig@example.com',
    hash: 'craig',
    type: 'student',
  }),
  new User({
    name: 'Andrew Liu',
    email: 'andrew@example.com',
    hash: 'andrew',
    type: 'student',
  }),
];

const videobase = [
  new Lecture({
    name: 'example',
    start: new Date('Jan 28, 2017 09:00:00'),
    live: false,
    code: [
      {
        timestamp: new Date('Jan 28, 2017 09:00:01'),
        text: '',
      },
      {
        timestamp: new Date('Jan 28, 2017 09:00:02'),
        text: 'h',
      },
      {
        timestamp: new Date('Jan 28, 2017 09:00:03'),
        text: 'he',
      },
      {
        timestamp: new Date('Jan 28, 2017 09:00:05'),
        text: 'hel',
      },
      {
        timestamp: new Date('Jan 28, 2017 09:00:07'),
        text: 'hell',
      },
      {
        timestamp: new Date('Jan 28, 2017 09:00:08'),
        text: 'hello',
      },
    ],
  }),
  new Lecture({
    name: 'helloworld',
    start: new Date('Jan 29, 2017 08:30:00'),
    live: false,
    code: [],
  }),
  new Lecture({
    name: 'reversestring',
    start: new Date('Jan 29, 2017 10:30:00'),
    live: false,
    code: [],
  }),
];

function saveAll(objects, done) {
  let count = objects.length;
  const handleSave = (err) => {
    if (err) {
      done(err);
    } else {
      count -= 1;

      if (count === 0) {
        done(null, objects);
      }
    }
  };

  for (let i = 0; i < objects.length; i += 1) {
    const object = objects[i];
    object.save(handleSave);
  }
}

clearDatabase((err) => {
  if (err) throw err;
  else {
    saveAll(userbase, (err2) => {
      if (err2) throw err2;
      saveAll(videobase, (err3) => {
        if (err3) throw err3;
        console.log('Demo setup complete.');
        mongoose.connection.close();
      });
    });
  }
});

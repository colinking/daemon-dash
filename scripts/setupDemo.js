
/**
 * This script is used to initialize our MongoDB database
 * so that it includes a handful of patients, doctors and
 * medications for demo purposes.
 */

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/shipit');
mongoose.connection.on('error', (err) => {
  if (err) {
    console.log(err);
  }
});

const User = require('../models/user');

function clearDatabase(cb) {
  // Clear the user database
  User.remove({}, (err) => {
    if (err) cb(err);
    else {
      console.log('Cleared User database...');
      cb(null);
    }
  });
}

const userbase = [
  new User({
    name: 'Doctor A',
    email: 'doctora@test.com',
    hash: 'doctora',
    type: 'doctor',
  }),
  new User({
    name: 'Doctor B',
    email: 'doctorB@test.com',
    hash: 'doctorb',
    type: 'doctor',
  }),
  new User({
    name: 'Hannah Voelker',
    email: 'hannahvoelker13@gmail.com',
    hash: 'hannah',
    type: 'patient',
  }),
  new User({
    name: 'Alice Shi',
    email: 'alice@umd.edu',
    hash: 'alice',
    type: 'patient',
  }),
  new User({
    name: 'Colin King',
    email: 'colin.king.96@gmail.com',
    hash: 'colin',
    type: 'patient'
  }),
  new User({
    name: 'Sean Bae',
    email: 's@seanbae.net',
    hash: 'sean',
    type: 'patient',
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
  if (err) console.err(err);
  else {
    saveAll(userbase, (err2) => {
      if (err2) console.err(err2);
      console.log('Demo setup complete.');
      mongoose.connection.close();
    });
  }
});

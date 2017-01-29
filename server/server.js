import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import path from 'path';
import Socket from 'socket.io';
import compression from 'compression';
import passport from 'passport';
import session from 'express-session';
import bodyParser from 'body-parser';
import fs from 'fs';

import render from './render';
import websocket from './websocket';
import api from './api';

const app = express();
const server = http.Server(app);
const io = Socket(server);

// Server instance-unique webrtc room name.
const roomNonce = Math.random().toString(36).substring(7);

mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('error', () => {
  console.log('Database connection failed!'); // eslint-disable-line no-console
  process.exit();
});

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'pug');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(compression());
app.use('/public', express.static(path.join(__dirname, '../dist/public')));
app.use('/public/css',
    express.static(path.join(__dirname, '../node_modules/semantic-ui-css')));

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

// pass passport for configuration
require('./config/passport.js')(passport);

const dataStream = [];

// API methods
app.get('/api/req', api.getReq);
app.get('/api/lectures', api.getLectures);
app.post('/api/start', () => {
  console.log(dataStream);
  console.log('reseting data stream!');
  const newText = (dataStream.length > 0 ? dataStream[dataStream.length - 1].text : '//write your code here');
  dataStream.length = 0;
  dataStream.push({
    timestamp: Date.now(),
    text: newText,
  });
  console.log(dataStream);
});
app.post('/api/save', () => {
  console.log(dataStream);
  console.log('writing data stream!');
  fs.writeFile('dist/public/archives/code/codeSample.json', JSON.stringify(dataStream, null, 4), (err) => {
    if (err) console.error(err);
    else console.log('it is written (codeSample.json)');
  });
});
app.post('/api/login', (req, res, next) => {
  passport.authenticate('local', (err, user) => {
    if (!user) {
      return res.json({ error: 'Invalid credentials.' });
    }
    return req.logIn(user, {}, () => res.json(user));
  })(req, res, next);
});
app.post('/api/logout', api.postLogout);

app.get('*', render);

app.post('/nonce', (req, res) => {
  res.json({ nonce: roomNonce });
});

mongoose.connection.once('open', () => {
  server.listen(app.get('port'), () => {
    // eslint-disable-next-line no-console
    console.log('Server listening on port %d in %s mode.',
        app.get('port'), process.env.NODE_ENV);
  });
});

io.on('connection', websocket(dataStream));

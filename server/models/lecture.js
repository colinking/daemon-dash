const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const lectureSchema = new Schema({
  live: { type: Boolean, required: true },
  start: { type: Date, default: Date.now() },
  name: { type: String, required: true },
  code: [
    {
      timestamp: { type: Date, required: true },
      text: { type: String, default: '' },
    },
  ],
});

module.exports = mongoose.model('lecture', lectureSchema);

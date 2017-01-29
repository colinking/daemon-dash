const mongoose = require('mongoose');
const DateOnly = require('mongoose-dateonly')(mongoose);

const Schema = mongoose.Schema;

const lectureSchema = new Schema({
  live: { type: Boolean, required: true },
  date: { type: DateOnly, default: new DateOnly() },
  name: { type: String, required: true },
  code: [
    {
      timestamp: { type: Date, required: true },
      text: { type: String, required: true },
    },
  ],
});

module.exports = mongoose.model('lecture', lectureSchema);

const mongoose = require('mongoose');
const DateOnly = require('mongoose-dateonly')(mongoose);

const Schema = mongoose.Schema;

const medSchema = new Schema({
  metadata: {
    name: { type: String, required: true },
    dailyAmount: { type: Number, required: true },
    unit: { type: String, required: true }
  },
  data: [
    {
      day: { type: DateOnly, default: new DateOnly() },
      video: { type: String, required: true },
      status: { type: String, enum: ['nottaken', 'uploaded', 'approved', 'denied'], default: 'nottaken' }
    }
  ]
});

module.exports = mongoose.model('medication', medSchema);

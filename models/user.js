const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, index: { unique: true } },
  // initially set to plaintext password, then overwritten on save with hashed value
  hash: String,
  type: { type: String, enum: ['patient', 'doctor'] },
  // Only set for patients
  medications: [Schema.Types.ObjectId]
});

function presave(callback) {
  bcrypt.genSalt(10, (err, salt) => {
    const plainTextPassword = this.hash;
    bcrypt.hash(plainTextPassword, salt, null, (err, passwordHash) => {
      this.hash = passwordHash;
      callback();
    });
  });
}

userSchema.pre('save', presave);

userSchema.methods.comparePassword = function comparePassword(password, cb) {
  if (this.hash) {
    bcrypt.compare(password, this.hash, cb);
  } else cb(null, false);
};

module.exports = mongoose.model('user', userSchema);

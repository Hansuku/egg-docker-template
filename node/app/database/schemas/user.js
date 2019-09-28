/**
* Just for demonstration
*	Author:Han
*	Created At 2019/09/12 10:14:53
*/

const mongoose = require('mongoose');
const { Schema } = mongoose;
// let ObejectID = Schema.Types.ObjectId;
const bcrypt = require('bcryptjs');

// create userSchema
const userSchema = new Schema({
  phone: { unique: true, type: Number },
  username: String,
  password: String,
  createAt: { type: Date, default: Date.now() },
  lastLoginAt: { type: Date, default: Date.now() },
}, {
  collection: 'user',
});

userSchema.pre('save', function (next) {
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err)
    bcrypt.hash(this.password, salt, (err, hash) => {
      console.log(this.password)
      if (err) return next(err)
      this.password = hash
      next()
    });
  })
});

userSchema.methods = {
  comparePassword: (_password, password) => {
    return new Promise((resolve, reject) => {
      bcrypt.compare(_password, password, (err, isMatch) => {
        if (!err) resolve(isMatch)
        else reject(err);
      });
    });
  }
}
// release module
mongoose.model('User', userSchema);
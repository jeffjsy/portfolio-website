// require modules for the user model
let mongoose = require('mongoose');
let passportLocalMongoose = require('passport-local-mongoose');

let User = mongoose.Schema({
  username: {
    type: String,
    default: '',
    trim: true,
    required: 'Username is required'
  },
  email: {
    type: String,
    default: '',
    trim: true,
    required: 'Email address is required'
  },
  displayName: {
    type: String,
    default: '',
    trim: true,
    required: 'Display Name is required'
  },
  created: {
    type: Date,
    default: Date.Now    
  },
  update: {
    type: Date,
    default: Date.Now    
  }
},
{
  collection: "users"
});

// configure options for user model
let options = ({ missingPasswordError: 'Wrong / Missing Password'});

User.plugin(passportLocalMongoose, options);

module.exports.User = mongoose.model('User', User);
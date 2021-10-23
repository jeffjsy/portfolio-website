let mongoose = require('mongoose');

// create a model class
let contactModel = mongoose.Schema({
  username: String,
  password: String,
  email: String,
  phonenumber: String  
},
{
  collection: "contacts"
});

module.exports = mongoose.model('Contact', contactModel);
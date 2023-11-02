const { Long } = require('mongodb');
const mongoose = require('mongoose');


const userDataSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    picture: {
        type: String,
        required: true
    },
    verifiedEmail: {
        type: String,
        required: true
    },
    logInFrequency: {
        type: Number,
        required: true
    }
  },{timestamps: true});
  
  const UserData = mongoose.model('UserData', userDataSchema, 'UserData');

  module.exports = UserData;
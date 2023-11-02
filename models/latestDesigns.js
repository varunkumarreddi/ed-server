const mongoose = require('mongoose');


const latestDesignSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    images: {
        type: [],
        required: true
    }
  },{timestamps: true});
  
  const LatestDesigns = mongoose.model('LatestDesigns', latestDesignSchema, 'LatestDesigns');

  module.exports = LatestDesigns;
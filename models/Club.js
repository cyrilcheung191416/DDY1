const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ClubSchema = new Schema({
  first_name: {
    type: String,
    required: true,
  },
  middle_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('club', ClubSchema);

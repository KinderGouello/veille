const mongoose = require('mongoose');

const itemSchema = mongoose.Schema({
  name: {
    type: String,
    // required: true,
  },
  url: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  additionnalInformations: mongoose.Schema.Types.Mixed,
  type: {
    type: String,
    enum: ['article', 'tweet', 'medium'],
    required: true,
  },
  read: {
    type: Boolean,
    default: false,
  },
  saved: {
    type: Boolean,
    default: false,
  },
});
const Item = mongoose.model('Item', itemSchema);

module.exports = {
  "schema": itemSchema,
  find: () => Item.find().exec(),
};
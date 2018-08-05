const mongoose = require('mongoose');
const Item = require('./item');

const Category = mongoose.model('Category', mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  children: [Item.schema],
}));

module.exports = {
};
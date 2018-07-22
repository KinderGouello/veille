const mongoose = require('mongoose');
const Item = require('./item');

const Rss = mongoose.model('Rss', mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
    validate: {
      validator: async (url) => await mongoose.models['Rss'].count({ url }).exec() <= 0,
      message: '{VALUE} already exist !'
    },
  },
  items: [Item.schema],
}));

module.exports = {
  create: (...args) => new Rss(...args),
  find: () => Rss.find().exec(),
  findWithSelect: (opts) => Rss.find().select(opts).exec(), 
  save: (rss) => rss.save(),
};
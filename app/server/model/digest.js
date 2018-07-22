const mongoose = require('mongoose');
const Item = require('./item');
const R = require('ramda');

const Digest = mongoose.model('Digest', mongoose.Schema({
  type: {
    type: String,
    enum: ['daily', 'weekly', 'monthly'],
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  items: [Item.schema],
  read: {
    type: Boolean,
    default: false,
  },
}));

module.exports = {
  create: (...args) => new Digest(...args),
  findLatestDaily: () => Digest.find()
    .where('type').equals('daily')
    .where('read').equals(false)
    .sort('-date')
    .limit(1)
    .exec(),
  addItem: async (digestId, itemId) => {
    const digest = await Digest.findById(digestId).exec();
    const item = digest.items.id(itemId);

    return digest;

    // digest.items = R.reject(R.propEq('id', itemId), digest.items);
    // return digest.save();
  },
  save: (digest) => digest.save(),
};
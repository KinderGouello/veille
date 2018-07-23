const mongoose = require('mongoose');
const Item = require('./item');

const ToRead = mongoose.model('ToRead', Item.schema);

module.exports = {
  add: (item) => {
    item.isNew = true;
    return ToRead.create(item);
  },
};
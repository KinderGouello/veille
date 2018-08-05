const Digest = require('../../model/digest');
const Item = require('../../model/item');

module.exports = async (req, res) => { 
  const digest = await Digest.addItem(req.params.digestId, req.params.itemId);

  return res.send(digest);
};
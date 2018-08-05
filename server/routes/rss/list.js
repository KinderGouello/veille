const Rss = require('../../model/rss');

module.exports = async (req, res) => {
  const feeds = await Rss.find();

  res.set('Access-Control-Expose-Headers', 'x-total-count');
  res.set('X-Total-Count', feeds.length);
  return res.send(feeds.map(feed => ({ ...feed.toObject(), ...{ id: feed._id } })));
};
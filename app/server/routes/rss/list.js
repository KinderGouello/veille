const Rss = require('../../model/rss');

module.exports = async (req, res) => {
  const feeds = await Rss.find();

  return res.render('rss/list', { feeds });
};
const Parser = require('rss-parser');
const Rss = require('../../model/rss');

module.exports = async (req, res) => {
  const parser = new Parser();

  try {
    const feed = await parser.parseURL(req.body.url);

    const rss = Rss.create({
      name: feed.title,
      url: req.body.url,
      items: feed.items.map(item => ({
        name: item.title,
        url: item.link,
        date: item.pubDate,
        type: 'article',
      })),
    });
    await rss.save();
  } catch (error) {
    console.log(error);
  }

  return res.redirect('/rss/add');
};
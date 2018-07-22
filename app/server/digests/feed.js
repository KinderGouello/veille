const Parser = require('rss-parser');
const Rss = require('../model/rss');
const R = require('ramda');
const moment = require('moment');

module.exports = {
  getFeeds: async () => {
    const parser = new Parser();
    const feeds = await Rss.findWithSelect('url');
    feedsPromises = feeds.map(feed => parser.parseURL(feed.url));
    return Promise.all(feedsPromises);
  },
  parseFeeds: (feeds, since) =>
    R.pipe(
      R.map(feed => feed.items),
      R.flatten(),
      R.filter(article => since < moment(article.pubDate)),
      R.sort(R.descend(R.prop('pubDate'))),
      R.map(article => ({
        name: article.title,
        url: article.link,
        date: article.pubDate,
        type: 'article',
      })),
    )(feeds),
};

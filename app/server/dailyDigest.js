const moment = require('moment');
const feedDigest = require('./digests/feed');
const mediumDigest = require('./digests/medium');
const twitterDigest = require('./digests/twitter');
const db = require('./lib/db');
const Digest = require('./model/digest');
const Item = require('./model/item');

(async () => {
  const since = moment().subtract(1, 'days');
  await db.connect();

  const [feedsArticles, mediumArticles, tweets] = await Promise.all([
    feedDigest.getFeeds(),
    mediumDigest.getArticles(since),
    twitterDigest.getTweets(since),
  ]);

  const items = [
    ...feedDigest.parseFeeds(feedsArticles, since),
    ...mediumDigest.parseArticles(mediumArticles),
    ...twitterDigest.parseTweets(tweets)
  ];

  const digest = Digest.create({
    type: 'daily',
    date: since.format('YYYY-MM-DD'),
    items,
  });
  const save = await digest.save();
  console.log(save);
})();
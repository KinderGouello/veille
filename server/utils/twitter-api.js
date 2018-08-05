require('dotenv').config();
const Twitter = require('twitter');
const moment = require('moment');

const getClient = () => new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

module.exports = {
  getListMembers: (...args) => getClient().get('lists/members', ...args),
  searchTweetFromAndSince: (screenName, since) => getClient().get('search/tweets', {
    q: `from:${screenName} AND -filter:retweets AND -filter:replies since:${since.format('YYYY-MM-DD')} until:${moment().format('YYYY-MM-DD')}`,
    result_type: 'recent',
    include_entities: false,
  }),
};

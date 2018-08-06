if (process.env.NODE_ENV === 'production') require('dotenv').config();
const twitter = require('../utils/twitter-api');
const moment = require('moment');
const R = require('ramda');
const logger = require('../lib/logger');

module.exports = {
  getTweets: async (since) => {
    const members = await twitter.getListMembers({
      slug: 'dev',
      owner_screen_name: process.env.TWITTER_SCREEN_NAME,
    });

    const tweetsPromises = members.users.map((member) =>
      twitter.searchTweetFromAndSince(member.screen_name, since)
    );

    return Promise.all(tweetsPromises);
  },
  parseTweets: (tweets) =>
    R.pipe(
      R.reduce((acc, val) => [...acc, ...val.statuses], []),
      R.sort(R.descend(R.prop('id'))),
      R.map(tweet => {
        return {
          name: tweet.text,
          url: `https://twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}`,
          date: moment(new Date(tweet.created_at)).format('HH:mm A - D MMM YY'),
          additionnalInformations: {
            id_str: tweet.id_str,
            text: tweet.text,
            user: {
              name: tweet.user.name,
              screen_name: tweet.user.screen_name,
              url: tweet.user.url,
              image: tweet.user.profile_image_url_https,
            },
            retweet_count: tweet.retweet_count,
            favorite_count: tweet.favorite_count,
          },
          type: 'tweet',
        };
      }),
    )(tweets),
};

const cheerio = require('cheerio');
const request = require('request-promise-native');
const moment = require('moment');
const R = require('ramda');

const byInterestingCategories = tag =>
  [
    'Today’s highlights',
    'Based on your reading history',
    'Applause from people you follow',
    'Best in Programming',
  ]
    .includes(tag.children[0].data);

const onlyTitleLink = link =>
  link.children.length > 0 &&
  link.children[0].data !== undefined &&
  link.attribs.class !== 'email-link' &&
  !link.children[0].data.startsWith('\n');

const extractHref = links => R.pipe(
  R.filter(onlyTitleLink),
  R.map(link => link.attribs.href),
)(links);

const extractUrls = $ => arr =>
  arr.map(tag => extractHref($(tag.parent).find('a').toArray()));

const removeDuplicates = arr => arr.filter((elem, pos, array) => array.indexOf(elem) === pos);

module.exports = {
  getArticlesLinksFromMail: content => {
    const $ = cheerio.load(content);

    return R.pipe(
      R.filter(byInterestingCategories),
      extractUrls($),
      R.flatten,
      removeDuplicates,
    )($('.email-bold').toArray());
  },
  getArticle: url => request({ uri: url, transform: body => cheerio.load(body) }),
  extractInfos: (body) => ({
    url: body('link[rel="canonical"]').attr('href'),
    title: body('h1').text(),
    date: moment(body('article header time').attr('datetime')).format('YYYY-MM-DD'),
    claps: body('article .postActions .js-multirecommendCountButton').text(),
    readingTime: body('article header .readingTime').attr('title'),
    author: {
      picture: body('article header .avatar-image').attr('src'),
      name: body('article header .ds-link').text(),
    },
  }),
};
const home = require('../routes/home');
const rssList = require('../routes/rss/list');
const rssAddGet = require('../routes/rss/add.get');
const rssAddPost = require('../routes/rss/add.post');

const routes = [
  { method: 'get', path: '/', handler: home },
  { method: 'get', path: '/rss', handler: rssList },
  { method: 'get', path: '/rss/add', handler: rssAddGet },
  { method: 'post', path: '/rss/add', handler: rssAddPost },
];
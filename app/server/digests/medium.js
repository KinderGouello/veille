const gmail = require('../utils/google-api');
const medium = require('../utils/medium-api');
const R = require('ramda');

module.exports = {
  getArticles: async (since) => {
    const mails = await gmail.getMails({
      userId: 'me',
      q: `Medium Daily Digest after: ${since.format('YYYY/MM/DD')}`,
    });

    const promisesMailsContents = mails.data.messages.map(mail => gmail.getMail({ id: mail.id, userId: 'me' }));

    const mailsContents = await Promise.all(promisesMailsContents);

    const mediumLinks = R.flatten(
      mailsContents.map(content => medium.getArticlesLinksFromMail(content))
    );

    return Promise.all(mediumLinks.map(url => medium.getArticle(url)));
  },
  parseArticles: (articles) =>
    R.pipe(
      R.map(body => medium.extractInfos(body)),
      R.map(article => ({
        name: article.title,
        url: article.url,
        date: article.date,
        additionnalInformations: {
          claps: article.claps,
          readingTime: article.readingTime,
          author: article.author,
        },
        type: 'medium',
      })),
    )(articles),
}

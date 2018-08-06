require('dotenv').config();
const { google } = require('googleapis');
const { promisify } = require('util');

const getClient = () => {
  const oAuth2Client = new google.auth.OAuth2(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET, process.env.GOOGLE_REDIRECT_URI);
  oAuth2Client.setCredentials({
    "access_token": process.env.GOOGLE_ACCESS_TOKEN,
    "token_type": "Bearer",
    "refresh_token": process.env.GOOGLE_REFRESH_TOKEN,
    "expiry_date": 1530140497541
  });

  return google.gmail({ version: 'v1', auth: oAuth2Client });
};

module.exports = {
  getMails: (...args) => {
    const gmail = getClient();

    return promisify(gmail.users.messages.list)(...args);
  },
  getMail: (...args) => new Promise((resolve, reject) => {
    const gmail = getClient();

    gmail.users.messages.get(...args, (err, { data }) => {
      if (err) reject(err);

      const buf = Buffer.from(data.payload.parts[1].body.data, 'base64').toString('utf8');;
      resolve(buf);
    });
  }),
}

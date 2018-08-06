if (process.env.NODE_ENV === 'production') require('dotenv').config();
const mongoose = require('mongoose');

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  name: process.env.DB_NAME,
};

module.exports = {
  connect: () => {
    mongoose.connect(`mongodb://${config.user}:${config.password}@${config.host}:${config.port}/${config.name}`, { useNewUrlParser: true })
      .then(() => {
        console.log('connected to database');
      });
  },
};

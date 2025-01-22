require('dotenv').config();
module.exports = {
  env: {
    API_URL: process.env.API_URL,
    CONNECTION_STRING:process.env.CONNECTION_STRING,
  },
};

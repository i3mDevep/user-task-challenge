require('ts-node/register');
const config = require('./config.json');

module.exports = {
  username: config.development.username,
  password: config.development.password,
  database: config.development.database,
  host: config.development.host,
  dialect: config.development.dialect,
  port: config.development.port,
};

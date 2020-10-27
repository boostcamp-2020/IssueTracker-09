const githubStrategy = require('./github');
const jwtStrategy = require('./jwt');

const initStrategy = () => {
  githubStrategy();
  jwtStrategy();
};

module.exports = initStrategy;

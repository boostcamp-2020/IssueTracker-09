const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;
module.exports = {
  createJWT: (id) => jwt.sign({ id }, JWT_SECRET),
  verifyJWT: (token) => {
    try {
      const id = jwt.verify(token, JWT_SECRET);
      return id;
    } catch (error) {
      return false;
    }
  },
};

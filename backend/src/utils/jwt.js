const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;
module.exports = {
  createJWT: (name) => jwt.sign({ name }, JWT_SECRET, { expiresIn: '2h' }),
  verifyJWT: (token) => {
    try {
      const id = jwt.verify(token, JWT_SECRET);
      return id;
    } catch {
      return false;
    }
  },
};

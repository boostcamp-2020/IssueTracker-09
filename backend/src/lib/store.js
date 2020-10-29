const userList = {};

module.exports = {
  enrollList: (userId) => {
    userList[userId] = true;
  },
  dodgeList: (userId) => {
    userList[userId] = false;
  },
  checkList: (userId) => {
    if (userList[userId]) {
      return false;
    }
    return true;
  },
};

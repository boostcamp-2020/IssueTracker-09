const Issue = require('../model').Issue;

module.exports = {
  remove: async ({ id }) => {
    if (!id) {
      return { error: '없는 id값 입니다.' };
    }
    const issue = await Issue.destroy({ where: { id } });
    if (issue) {
      return true;
    }
    return { error: '없는 id값 입니다.' };
  },
};

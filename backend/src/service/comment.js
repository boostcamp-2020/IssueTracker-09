const Comment = require('../model').Comment;

module.exports = {
  create: async ({ content, userId, issueId }) => {
    if (!content || !userId || !issueId) {
      return { error: '정보가 부족합니다' };
    }

    const comment = await Comment.create({
      content: content,
      user_id: userId,
      issue_id: issueId,
    });

    return comment;
  },

  remove: async ({ commentId }) => {
    if (!commentId) {
      return { error: '정보가 부족합니다' };
    }

    const comment = await Comment.destroy({ where: { id: commentId } });

    return comment;
  },

  update: async () => {},
};

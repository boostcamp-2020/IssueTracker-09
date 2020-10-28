const Comment = require('../model').Comment;

module.exports = {
  addComment: async ({ content, userId, issueId }) => {
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
};

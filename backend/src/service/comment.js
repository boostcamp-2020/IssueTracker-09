const Model = require('../model');

module.exports = {
  create: async ({ content, userId, issueId }) => {
    if (!content || !userId || !issueId) {
      return { error: '정보가 부족합니다' };
    }

    const comment = await Model.Comment.create({
      content: content,
      user_id: userId,
      issue_id: issueId,
    });

    return comment;
  },

  read: async ({ id } = {}) => {
    if (!id) {
      return { error: '정보가 부족합니다' };
    }

    const comments = await Model.Comment.findAll({
      where: { issue_id: id },
    });

    return { comments };
  },

  readById: async ({ id }) => {
    if (!id) {
      return { error: '정보가 부족합니다.' };
    }

    const comments = await Model.Comment.findAll({
      include: [{ model: Model.User }],
      where: { issue_id: id },
    });

    return { comments };
  },

  remove: async ({ id }) => {
    if (!id) {
      return { error: '정보가 부족합니다' };
    }

    const comment = await Model.Comment.destroy({ where: { id } });

    if (comment) {
      return { response: true };
    }
    return { error: '존재하지 않는 댓글입니다' };
  },

  update: async ({ id, content }) => {
    if (!id) {
      return { error: '정보가 부족합니다' };
    }

    const [comment] = await Model.Comment.update(
      { content },
      { where: { id } }
    );

    if (comment) {
      return { response: true };
    }
    return { error: '존재하지 않는 댓글입니다' };
  },
};

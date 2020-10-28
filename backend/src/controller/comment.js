const commentService = require('../service/comment');

module.exports = {
  addComment: async (req, res) => {
    try {
      const comment = await commentService.addComment(req.body);

      if (!comment.error) {
        return res.status(201).json(comment);
      }
      return res.status(403).json(comment.error);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
};

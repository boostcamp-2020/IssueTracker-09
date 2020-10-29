const imageService = require('../service/image');

module.exports = {
  upload: (req, res) => {
    try {
      const fileURL = imageService.upload(req.file);
      if (fileURL) {
        return res.status(200).json({ fileURL });
      }
      return res.status(401).json({ error: '업로드 에러' });
    } catch (error) {
      return res.status(500).json({ error });
    }
  },
};

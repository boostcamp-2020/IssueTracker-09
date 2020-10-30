const imageService = require('../service/image');

module.exports = {
  upload: (req, res) => {
    try {
      const fileURL = imageService.upload(req.file);
      if (!fileURL.error) {
        return res.status(201).json({ fileURL });
      }
      return res.status(401).json(fileURL.error);
    } catch (error) {
      return res.status(500).json({ error });
    }
  },
};

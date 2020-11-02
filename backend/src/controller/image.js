const imageService = require('../service/image');
const control = require('../lib/controller');

module.exports = {
  upload: (req, res) => {
    const { status, result } = control(imageService.upload, req.file, 201);

    return res.status(status).json(result);
  },
};

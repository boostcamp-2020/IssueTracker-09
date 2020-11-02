const imageService = require('../service/image');
const control = require('../lib/controller');

module.exports = {
  upload: async (req, res) => {
    const { status, result } = await control(
      imageService.upload,
      req.file,
      201
    );

    return res.status(status).json(result);
  },
};

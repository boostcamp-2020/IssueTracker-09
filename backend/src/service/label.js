const Label = require('../model').Label;

module.exports = {
  create: async ({ color, title, content }) => {
    try {
      const result = await Label.create({ color: color, title: title });
      return true;
    } catch (error) {
      return false;
    }
  },
  get: async () => {
    try {
      const result = await Label.findAll();
      return result;
    } catch (error) {
      return false;
    }
  },
};

const Label = require('../model').Label;

module.exports = {
  create: async ({ color, title, content }) => {
    try {
      const result = await Label.create({ color, title, content });
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
  update: async ({ id, color, title, content }) => {
    try {
      const result = await Label.update(
        { color, title, content },
        { where: { id } }
      );
      return true;
    } catch (error) {
      return false;
    }
  },
  remove: async ({ id }) => {
    try {
      await Label.destroy({ where: { id } });
      return true;
    } catch (error) {
      return false;
    }
  },
};

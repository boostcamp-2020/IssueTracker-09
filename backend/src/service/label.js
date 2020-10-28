const Label = require('../model').Label;

module.exports = {
  create: async ({ color, title, content }) => {
    try {
      return await Label.create({ color, title, content });
    } catch (error) {
      return { error };
    }
  },
  read: async () => {
    try {
      return await Label.findAll();
    } catch (error) {
      return { error };
    }
  },
  update: async ({ id, color, title, content }) => {
    try {
      await Label.update({ color, title, content }, { where: { id } });
      return true;
    } catch (error) {
      return { error };
    }
  },
  remove: async ({ id }) => {
    try {
      await Label.destroy({ where: { id } });
      return true;
    } catch (error) {
      return { error };
    }
  },
};

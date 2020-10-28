const Label = require('../model').Label;

module.exports = {
  create: async ({ color, title, content }) => {
    try {
      const result = await Label.create({ color: color, title: title });
      console.log(result);
      return true;
    } catch (error) {
      return false;
    }
  },
};

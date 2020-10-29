const Label = require('../model').Label;

module.exports = {
  create: async ({ color, title, content }) => {
    if (!color || !title) {
      return { error: '정보가 부족합니다' };
    }
    return await Label.create({ color, title, content });
  },
  read: async () => {
    return await Label.findAll();
  },
  update: async ({ id, color, title, content }) => {
    if (!id || !color || !title) {
      return { error: '정보가 부족합니다' };
    }
    const [label] = await Label.update(
      { color, title, content },
      { where: { id } }
    );
    if (label) {
      return true;
    }
    return { error: '없는 id값 입니다' };
  },
  remove: async ({ id }) => {
    if (!id) {
      return { error: '없는 id값 입니다' };
    }
    const label = await Label.destroy({ where: { id } });
    if (label) {
      return true;
    }
    return { error: '없는 id값 입니다' };
  },
};

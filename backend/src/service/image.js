module.exports = {
  upload: async ({ filename }) => {
    if (!filename || !filename.match(/\.(jpeg|jpg|png)$/gi)) {
      return { error: '파일이 잘못되었거나 없습니다' };
    }
    return { imageURL: process.env.SERVER_URL + filename };
  },
};

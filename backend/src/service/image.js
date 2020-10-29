module.exports = {
  upload: ({ filename }) => {
    return process.env.SERVER_URL + filename;
  },
};

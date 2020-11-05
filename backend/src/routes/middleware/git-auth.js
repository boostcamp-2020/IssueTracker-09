const axios = require('axios');

module.exports = async (req, res, next) => {
  try {
    const { code } = req.body;

    const response = await axios.post(
      'https://github.com/login/oauth/access_token',
      {
        code,
        client_id: process.env.GITHUB_ID, // 내 APP의 정보
        client_secret: process.env.GITHUB_SECRET, // 내 APP의 정보
      },
      {
        headers: {
          accept: 'application/json',
        },
      }
    );

    const token = response.data.access_token;

    const {
      data: { login, id, avatar_url },
    } = await axios.get('https://api.github.com/user', {
      headers: {
        Authorization: `token ${token}`,
      },
    });

    req.data = { name: login, id, image: avatar_url };
  } catch (error) {
    return res.status(500).json({ error: '로그인 실패' });
  }
  next();
};

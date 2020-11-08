import request from '../lib/axios';

export const loginAPI = async (code) => {
  try {
    const {
      data: { token, image, name },
    } = await request({
      method: 'post',
      params: '/user/github',
      data: { code },
    });

    if (token) {
      localStorage.setItem('jwt_token', token);
    }
    return { image, name };
  } catch (error) {
    return false;
  }
};

export const getUserAPI = async () => {
  try {
    const { data } = await request({ method: 'get', params: '/user' });
    return { image: data.image, name: data.name };
  } catch (error) {
    return false;
  }
};

export const getUsersAPI = async () => {
  try {
    const {
      data: { assignee },
    } = await request({ method: 'get', params: '/user/users' });
    return { assignee };
  } catch (error) {
    return false;
  }
};

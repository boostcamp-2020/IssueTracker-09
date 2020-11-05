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

export const getUserAPI = () => {
  // try {
  //   // const data = await request({ method: 'get', params: '/user' });
  //   // return data;
  //   return { image: 'nice', name: 'nice' };
  // } catch (error) {
  //   return false;
  // }
};

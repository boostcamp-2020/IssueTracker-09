// import request from '../lib/axios';

const loginAPI = async () => {
  // const result = await request({ method: 'get', params: '/user/github' });
  window.location.href = 'http://localhost:3000/api/user/github';
};

export default loginAPI;

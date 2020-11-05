import axios from 'axios';

const loginAPI = async (code) => {
  const {
    data: { token },
  } = await axios.post(`http://localhost:3000/api/user/github`, {
    code,
  });

  if (token) {
    localStorage.setItem('jwt_token', token);
  }
};

export default loginAPI;

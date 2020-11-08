import request from '../lib/axios';

const getListAPI = async (search) => {
  try {
    const {
      data: { issues },
    } = await request({
      method: 'get',
      params: `/issue?q=${search}`,
    });

    return { issues };
  } catch (error) {
    return false;
  }
};

export default getListAPI;

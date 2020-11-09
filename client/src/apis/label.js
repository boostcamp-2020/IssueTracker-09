import request from '../lib/axios';

export const getLabelsAPI = async () => {
  try {
    const {
      data: { labels },
    } = await request({ method: 'get', params: '/label' });
    return labels;
  } catch (error) {
    return false;
  }
};

export default getLabelsAPI;

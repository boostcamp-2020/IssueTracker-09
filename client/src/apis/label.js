import request from '../lib/axios';

export const createeLabelAPI = async (data) => {
  try {
    await request({ method: 'post', params: `/label`, data });
    return true;
  } catch (error) {
    return false;
  }
};

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

export const updateLabelAPI = async (id, data) => {
  try {
    await request({ method: 'put', params: `/label/${id}`, data });
    return true;
  } catch (error) {
    return false;
  }
};

export const deleteLabelAPI = async (id) => {
  try {
    await request({ method: 'delete', params: `/label/${id}` });
    return true;
  } catch (error) {
    return false;
  }
};

import request from '../lib/axios';

export const getMilestonesAPI = async () => {
  try {
    const {
      data: { milestones },
    } = await request({ method: 'get', params: '/milestone' });
    return milestones;
  } catch (error) {
    return false;
  }
};

export default getMilestonesAPI;

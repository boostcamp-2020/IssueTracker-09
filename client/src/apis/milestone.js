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

export const createMilestoneAPI = async (title, content, deadline) => {
  try {
    await request({
      method: 'post',
      params: '/milestone',
      data: {
        title,
        content,
        deadline,
      },
    });

    return true;
  } catch (error) {
    return false;
  }
};

export const updateMilestoneAPI = async (id, title, deadline, content) => {
  try {
    await request({
      method: 'put',
      params: `/milestone/${id}`,
      data: {
        title,
        deadline,
        content,
      },
    });

    return true;
  } catch (error) {
    return false;
  }
};

export const updateMilestoneStateAPI = async (id, isOpened) => {
  try {
    await request({
      method: 'put',
      params: `/milestone/state/${id}`,
      data: {
        isOpened,
      },
    });
    return true;
  } catch (error) {
    return false;
  }
};

export const removeMilestoneAPI = async (id) => {
  try {
    await request({
      method: 'delete',
      params: `/milestone/${id}`,
    });
    return true;
  } catch (error) {
    return false;
  }
};

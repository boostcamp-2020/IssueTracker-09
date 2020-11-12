import request from '../lib/axios';

const createIssueAPI = async (data) => {
  try {
    const result = await request({
      method: 'post',
      params: `/issue`,
      data,
    });

    return result.data;
  } catch (error) {
    return false;
  }
};
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

const getIssueByIdAPI = async (id) => {
  try {
    const { data } = await request({
      method: 'get',
      params: `/issue/${id}`,
    });

    return data;
  } catch (error) {
    return false;
  }
};

const updateState = async (checked, state) => {
  try {
    await request({
      method: 'put',
      params: '/issue/state',
      data: {
        id: checked,
        isOpened: state,
      },
    });

    return true;
  } catch (error) {
    return false;
  }
};

const updateAssigneeAPI = async (id, assigneeId, joined) => {
  try {
    await request({
      method: 'PUT',
      params: `/issue/assignee/${id}`,
      data: {
        assigneeId,
        joined,
      },
    });

    return true;
  } catch (error) {
    return false;
  }
};

const updateMilestoneAPI = async (id, milestoneId) => {
  try {
    await request({
      method: 'PUT',
      params: `/issue/milestone/${id}`,
      data: {
        milestoneId,
      },
    });

    return true;
  } catch (error) {
    return false;
  }
};

const updateLabelAPI = async (id, labelId, joined) => {
  try {
    await request({
      method: 'PUT',
      params: `/issue/label/${id}`,
      data: {
        labelId,
        joined,
      },
    });

    return true;
  } catch (error) {
    return false;
  }
};

const updateTitleAPI = async (id, title) => {
  try {
    await request({
      method: 'PUT',
      params: `/issue/title/${id}`,
      data: {
        title,
      },
    });
    return true;
  } catch (error) {
    return false;
  }
};

export {
  createIssueAPI,
  getListAPI,
  getIssueByIdAPI,
  updateAssigneeAPI,
  updateMilestoneAPI,
  updateLabelAPI,
  updateTitleAPI,
  updateState,
};

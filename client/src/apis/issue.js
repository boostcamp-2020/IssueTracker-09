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

const updateAssigneesAPI = async (id, checked, unchecked) => {
  try {
    await request({
      method: 'PUT',
      params: `/issue/assignees/${id}`,
      data: {
        checked,
        unchecked,
      },
    });
    return true;
  } catch (error) {
    return false;
  }
};

// export default getIssueByIdAPI;
export { getListAPI, getIssueByIdAPI, updateAssigneesAPI };

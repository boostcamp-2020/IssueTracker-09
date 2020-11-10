import request from '../lib/axios';

const getCommentAPI = async (id) => {
  try {
    const {
      data: { comments },
    } = await request({
      method: 'get',
      params: `/comment/${id}`,
    });

    return { comments };
  } catch (error) {
    return false;
  }
};

// export default getIssueByIdAPI;
export default getCommentAPI;

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

const createCommentAPI = async (content, userId, issueId) => {
  try {
    await request({
      method: 'POST',
      params: '/comment',
      data: {
        content,
        userId,
        issueId,
      },
    });

    return true;
  } catch (error) {
    return false;
  }
};

const updateCommentAPI = async (id, content) => {
  try {
    await request({
      method: 'PUT',
      params: `/comment/${id}`,
      data: {
        content,
      },
    });

    return true;
  } catch (error) {
    return false;
  }
};

// export default getIssueByIdAPI;
export { getCommentAPI, updateCommentAPI, createCommentAPI };

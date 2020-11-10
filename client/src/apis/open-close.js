import request from '../lib/axios';

const openOrClose = async (checked, state) => {
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

export default openOrClose;

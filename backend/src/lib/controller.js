module.exports = async (service, param, status = 200) => {
  try {
    const result = await service(param);

    if (!result.error) {
      return { status, result };
    }
    return { status: 400, result: result.error };
  } catch (error) {
    return { status: 500, result: error };
  }
};

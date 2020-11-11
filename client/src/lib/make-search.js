const makeSearch = (str, search = '') => {
  const diff = str.split(':')[0];
  const searchArr = search.split(' ').filter((item) => item !== '');
  let flag = false;
  const newSearch = searchArr.map((item) => {
    if (item.includes(diff)) {
      flag = true;
      return str;
    }
    return item;
  });

  if (!flag) {
    newSearch.push(str);
  }
  return `?q=${newSearch.join(' ')}`;
};

export default makeSearch;

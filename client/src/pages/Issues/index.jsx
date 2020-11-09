import React, { useState } from 'react';
import IssueList from '../../components/IssueList';
import ListHeader from '../../components/ListHeader';

const Issues = () => {
  const [checked, setChecked] = useState([]);
  const checkedHandler = (id) => {
    if (checked.includes(id)) {
      return setChecked(checked.filter((c) => c !== id));
    }
    return setChecked([...checked, id]);
  };

  const allCheckedHandler = (ids) => {
    setChecked(ids);
  };

  return (
    <div>
      <ListHeader checkedHandler={allCheckedHandler} checked={checked} />
      <IssueList checkedHandler={checkedHandler} checked={checked} />
    </div>
  );
};

export default Issues;

/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import IssueList from '../../components/IssueList';
import ListHeader from '../../components/ListHeader';
import ResetFilter from '../../components/ResetFilter';

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

  const overlay = document.getElementById('overlay');
  overlay.addEventListener('click', () => {
    const details = Object.entries(document.getElementsByTagName('details'));
    details.forEach(([_, detail]) => {
      detail.toggleAttribute('open', false);
    });
    overlay.hidden = true;
  });
  return (
    <div>
      <ResetFilter />
      <ListHeader checkedHandler={allCheckedHandler} checked={checked} />
      <IssueList checkedHandler={checkedHandler} checked={checked} />
    </div>
  );
};

export default Issues;

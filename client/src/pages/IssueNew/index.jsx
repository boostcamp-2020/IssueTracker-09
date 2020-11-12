import React from 'react';
import Sidebar from '../../components/Sidebar';
import CreateInfoProvider from '../../stores/createInfoStore';

const IssueNew = () => {
  return (
    <CreateInfoProvider>
      <Sidebar type="create" />
    </CreateInfoProvider>
  );
};

export default IssueNew;

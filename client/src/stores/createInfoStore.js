import React, { createContext, useState } from 'react';

export const CreateInfoContext = createContext();

const CreateInfoProvider = ({ children }) => {
  const [createInfo, setCreateInfo] = useState({
    assignee: [],
    label: [],
    milestone: null,
  });

  const changeInfo = (key, value) => {
    const newState = { ...createInfo };
    newState[key] = value;
    setCreateInfo(newState);
  };

  const context = {
    createInfo,
    changeInfo,
  };

  return (
    <CreateInfoContext.Provider value={context}>
      {children}
    </CreateInfoContext.Provider>
  );
};

export default CreateInfoProvider;

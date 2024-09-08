import React from 'react';

const Wrapper = ({ children }) => {
  return (
    <div className="flex flex-row justify-center p-8 min-h-screen">
      <div className="flex flex-row w-[100%]">
        {children}
      </div>
    </div>
  );
};

export default Wrapper;

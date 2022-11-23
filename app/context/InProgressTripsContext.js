//create a react context for state of the app admin or driver

import React from "react";

const InProgressContext = React.createContext();

const InProgressProvider = ({ children }) => {
  const [myInProgressTripss, setMyInProgressTripss] = React.useState([]);

  return (
    <InProgressContext.Provider
      value={{ myInProgressTripss, setMyInProgressTripss }}
    >
      {children}
    </InProgressContext.Provider>
  );
};

export { InProgressContext, InProgressProvider };

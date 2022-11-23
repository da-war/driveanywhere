//create a react context for state of the app admin or driver

import React, { useEffect } from "react";
const StateContext = React.createContext();
const StateProvider = ({ children }) => {
  const [state, setState] = React.useState("driver");

  return (
    <StateContext.Provider value={{ state, setState }}>
      {children}
    </StateContext.Provider>
  );
};

export { StateContext, StateProvider };

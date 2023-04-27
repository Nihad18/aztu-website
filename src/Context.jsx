import React, { useState} from "react";
export const Context = React.createContext();

const ContextProvider = ({ children }) => {
  const [token, setToken] = useState(sessionStorage.getItem("token") ?? "");
  const data = {
    token,
    setToken,
  };
  return <Context.Provider value={data}>{children}</Context.Provider>;
};

export default ContextProvider;

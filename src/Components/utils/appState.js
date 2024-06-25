
import React from "react";

const AppStateContext = React.createContext();

export const useAppState = () => React.useContext(AppStateContext);

export default AppStateContext;

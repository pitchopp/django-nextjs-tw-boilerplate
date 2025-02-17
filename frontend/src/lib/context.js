import { createContext, useContext } from 'react';

export const GlobalStateContext = createContext();

const useGlobalState = () => {
  return useContext(GlobalStateContext);
}

export default useGlobalState;
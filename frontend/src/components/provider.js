"use client"
import { useState } from 'react';
import { GlobalStateContext } from '@/lib/context';

const GlobalStateProvider = ({ children }) => {
  const [state, setState] = useState({});

  return (
    <GlobalStateContext.Provider value={[state, setState]}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export default GlobalStateProvider;
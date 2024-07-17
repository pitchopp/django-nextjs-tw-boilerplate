"use client"
import { useState } from 'react';
import GlobalStateContext from '@/lib/context';

const GlobalStateProvider = ({ children, env }) => {
  const [state, setState] = useState({
    env,
  });

  localStorage.setItem("api_url", env.NEXT_PUBLIC_API_URL);

  return (
    <GlobalStateContext.Provider value={[state, setState]}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export default GlobalStateProvider;
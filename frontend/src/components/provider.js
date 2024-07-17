"use client"
import { useState } from 'react';
import GlobalStateContext from '@/lib/context';
import { setCookie } from '@/lib/cookies';

const GlobalStateProvider = ({ children, env }) => {
  const [state, setState] = useState({
    env,
  });
  setCookie("api_url", env.NEXT_PUBLIC_API_URL)

  return (
    <GlobalStateContext.Provider value={[state, setState]}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export default GlobalStateProvider;
import { createContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextProps {
  authToken: string | null;
  setAuthToken: (token: string | null) => void; // Simplified for direct use
}

const defaultState = {
  authToken: null,
  setAuthToken: () => {},
};

export const AuthContext = createContext<AuthContextProps>(defaultState);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authToken, setAuthTokenState] = useState<string | null>(null);

  const setAuthToken = (token: string | null) => {
    setAuthTokenState(token);
    if (token === null) {
      localStorage.removeItem('token');
    } else {
      localStorage.setItem('token', token);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setAuthTokenState(token);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ authToken, setAuthToken }}>
      {children}
    </AuthContext.Provider>
  );
};

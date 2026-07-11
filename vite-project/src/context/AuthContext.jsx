import { createContext, useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';


const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useLocalStorage('game_store_token', null);

  const login = () => {

    setToken("simulated_jwt_token_123");
  };

  const logout = () => {
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, isAuthenticated: !!token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
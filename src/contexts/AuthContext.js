import { createContext } from 'react';

const AuthContext = createContext({
  username: null,
  email: null,
  isAdmin: false,
});

export default AuthContext;
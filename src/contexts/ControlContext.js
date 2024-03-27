import { createContext } from 'react';

const ControlContext = createContext({
  action: '',
  message: '',
});

export default ControlContext;
import './App.css';

import { useState, useEffect } from 'react';
import AuthContext from './contexts/AuthContext';
import ControlContext from './contexts/ControlContext';
import TaskContext from './contexts/TaskContext';
import TaskList from './components/TaskList';

export default function App() {
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [action, setAction] = useState('');
  const [message, setMessage] = useState('');
  const [page, setPage] = useState(0);
  const [count, setCount] = useState(0);
  const [limit, setLimit] = useState(0);
  const [order, setOrder] = useState('');
  const [tasks, setTasks] = useState([]);

useEffect(() => {
  setPage(JSON.parse(window.localStorage.getItem('page')) || 1);
}, []);

  return (
    <AuthContext.Provider value={{username, setUsername, email, setEmail, isAdmin, setIsAdmin}}>
    <ControlContext.Provider value={{action, setAction, message, setMessage}}>
    <TaskContext.Provider value={{page, setPage, count, setCount, limit, setLimit, order, setOrder, tasks, setTasks}}>
      <TaskList/>
    </TaskContext.Provider>
    </ControlContext.Provider>
    </AuthContext.Provider>
  );
}

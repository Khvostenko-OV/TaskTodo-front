import { useEffect, useContext } from 'react';
import useFetch from '../hooks/useFetch';
import AuthContext from '../contexts/AuthContext';
import ControlContext from '../contexts/ControlContext';
import TaskContext from '../contexts/TaskContext';

export default function Logout() {
  const { status, error, request } = useFetch();
  const { setUsername, setEmail, setIsAdmin } = useContext(AuthContext);
  const { setAction, setMessage } = useContext(ControlContext);
  const { setPage } = useContext(TaskContext);
 
  useEffect(() => {
    if (status === 200) { 
      setUsername(null);
      setEmail(null);
      setIsAdmin(false);
      setAction('');
      setPage(1);
    } 
  }, [status]);

  useEffect(() => { 
    if (error) {
      setMessage(error);
      setAction('');
    }
  }, [error]);

  useEffect(() => { request('/logout', 'POST') }, []);

  return (
    <div className='logout'>
      <div className='title'>Loging out</div>
    </div>
  )
}

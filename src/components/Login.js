import { useState, useEffect, useContext } from 'react';
import useFetch from '../hooks/useFetch';
import sendForm from '../hooks/senfForm';
import AuthContext from '../contexts/AuthContext';
import ControlContext from '../contexts/ControlContext';
import TaskContext from '../contexts/TaskContext';

export default function Login() {
  const { data, status, error, request } = useFetch();
  const { setUsername, setEmail, setIsAdmin } = useContext(AuthContext);
  const { setAction } = useContext(ControlContext);
  const { setPage } = useContext(TaskContext);
  const [errMsg, setErr] = useState('');

  useEffect(() => {
    if (status === 200 && data) { 
      setUsername(data.username);
      setEmail(data.email);
      setIsAdmin(data.is_admin);
      setAction('');
      setPage(1);
    }
  }, [status, data]);

  useEffect(() => { setErr(error) }, [error]);

  return (
    <div className='login'>
      <div className='title'>Enter login, password</div>
      {errMsg && <div className='error_msg'>{errMsg}</div>}
      <form onSubmit={evt => sendForm(evt, '/login', request)}>
        <div><label>Login: <input className='input' name='login' required/></label></div>
        <div><label>Password: <input className='input' name='password' required/></label></div>
        <button className='action-btn' type='submit'>Login</button>
        <button className='cancel-btn' type='reset'>Reset</button>
        <button className='cancel-btn' onClick={() => setAction('')}>Cancel</button>
      </form>
    </div>
  )
}

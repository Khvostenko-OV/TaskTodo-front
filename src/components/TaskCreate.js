import { useState, useEffect, useContext } from 'react';
import useFetch from '../hooks/useFetch';
import sendForm from '../hooks/senfForm';
import AuthContext from '../contexts/AuthContext';
import ControlContext from '../contexts/ControlContext';
import TaskContext from '../contexts/TaskContext';

export default function TaskCreate() {
  const { status, error, request } = useFetch();
  const { username, email } = useContext(AuthContext);
  const { setAction, setMessage } = useContext(ControlContext);
  const { setTasks } = useContext(TaskContext);
  const [errMsg, setErr] = useState('');

  useEffect(() => {
    if (status === 200) { 
      setTasks([]);
      setMessage('New task created');
      setAction('');
    }
  }, [status]);

  useEffect(() => { setErr(error) }, [error]);

  return (
    <div className='task_create'>
      <div className='title'>Create new task</div>
      {errMsg && <div className='error_msg'>{errMsg}</div>}
      <form onSubmit={evt => sendForm(evt, '/tasks/add', request)}>
        <div>
          <label>Author: <input className='input' name='author' defaultValue={username} required/></label>
        </div>
        <div>
          <label>Email: <input className='input' type='email' name='email' defaultValue={email} required/></label>
        </div>
        <div><textarea className='text' name='text' rows='5' required></textarea></div>
        <button className='action-btn' type='submit'>Create</button>
        <button className='cancel-btn' type='reset'>Reset</button>
        <button className='cancel-btn' onClick={() => setAction('')}>Cancel</button>
      </form>
    </div>
  )
}

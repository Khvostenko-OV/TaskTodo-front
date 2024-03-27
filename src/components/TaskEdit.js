import { useState, useEffect, useContext } from 'react';
import useFetch from '../hooks/useFetch';
import sendForm from '../hooks/senfForm';
import ControlContext from '../contexts/ControlContext';
import TaskContext from '../contexts/TaskContext';

export default function TaskEdit({ task }) {
  const { status, error, request } = useFetch();
  const { setTasks } = useContext(TaskContext);
  const { setAction, setMessage } = useContext(ControlContext);
  const [errMsg, setErr] = useState('');

  useEffect(() => {
    if (status === 200) { 
      setMessage('Task changed');
      setTasks([]);
      setAction('');
    } 
  }, [status]);

  useEffect(() => { setErr(error) }, [error]);

  return (
    <div className='task_create'>
      <div className='title'>Cnange task</div>
      {errMsg && <div className='error_msg'>{errMsg}</div>}
      <form onSubmit={evt => sendForm(evt, `/tasks/edit/${task.id}`, request)}>
        <div className='input'>Author: {task.author}</div>
        <div className='input'>Email: {task.email}</div>
        <div>
          <label>Task done: <input className='input' type='checkbox' defaultChecked={task.done} name='done'/></label>
        </div>
        <div><textarea className='text' name='text' rows='5' defaultValue={task.text} required></textarea></div>
        <button className='action-btn' type='submit'>Save</button>
        <button className='cancel-btn' type='reset'>Reset</button>
        <button className='cancel-btn' onClick={() => setAction('')}>Cancel</button>
      </form>
    </div>
  )
}

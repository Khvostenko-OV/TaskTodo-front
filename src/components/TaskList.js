import { useEffect, useContext } from 'react';
import AuthContext from '../contexts/AuthContext';
import ControlContext from '../contexts/ControlContext';
import TaskContext from '../contexts/TaskContext';
import useFetch from '../hooks/useFetch';
import Paginator from './Paginator';
import TaskCreate from './TaskCreate';
import TaskEdit from './TaskEdit';
import Login from './Login';
import Logout from './Logout';

export default function TaskList() {
  const { data, status, error, request } = useFetch();
  const { action, setAction, message, setMessage } = useContext(ControlContext);
  const { username, isAdmin, setUsername, setEmail, setIsAdmin } = useContext(AuthContext);
  const { page, setCount, limit, setLimit, order, setOrder, tasks, setTasks } = useContext(TaskContext);

  const changeOrder = (change) => {
    if (change || order) {
      change === order ? setOrder('-' + change) : setOrder(change);
    }
  }

  const orderSymbol = (change) => {
    if (change === order) return '↓';
    if ('-' + change === order) return '↑';
    return '';
  }

  useEffect(() => {
    setMessage(''); 
    if (page) {
      window.localStorage.setItem('page', page);
      request(`/tasks?page=${page}&order=${order}`);
    }
  }, [page, order]);

  useEffect(() => { 
    if (page && !tasks.length) {
      request(`/tasks?page=${page}&order=${order}`);
    }
  }, [tasks]);

  useEffect(() => {
    if (status === 200 && data) {
      setTasks(data.tasks);
      setCount(data.count);
      setLimit(data.limit);
      setUsername(data.user.username);
      setEmail(data.user.email);
      setIsAdmin(data.user.is_admin);
    }
  }, [status, data]);

  useEffect(() => { setMessage(error) }, [error]);
  useEffect(() => { if (action) setMessage('') }, [action]);

  return (
    <div className='tasks_page'>
      <div className='title'>Tasks to do:</div>
      {message && <div className='message'>{message}</div>}
      {username? 
        <div className='auth'>
          Welcome, {username} <div className='action-btn' onClick={() => setAction('logout')}>Logout</div>
        </div> : 
        <div className='auth'>
          <div className='action-btn' onClick={() => setAction('login')}>Login</div>
        </div>
      }
      {tasks && <>
        <div className='task_list'>
          <div className='task_header'>
            <div className='number click' onClick={() => setOrder('')}>Task</div>
            <div className='author click' onClick={() => changeOrder('author')}>Author {orderSymbol('author')}</div>
            <div className='email click' onClick={() => changeOrder('email')}>Email {orderSymbol('email')}</div>
            <div className='status click' onClick={() => changeOrder('done')}>Status {orderSymbol('done')}</div>
          </div>
          {tasks.map((task, index) => 
            <div key={task.id} className='task_item'>
              <div className='task_header'>
                <div className='number'>{index + (page-1)*limit + 1}</div>
                <div className='author'>{task.author}</div>
                <div className='email'>{task.email}</div>
                <div className='status'>
                  {task.changed && 'Changed'} {task.done ? 'Done' : 'Process'}
                </div>
                {isAdmin && <button className='action-btn' onClick={() => setAction(`changeTask_${index}`)}>Change</button>}
              </div>
              <div className='task_text'>
                <textarea className='text' rows='3' defaultValue={task.text} disabled></textarea>
              </div>
            </div>
          )}
        </div>
        <Paginator/>
      </>}
      <div className='action-btn' onClick={() => setAction('addTask')}>New task</div>
      {(action === 'addTask') && <TaskCreate/>}
      {(action.startsWith('changeTask')) && <TaskEdit task={tasks[action.split('_')[1]]}/>}
      {(action === 'login') && <Login/>}
      {(action === 'logout') && <Logout/>}
    </div>
  )
}

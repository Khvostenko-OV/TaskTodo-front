import { createContext } from 'react';

const TaskContext = createContext({
  page: 0,
  count: 0,
  limit: 0,
  order: '',
  tasks: [],
});

export default TaskContext;
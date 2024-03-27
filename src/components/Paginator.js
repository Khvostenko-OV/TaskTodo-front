import { useContext } from 'react';
import TaskContext from '../contexts/TaskContext';

export default function Paginator() {
  const { page, setPage, count } = useContext(TaskContext);
  const start = Math.max(1, page-2);
  const finish = Math.min(count, page+2);
  const pageNums = Array.from({length: finish - start + 1}, (_, i) => start + i);

  return (
    <div className='paginator'>
      <div className='label'>Page:</div>
      {start > 1? '...' : null}
      {pageNums.map(num => 
        <div key={num} className={num === page ? 'page_btn_curr' : 'page_btn'} 
             onClick={num === page? null : () => setPage(num)}>
          {num}
        </div>
      )}
      {finish < count? '...' : null}
    </div>
  )
}

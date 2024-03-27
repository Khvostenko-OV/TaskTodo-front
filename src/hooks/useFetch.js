import { useState } from 'react';

export default function useFetch() {
  const [data, setData] = useState(undefined);
  const [status, setStatus] = useState(undefined);
  const [fetching, setFetching] = useState(false);
  const [redir, setRedirect] = useState('');
  const [error, setError] = useState('');

  const request = async (path='', method='GET', body={}, content='application/json', link='') => {
    setFetching(true);
    setError('');
    setStatus(undefined)
    const opt = {credentials: 'include'};
    if (method !== 'GET') {
      opt.method = method;
      if (content) { 
        opt.headers = {'Content-Type': content}; 
      }
      if (content === 'application/json') { 
        opt.body = JSON.stringify(body); 
      } else { 
        opt.body = body; 
      }
    }
    
    try {
      const response = await fetch(process.env.REACT_APP_BACKEND + path, opt);
      if (!response.ok) { 
        setStatus(response.status);
        throw new Error(response.statusText);
      }
      const json = await response.json();
      if (json.error) {
        setError(json.message);
        setStatus(json.error);
      } else {
        setStatus(response.status);
        setData(json); 
        setRedirect(link);
      }
    } catch (e) { 
      setError(String(e));
      if (!status) { 
        setStatus(500); 
      }
    } finally { setFetching(false); }
  };

  return {data, status, fetching, error, redir, request};
}

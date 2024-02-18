import { useContext, useEffect } from 'react';
import './App.css'
import routes from './lib/routes';
import { useRoutes } from 'react-router-dom';
import {AuthContext} from './store/auth';

function App() {
  const { setAuthToken } = useContext(AuthContext);

  useEffect(() => {
        const storedAuthToken = localStorage.getItem('token');
        if (storedAuthToken) {
            setAuthToken(storedAuthToken);
        }
  }, []);
  
  return useRoutes(routes);
}

export default App

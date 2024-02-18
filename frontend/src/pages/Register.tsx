import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {AuthContext} from '../store/auth';
import axios from 'axios';

const Register = () => {
  const useAuth = useContext(AuthContext);
  const [error, setError] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const postRequest = (data: { username: string, password: string}) => axios.post('/auth/register', data);
  
  const navigate = useNavigate();
  
  useEffect(() => { 
    if (useAuth.authToken) {
      navigate('/board');
    }
  },[useAuth]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('')
    try {
      const response = await postRequest({ username, password });
      navigate('/login');
      useAuth.setAuthToken(response.data.token);
    } catch (error: any) { 
      console.log({error})
      setError(error.response.data.message)
    }
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Create a new account
              </h1>
              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6" action="#">
                  <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your username</label>
                      <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                  </div>
                  <div>
                      <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                      <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
                  </div>
                  <button type="submit" className="w-full text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign up</button>
                  {error &&
                    <p className='bg-red-200 text-red-900 text-sm font-bold rounded-xl p-1'>{error}</p>
                  }
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                      You already have an account? <Link to='/login' className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign in</Link>
                  </p>
              </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

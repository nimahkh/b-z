import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className='flex justify-center items-center flex-col p-2'>
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</p>
      <Link to="/">Go to Homepage</Link>
    </div>
  );
};

export default NotFound;

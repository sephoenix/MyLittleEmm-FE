import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './../context/auth.context';

function Navbar() {
  // Subscribe to the AuthContext to gain access to
  // the values from AuthContext.Provider `value` prop
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  const navigate = useNavigate();

  return (
    <nav className="Navbar">
      {isLoggedIn && (
        <>
          <Link to="/diaries">
            {' '}
            <button>Diaries</button>{' '}
          </Link>
          <Link to="/diaries/add">
            {' '}
            <button>Add diary</button>{' '}
          </Link>
          <Link to="/user">Profile</Link>
          <div>
            <button onClick={() => navigate(-1)}>Go back</button>
          </div>
          {isLoggedIn && (
            <>
              <button onClick={logOutUser}>Logout</button>
              <span>{user && user.name}</span>
            </>
          )}
        </>
      )}
      {!isLoggedIn && (
        <>
          <Link to="/signup">
            {' '}
            <button>Sign Up</button>{' '}
          </Link>
          <Link to="/login">
            {' '}
            <button>Login</button>{' '}
          </Link>
          <Link to="/diaries">
            {' '}
            <button>Diaries</button>{' '}
          </Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;

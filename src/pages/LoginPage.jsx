import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';
import Navbar from '../components/Navbar';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const handleEmail = e => setEmail(e.target.value);
  const handlePassword = e => setPassword(e.target.value);

  const handleLoginSubmit = e => {
    e.preventDefault();
    const requestBody = { email, password };

    login(requestBody)
      .then(() => {
        navigate('/diaries');
      })
      .catch(error => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <>
      <Navbar />
      <div className="LoginPage container form">
        <h1>Login</h1>
        <form onSubmit={handleLoginSubmit}>
          <label>
            <h2>Email:</h2>
          </label>
          <input className="inp" type="email" name="email" value={email} onChange={handleEmail} />
          <label>
            <h2>Password:</h2>
          </label>
          <input className="inp" type="password" name="password" value={password} onChange={handlePassword} />
          <br />
          <button className="btn" type="submit">
            Login
          </button>
        </form>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <p>
          Don t have an account yet? <Link to={'/signup'}> Sign Up</Link>
        </p>
      </div>
    </>
  );
}

export default LoginPage;

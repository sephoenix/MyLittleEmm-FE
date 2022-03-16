import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';
import Navbar from '../components/Navbar';

function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dadName, setDadName] = useState('');
  const [momName, setMomName] = useState('');
  const [babyName, setBabyName] = useState('');
  const [babyBirthday, setBabyBirthday] = useState('');

  const [errorMessage, setErrorMessage] = useState(undefined);
  const { signup } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleEmail = e => setEmail(e.target.value);
  const handlePassword = e => setPassword(e.target.value);
  const handleDadName = e => setDadName(e.target.value);
  const handleMomName = e => setMomName(e.target.value);
  const handleBabyName = e => setBabyName(e.target.value);
  const handlebabyBirthday = e => setBabyBirthday(e.target.value);

  const handleSignupSubmit = e => {
    e.preventDefault();
    // Create an object representing the request body
    const requestBody = { email, password, dadName, momName, babyName, babyBirthday };

    // Make an axios request to the API
    // If POST request is successful redirect to login page
    // If the request resolves with an error, set the error message in the state``
    signup(requestBody)
      .then(() => {
        navigate('/login');
      })
      .catch(error => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <>
      <Navbar />
      <div className="SignupPage container form">
        <h1>Sign Up</h1>
        <form onSubmit={handleSignupSubmit}>
          <label>
            <h2>Email:</h2>
          </label>
          <input className="inp" type="email" name="email" value={email} onChange={handleEmail} />

          <label>
            <h2>Password:</h2>
          </label>
          <input className="inp" type="password" name="password" value={password} onChange={handlePassword} />

          <label>
            <h2>Dad:</h2>
          </label>
          <input className="inp" type="text" name="dadName" value={dadName} onChange={handleDadName} />

          <label>
            <h2>Mom:</h2>
          </label>
          <input className="inp" type="text" name="momName" value={momName} onChange={handleMomName} />

          <label>
            <h2>Baby:</h2>
          </label>
          <input className="inp" type="text" name="babyName" value={babyName} onChange={handleBabyName} />

          <label>
            <h2>Birthday</h2>
          </label>
          <input className="inp" type="date" name="babyBirthday" value={babyBirthday} onChange={handlebabyBirthday} />
          <br />
          <button className="btn" type="submit">
            Submit
          </button>
        </form>

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <p>
          Already have account? <Link to={'/login'}>Login</Link>
        </p>
      </div>
    </>
  );
}

export default SignupPage;

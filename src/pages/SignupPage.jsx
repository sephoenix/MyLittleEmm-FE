import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';

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
    <div className="SignupPage">
      <h1>Sign Up</h1>

      <form onSubmit={handleSignupSubmit}>
        <label>Email:</label>
        <input type="email" name="email" value={email} onChange={handleEmail} />

        <label>Password:</label>
        <input type="password" name="password" value={password} onChange={handlePassword} />

        <label>dadName:</label>
        <input type="text" name="dadName" value={dadName} onChange={handleDadName} />

        <label>momName:</label>
        <input type="text" name="momName" value={momName} onChange={handleMomName} />

        <label>babyName:</label>
        <input type="text" name="babyName" value={babyName} onChange={handleBabyName} />

        <label>babyBirthday:</label>
        <input type="date" name="babyBirthday" value={babyBirthday} onChange={handlebabyBirthday} />

        <button type="submit">Sign Up</button>
      </form>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <p>Already have account?</p>
      <Link to={'/login'}> Login</Link>
    </div>
  );
}

export default SignupPage;

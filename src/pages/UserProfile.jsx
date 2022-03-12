import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';
import apiService from '../services/api.service';

function UserProfile() {
  const [profile, setProfile] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    apiService
      .getUser()
      .then(response => {
        let newProfile = [];
        for (let i = 0; i < response.data.length; i++) {
          if (response.data[i]._id.toString() === user._id) {
            newProfile.push(response.data[i]);
          }
        }
        setProfile(newProfile[0]);
      })
      .catch(err => console.log(err));
  }, []);
  console.log('profile', profile);

  return (
    <div className="container">
      <h1>Email: {profile.email}</h1>
      <h1>Dad: {profile.dadName}</h1>
      <h1>Mom: {profile.momName}</h1>
      <h1>Baby: {profile.babyName}</h1>
      <h1>Baby Birthday: {profile.babyBirthday}</h1>
      <Link to="/user/edit/">
        <button>Edit User</button>
      </Link>
    </div>
  );
}

export default UserProfile;

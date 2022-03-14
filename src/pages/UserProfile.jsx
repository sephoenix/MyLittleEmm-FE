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
        setProfile({
          _id: profile._id,
          email: profile.email,
          password: profile.password,
          dadName: profile.dadName,
          momName: profile.momName,
          babyName: profile.babyName,
          babyBirthday: profile.babyBirthday.slice(0, 10),
        });
      })
      .catch(err => console.log(err));
  }, []);
  console.log('profile', profile);

  return (
    <div className="container">
      <h1>Profile</h1>
      <h2>Email: {profile.email}</h2>
      <h2>Dad: {profile.dadName}</h2>
      <h2>Mom: {profile.momName}</h2>
      <h2>Baby: {profile.babyName}</h2>
      <h2>Baby Birthday: {profile.babyBirthday}</h2>
      <Link to="/user/edit/">
        <button>Edit User</button>
      </Link>
    </div>
  );
}

export default UserProfile;

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
    <div>
      <h1>{profile.email}</h1>
      <h1>{profile.dadName}</h1>
      <h1>{profile.momName}</h1>
      <h1>{profile.babyName}</h1>
      <h1>{profile.babyBirthday}</h1>
      <Link to="/user/edit/">
        <button>Edit User</button>
      </Link>
    </div>
  );
}

export default UserProfile;

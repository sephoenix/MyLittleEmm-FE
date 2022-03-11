import { useContext, useEffect, useState } from 'react';
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

  return <div>{profile.email}</div>;
}

export default UserProfile;

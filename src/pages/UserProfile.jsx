import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';
import apiService from '../services/api.service';
import Navbar from '../components/Navbar';

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
          _id: newProfile[0]._id,
          email: newProfile[0].email,
          password: newProfile[0].password,
          dadName: newProfile[0].dadName,
          momName: newProfile[0].momName,
          babyName: newProfile[0].babyName,
          babyBirthday: newProfile[0].babyBirthday.slice(0, 10),
        });
      })
      .catch(err => console.log(err));
  }, [user._id]);
  console.log('profile', profile);

  return (
    <>
      <Navbar />
      <div className="container form">
        <h1>Profile</h1>
        <h2>Email </h2>
        <h3>{profile.email}</h3>
        <h2>Dad </h2>
        <h3>{profile.dadName}</h3>
        <h2>Mom </h2>
        <h3>{profile.momName}</h3>
        <h2>Baby </h2>
        <h3>{profile.babyName}</h3>
        <h2>Baby Birthday </h2>
        <h3>{profile.babyBirthday}</h3>
        <div className="centerBtn">
          <Link to="/user/edit/">
            <button className="btn">Edit User</button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default UserProfile;

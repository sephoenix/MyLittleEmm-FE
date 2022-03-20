import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';
import apiService from '../services/api.service';
import Navbar from '../components/Navbar';

function EditUser() {
  const [editedUser, setEditedUser] = useState({
    dadName: '',
    momName: '',
    babyName: '',
    babyBirthday: '',
  });

  const { user, logOutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    apiService
      .getUser(user._id)
      .then(response => {
        let newProfile = [];
        for (let i = 0; i < response.data.length; i++) {
          if (response.data[i]._id.toString() === user._id) {
            newProfile.push(response.data[i]);
          }
        }
        setEditedUser(newProfile[0]);
      })
      .catch(err => console.log(err));
  }, [user._id]);

  const handleChange = e => {
    setEditedUser(prev => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    apiService
      .editUser(editedUser)
      .then(editedUser => {
        console.log('handle', editedUser.data);
        navigate('/user');
      })
      .catch(err => console.log(err));
  };

  const deleteUser = () => {
    apiService
      .deleteOneUser(user._id)
      .then(() => {
        logOutUser();
      })
      .catch(err => console.log(err));
  };

  console.log(editedUser);

  return (
    <>
      <Navbar />
      <div className="container form">
        <h1>Edit User</h1>
        <form onSubmit={handleSubmit}>
          <label>
            <h2>Dad</h2>
          </label>
          <input className="inp" type="text" name="dadName" value={editedUser.dadName} onChange={handleChange} />
          <label>
            <h2>Mom</h2>
          </label>
          <input className="inp" type="text" name="momName" value={editedUser.momName} onChange={handleChange} />
          <label>
            <h2>Baby</h2>
          </label>
          <input className="inp" type="text" name="babyName" value={editedUser.babyName} onChange={handleChange} />
          <label>
            <h2>Baby Birthday</h2>
          </label>
          <input
            className="inp"
            type="date"
            name="babyBirthday"
            value={editedUser.babyBirthday}
            onChange={handleChange}
          />
          <div className="centerBtn">
            <button className="btn" type="submit">
              Update
            </button>
          </div>
        </form>

        <div className="centerBtn">
          <button className="btn homeDiv" onClick={deleteUser}>
            Delete User
          </button>
        </div>
      </div>
    </>
  );
}

export default EditUser;

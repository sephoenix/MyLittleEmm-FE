import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';
import apiService from '../services/api.service';

function EditUser() {
  const [editedUser, setEditedUser] = useState({
    email: '',
    dadName: '',
    momName: '',
    babyName: '',
    babyBirthday: '',
  });

  const { user } = useContext(AuthContext);
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
  }, []);

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

  console.log(editedUser);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input type="email" name="email" value={editedUser.email} onChange={handleChange} />

        <label>dadName:</label>
        <input type="text" name="dadName" value={editedUser.dadName} onChange={handleChange} />

        <label>momName:</label>
        <input type="text" name="momName" value={editedUser.momName} onChange={handleChange} />

        <label>babyName:</label>
        <input type="text" name="babyName" value={editedUser.babyName} onChange={handleChange} />

        <label>babyBirthday:</label>
        <input type="date" name="babyBirthday" value={editedUser.babyBirthday} onChange={handleChange} />
        <button type="submit">Edit User</button>
      </form>
    </div>
  );
}

export default EditUser;

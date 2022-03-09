import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../services/api.service';

function AddDiary() {
  const [diary, setDiary] = useState({
    name: '',
  });
  const navigate = useNavigate();

  const handleChange = e => {
    setDiary(prev => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    apiService
      .addADiary(diary)
      .then(response => {
        console.log(response);
        navigate(`/diaries/${response.data._id}`);
      })
      .catch(e => console.log(e));
  };

  return (
    <div>
      <h2>Add Diary</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input type="text" name="name" value={diary.name} onChange={handleChange} />
        <button type="submit">Create new Diary</button>
      </form>
    </div>
  );
}

export default AddDiary;

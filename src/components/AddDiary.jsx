import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import apiService from '../services/api.service';

function AddDiary() {
  const [name, setName] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    const requestBody = { name };
    apiService
      .postOneDiary(requestBody)
      .then(response => {
        console.log(response);
        <Navigate to="/diaries" />;
      })
      .catch(e => console.log(e));
  };

  return (
    <div>
      <h2>Add Diary</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input type="text" name="name" value={name} onChange={e => setName(e.target.value)} />
        <button type="submit">Create new Diary</button>
      </form>
    </div>
  );
}

export default AddDiary;

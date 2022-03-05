import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import apiService from '../services/api.service';

function AddPage() {
  const [date, setDate] = useState('');
  const [type, setType] = useState('');
  const [whoWrites, setWhoWrites] = useState('');
  const [babyWeight, setBabyWeight] = useState('');
  const [babyHeight, setBabyHeight] = useState('');
  const [photo, setPhoto] = useState('');
  const [isPublic, setIsPublic] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    const requestBody = { date, type, whoWrites, babyWeight, babyHeight, photo, isPublic, content };
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
      <form onSubmit={handleSubmit}>
        <label>Date:</label>
        <input type="date" name="date" value={date} onChange={e => setDate(e.target.value)} />
        <label>Type:</label>
        <input type="text" name="type" value={type} onChange={e => setType(e.target.value)} />
        <select type="text" name="type" value={type} onChange={e => setType(e.target.value)}>
          {' '}
          <option value="Info">Info</option>
          <option value="Special Date">Special Date</option>
          <option value="Anecdote">Anecdote</option>
        </select>
        <label>Who Writes:</label>
        <select type="text" name="whoWrites" value={whoWrites} onChange={e => setWhoWrites(e.target.value)}>
          {' '}
          <option value="Dad">Dad</option>
          <option value="Mom">Mom</option>
        </select>
        <label>Baby Weight:</label>
        <input type="number" name="babyWeight" value={babyWeight} onChange={e => setBabyWeight(e.target.value)} />
        <label>Baby Height:</label>
        <input type="number" name="babyHeight" value={babyHeight} onChange={e => setBabyHeight(e.target.value)} />
        <label>Photo:</label>
        <input type="image" name="photo" value={photo} onChange={e => setPhoto(e.target.value)} />
        <label>Public:</label>
        <select type="dropdown" name="isPublic" value={isPublic} onChange={e => setIsPublic(e.target.value)}>
          {' '}
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
        <label>Content:</label>
        <input type="textarea" name="content" value={content} onChange={e => setContent(e.target.value)} />
        <button type="submit">Create new Page</button>
      </form>
    </div>
  );
}

export default AddPage;

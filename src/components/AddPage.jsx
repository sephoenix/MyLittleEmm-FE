import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import apiService from '../services/api.service';

function AddPage() {
  const navigate = useNavigate();
  const { diaryId } = useParams();
  const [newPage, setPage] = useState({
    date: '',
    type: '',
    whoWrites: '',
    babyWeight: 0,
    babyHeight: 0,
    photo: '',
    isPublic: true,
    content: '',
  });

  const handleChange = e => {
    setPage(prev => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
    console.log(newPage);
  };

  const handleSubmit = e => {
    e.preventDefault();
    apiService
      .postOnePage(newPage, diaryId)
      .then(() => {
        navigate(`/diaries/${diaryId}`);
      })
      .catch(e => console.log(e));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Date:</label>
        <input type="date" name="date" value={newPage.date} onChange={handleChange} />
        <label>Type:</label>
        <input type="text" name="type" value={newPage.type} onChange={handleChange} />
        <select type="text" name="type" value={newPage.type} onChange={handleChange}>
          {' '}
          <option value="Info">Info</option>
          <option value="Special Date">Special Date</option>
          <option value="Anecdote">Anecdote</option>
        </select>
        <label>Who Writes:</label>
        <select type="text" name="whoWrites" value={newPage.whoWrites} onChange={handleChange}>
          {' '}
          <option value="Dad">Dad</option>
          <option value="Mom">Mom</option>
        </select>
        <label>Baby Weight:</label>
        <input type="number" name="babyWeight" value={newPage.babyWeight} onChange={handleChange} />
        <label>Baby Height:</label>
        <input type="number" name="babyHeight" value={newPage.babyHeight} onChange={handleChange} />
        <label>Photo:</label>
        <input type="image" name="photo" value={newPage.photo} onChange={handleChange} />
        <label>Public:</label>
        <select type="dropdown" name="isPublic" value={newPage.isPublic} onChange={handleChange}>
          {' '}
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
        <label>Content:</label>
        <input type="textarea" name="content" value={newPage.content} onChange={handleChange} />
        <button type="submit">Create new Page</button>
      </form>
    </div>
  );
}

export default AddPage;
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
    content: '',
    diary: diaryId,
  });
  const [imageUrl, setImageUrl] = useState('');

  const handleChange = e => {
    setPage(prev => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
    console.log(newPage);
  };

  const handleFileUpload = e => {
    const uploadData = new FormData();
    uploadData.append('photo', e.target.files[0]);
    apiService
      .uploadImage(uploadData)
      .then(response => {
        console.log(response.data);
        setImageUrl(response.data.fileUrl);
      })
      .catch(err => console.log(err));
  };
  console.log('image', imageUrl);

  const handleSubmit = e => {
    e.preventDefault();
    apiService
      .postOnePage({
        date: newPage.date.slice(0, 10),
        type: newPage.type,
        photo: imageUrl,
        whoWrites: newPage.whoWrites,
        babyWeight: newPage.babyWeight,
        babyHeight: newPage.babyHeight,
        content: newPage.content,
        diary: newPage.diary,
      })
      .then(() => {
        navigate(`/diaries/${diaryId}`);
      })
      .catch(e => console.log(e));
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <label>
          <h2>Date:</h2>
        </label>
        <input type="date" name="date" value={newPage.date} onChange={handleChange} />
        <label>
          <h2>Type:</h2>
        </label>
        <select type="text" name="type" value={newPage.type} onChange={handleChange}>
          {' '}
          <option value="Info">Info</option>
          <option value="Special Date">Special Date</option>
          <option value="Anecdote">Anecdote</option>
        </select>
        <label>
          <h2>Who Writes:</h2>
        </label>
        <select type="text" name="whoWrites" value={newPage.whoWrites} onChange={handleChange}>
          {' '}
          <option value="Dad">Dad</option>
          <option value="Mom">Mom</option>
        </select>
        <label>
          <h2>Baby Weight:</h2>
        </label>
        <input type="number" name="babyWeight" value={newPage.babyWeight} onChange={handleChange} />
        <label>
          <h2>Baby Height:</h2>
        </label>
        <input type="number" name="babyHeight" value={newPage.babyHeight} onChange={handleChange} />
        <label>
          <h2>Photo:</h2>
        </label>
        <input type="file" name="photo" value={newPage.photo} onChange={handleFileUpload} />
        <label>
          <h2>Content:</h2>
        </label>
        <input type="textarea" name="content" value={newPage.content} onChange={handleChange} />
        <br />
        <button type="submit">Create new Page</button>
      </form>
    </div>
  );
}

export default AddPage;

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
      .postOnePage(newPage)
      .then(() => {
        navigate(`/diaries`);
      })
      .catch(e => console.log(e));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Date:</label>
        <input type="date" name="date" value={newPage.date} onChange={handleChange} />
        <label>Type:</label>
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
        <input type="file" name="photo" value={newPage.photo} onChange={handleFileUpload} />
        <label>Public:</label>
        <select type="dropdown" name="isPublic" value={newPage.isPublic} onChange={handleChange}>
          {' '}
          <option value={true}>Yes</option>
          <option value={false}>No</option>
        </select>
        <label>Content:</label>
        <input type="textarea" name="content" value={newPage.content} onChange={handleChange} />
        <button type="submit">Create new Page</button>
      </form>
    </div>
  );
}

export default AddPage;

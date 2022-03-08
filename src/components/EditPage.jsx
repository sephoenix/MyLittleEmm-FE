import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import apiService from '../services/api.service';

function EditPage() {
  const [editedPage, setEditedPage] = useState({
    date: '',
    type: '',
    whoWrites: '',
    babyWeight: 0,
    babyHeight: 0,
    photo: '',
    isPublic: true,
    content: '',
  });

  const { diaryId } = useParams();
  const { pageId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    apiService
      .getPageById(diaryId, pageId)
      .then(response => {
        setEditedPage(response.data);
      })
      .catch(err => console.log(err));
  }, [diaryId]);

  const handleChange = e => {
    setEditedPage(prev => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    apiService
      .putOnePage(pageId, editedPage)
      .then(response => {
        console.log(response);
        navigate(`/diaries/${diaryId}/${pageId}`);
      })
      .catch(err => console.log(err));
  };

  const deletePage = () => {
    apiService
      .deletePage(pageId)
      .then(() => {
        navigate(`/diaries/${diaryId}`);
      })
      .catch(err => console.log(err));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Date:</label>
        <input type="date" name="date" value={editedPage.date} onChange={handleChange} />
        <label>Type:</label>
        <input type="text" name="type" value={editedPage.type} onChange={handleChange} />
        <select type="text" name="type" value={editedPage.type} onChange={handleChange}>
          {' '}
          <option value="Info">Info</option>
          <option value="Special Date">Special Date</option>
          <option value="Anecdote">Anecdote</option>
        </select>
        <label>Who Writes:</label>
        <select type="text" name="whoWrites" value={editedPage.whoWrites} onChange={handleChange}>
          {' '}
          <option value="Dad">Dad</option>
          <option value="Mom">Mom</option>
        </select>
        <label>Baby Weight:</label>
        <input type="number" name="babyWeight" value={editedPage.babyWeight} onChange={handleChange} />
        <label>Baby Height:</label>
        <input type="number" name="babyHeight" value={editedPage.babyHeight} onChange={handleChange} />
        <label>Photo:</label>
        <input type="image" name="photo" value={editedPage.photo} onChange={handleChange} />
        <label>Public:</label>
        <select type="dropdown" name="isPublic" value={editedPage.isPublic} onChange={handleChange}>
          {' '}
          <option value={true}>Yes</option>
          <option value={false}>No</option>
        </select>
        <label>Content:</label>
        <input type="textarea" name="content" value={editedPage.content} onChange={handleChange} />
        <button type="submit">Update Page</button>
        <button onClick={deletePage}>Delete Page</button>
      </form>
    </div>
  );
}

export default EditPage;

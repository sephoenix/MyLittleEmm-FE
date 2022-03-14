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
    content: '',
  });

  const { pageId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    apiService
      .getPageById(pageId)
      .then(response => {
        setEditedPage(response.data);
      })
      .catch(err => console.log(err));
  }, []);

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
        navigate(`/pages/${pageId}`);
      })
      .catch(err => console.log(err));
  };

  const deletePage = () => {
    apiService
      .deleteOnePage(pageId)
      .then(() => {
        navigate('/diaries');
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <label>
          <h1>Date:</h1>
        </label>
        <input type="date" name="date" value={editedPage.date} onChange={handleChange} />
        <label>
          <h1>Type:</h1>
        </label>
        <input type="text" name="type" value={editedPage.type} onChange={handleChange} />
        <select type="text" name="type" value={editedPage.type} onChange={handleChange}>
          {' '}
          <option value="Info">Info</option>
          <option value="Special Date">Special Date</option>
          <option value="Anecdote">Anecdote</option>
        </select>
        <label>
          <h1>Who Writes:</h1>
        </label>
        <select type="text" name="whoWrites" value={editedPage.whoWrites} onChange={handleChange}>
          {' '}
          <option value="Dad">Dad</option>
          <option value="Mom">Mom</option>
        </select>
        <label>
          <h1>Baby Weight:</h1>
        </label>
        <input type="number" name="babyWeight" value={editedPage.babyWeight} onChange={handleChange} />
        <label>
          <h1>Baby Height:</h1>
        </label>
        <input type="number" name="babyHeight" value={editedPage.babyHeight} onChange={handleChange} />
        <label>
          <h1>Photo:</h1>
        </label>
        <input type="image" name="photo" value={editedPage.photo} onChange={handleChange} />
        <label>
          <h1>Public:</h1>
        </label>
        <label>
          <h1>Content:</h1>
        </label>
        <input type="textarea" name="content" value={editedPage.content} onChange={handleChange} />
        <br />
        <button type="submit">Update Page</button>
      </form>
      <button className="btn" onClick={deletePage}>
        Delete Page
      </button>
    </div>
  );
}

export default EditPage;

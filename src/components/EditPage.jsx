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
  const [imageUrl, setImageUrl] = useState('');

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

  const handleFileUpload = e => {
    const uploadData = new FormData();
    uploadData.append('photo', e.target.files[0]);
    apiService
      .uploadImage(uploadData)
      .then(response => {
        setImageUrl(response.data.fileUrl);
      })
      .catch(err => console.log(err));
  };
  console.log('image', imageUrl);

  const handleSubmit = e => {
    e.preventDefault();
    apiService
      .putOnePage(pageId, {
        date: editedPage.date.slice(0, 10),
        type: editedPage.type,
        photo: imageUrl,
        whoWrites: editedPage.whoWrites,
        babyWeight: editedPage.babyWeight,
        babyHeight: editedPage.babyHeight,
        content: editedPage.content,
        diary: editedPage.diary,
      })
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

  console.log(editedPage);
  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <label>
          <h2>Date:</h2>
        </label>
        <input type="date" name="date" value={editedPage.date} onChange={handleChange} />
        <label>
          <h2>Type:</h2>
        </label>
        <input type="text" name="type" value={editedPage.type} onChange={handleChange} />
        <select type="text" name="type" value={editedPage.type} onChange={handleChange}>
          {' '}
          <option value="Info">Info</option>
          <option value="Special Date">Special Date</option>
          <option value="Anecdote">Anecdote</option>
        </select>
        <label>
          <h2>Who Writes:</h2>
        </label>
        <select type="text" name="whoWrites" value={editedPage.whoWrites} onChange={handleChange}>
          {' '}
          <option value="Dad">Dad</option>
          <option value="Mom">Mom</option>
        </select>
        <label>
          <h2>Baby Weight:</h2>
        </label>
        <input type="text" name="babyWeight" value={editedPage.babyWeight} onChange={handleChange} />
        <label>
          <h2>Baby Height:</h2>
        </label>
        <input type="text" name="babyHeight" value={editedPage.babyHeight} onChange={handleChange} />
        <label>
          <h2>Photo:</h2>
        </label>
        {editedPage.photo && (
          <>
            <input type="file" name="photo" value={(editedPage.photo = '')} onChange={handleFileUpload} />
          </>
        )}
        <input type="file" name="photo" value={editedPage.photo} onChange={handleFileUpload} />
        <label>
          <h2>Content:</h2>
        </label>
        <input type="textarea" name="content" value={editedPage.content} onChange={handleChange} />
        <br />
        <button className="btn" type="submit">
          Update Page
        </button>
      </form>
      <button className="btn" onClick={deletePage}>
        Delete Page
      </button>
    </div>
  );
}

export default EditPage;

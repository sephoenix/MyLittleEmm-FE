import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import apiService from '../services/api.service';
import Navbar from '../components/Navbar';

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

  console.log(newPage.date);

  return (
    <>
      <Navbar />
      <div className="container page">
        <h1>Add Page</h1>
        <form onSubmit={handleSubmit}>
          <label>
            <h2>Date</h2>
          </label>
          <input className="inp" type="date" name="date" value={newPage.date} onChange={handleChange} />

          <label>
            <h2>Type</h2>
          </label>
          <select className="inp" type="text" name="type" value={newPage.type} onChange={handleChange}>
            <option defaultValue>-- Select an option -- </option>
            <option value="Info">Info</option>
            <option value="Special Date">Special Date</option>
            <option value="Anecdote">Anecdote</option>
          </select>

          <label>
            <h2>Who Writes</h2>
          </label>
          <select className="inp" type="text" name="whoWrites" value={newPage.whoWrites} onChange={handleChange}>
            <option defaultValue>-- Select an option -- </option>
            <option value="Dad">Dad</option>
            <option value="Mom">Mom</option>
          </select>

          <label>
            <h2>Baby Weight</h2>
          </label>
          <input className="inp" type="number" name="babyWeight" value={newPage.babyWeight} onChange={handleChange} />

          <label>
            <h2>Baby Height</h2>
          </label>
          <input className="inp" type="number" name="babyHeight" value={newPage.babyHeight} onChange={handleChange} />

          <label>
            <h2>Photo</h2>
          </label>
          <input className="inp" type="file" name="photo" value={newPage.photo} onChange={handleFileUpload} />

          <label>
            <h2>Content</h2>
          </label>
          <div className="centerBtn">
            <textarea
              className="textArea"
              name="content"
              cols={4}
              rows={4}
              value={newPage.content}
              onChange={handleChange}
            />
          </div>
          <div className="centerBtn">
            <button className="btn" type="submit">
              Create new Page
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default AddPage;

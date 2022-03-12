import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import apiService from '../services/api.service';

function EditDiary() {
  const [diary, setDiary] = useState({
    name: '',
  });
  const { diaryId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    apiService
      .getDiaryById(diaryId)
      .then(response => {
        setDiary(response.data);
      })
      .catch(err => console.log(err));
  }, []);

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
      .putOneDiary(diaryId, { name: diary.name })
      .then(response => {
        console.log(response);
        navigate(`/diaries/${diaryId}`);
      })
      .catch(err => console.log(err));
  };

  const deleteDiary = () => {
    apiService
      .deleteDiary(diaryId)
      .then(() => {
        navigate(`/diaries`);
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <label>
          <h2>Name:</h2>
        </label>
        <input type="text" name="name" value={diary.name} onChange={handleChange} />
        <br />
        <button type="submit">Edit Diary</button>
        <br />
        <button onClick={deleteDiary}>Delete Diary</button>
      </form>
    </div>
  );
}

export default EditDiary;

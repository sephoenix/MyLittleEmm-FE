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
  }, [diaryId]);

  const handleChange = e => {
    setDiary(prev => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  console.log(diary);

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
        navigate('/diaries');
      })
      .catch(err => console.log(err));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input type="text" name="name" value={diary.name} onChange={handleChange} />
        <button type="submit">Edit Diary</button>
        <button onClick={deleteDiary}>Delete Diary</button>
      </form>
    </div>
  );
}

export default EditDiary;

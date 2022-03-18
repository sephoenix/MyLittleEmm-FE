import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import apiService from '../services/api.service';
import Navbar from '../components/Navbar';

function EditDiary() {
  const [diary, setDiary] = useState({
    name: '',
  });
  const { diaryId } = useParams();
  const navigate = useNavigate();
  /*  const [pages, setPages] = useState({}); */

  useEffect(() => {
    apiService
      .getDiaryById(diaryId)
      .then(response => {
        setDiary(response.data);
      })
      .catch(err => console.log(err));
  }, []);

  /*   useEffect(() => {
    apiService
      .getDiaryPages(diaryId)
      .then(response => {
        setPages(response.data);
      })
      .catch(err => console.log(err));
  }, []);

  console.log('prueba', pages); */

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
      /*       .deleteAllDiaryPages(diaryId)
      .then(() => {
        deleteDiary(diaryId); //TODO
      }) */
      .then(() => {
        navigate(`/diaries`);
      })
      .catch(err => console.log(err));
  };

  return (
    <>
      <Navbar />
      <div className="container form">
        <form onSubmit={handleSubmit}>
          <h1>Edit Diary</h1>
          <div className="ml">
            <label>
              <h2>Rename</h2>
            </label>
            <input className="inp" type="text" name="name" value={diary.name} onChange={handleChange} />
          </div>
          <div className="centerBtn">
            <button className="btn" type="submit">
              Update Diary
            </button>
          </div>
        </form>
        <div className="centerBtn">
          <button className="btn" onClick={deleteDiary}>
            Delete Diary
          </button>
        </div>
      </div>
    </>
  );
}

export default EditDiary;

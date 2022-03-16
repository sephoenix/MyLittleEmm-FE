import { useEffect, useState } from 'react';
import Diary from '../components/Diary';
import apiService from '../services/api.service';
import Navbar from '../components/Navbar';

function DiariesList() {
  const [diaries, setDiaries] = useState([]);

  useEffect(() => {
    apiService
      .getAllDiaries()
      .then(response => {
        setDiaries(response.data);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <>
      <Navbar />
      <div className="container diaryList">
        <h1>Diaries</h1>
        <div className="diaries">
          {diaries.map(diary => (
            <Diary key={diary._id} id={diary._id} name={diary.name} />
          ))}
        </div>
      </div>
    </>
  );
}
export default DiariesList;

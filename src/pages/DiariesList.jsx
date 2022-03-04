import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Diary from '../components/Diary';
import apiService from '../services/api.service';

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
    <div>
      <Link to="/diaries/add">
        <button>Add Diary</button>
      </Link>
      {diaries.map(diary => (
        <Diary key={diary._id} id={diary._id} name={diary.name} />
      ))}
    </div>
  );
}
export default DiariesList;

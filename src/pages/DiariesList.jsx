import { useEffect, useState } from 'react';
import Diary from '../components/Diary';
import apiService from '../services/api.service';

function DiariesList() {
  const [diaries, setDiaries] = useState([]);

  useEffect(() => {
    apiService
      .getAllDiaries()
      .then(response => {
        console.log(response.data);
        setDiaries(response.data);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div>
      {diaries.map(diary => (
        <Diary key={diary._id} name={diary.name} />
      ))}
    </div>
  );
}
export default DiariesList;

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import apiService from '../services/api.service';

function DiariesDetails() {
  const [diary, setDiary] = useState([]);
  const { diaryId } = useParams();

  useEffect(() => {
    apiService
      .getDiaryById(diaryId)
      .then(response => {
        setDiary(response.data);
      })
      .catch(e => console.log(e));
  }, []);

  return <div>{diary.name}</div>;
}

export default DiariesDetails;

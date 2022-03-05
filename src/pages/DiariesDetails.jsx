import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import apiService from '../services/api.service';
// import Page from '../components/Page';

function DiariesDetails() {
  const [diary, setDiary] = useState([]);
  const { diaryId } = useParams();
  // const [pages /* setPages */] = useState([]);

  useEffect(() => {
    apiService
      .getAllPages(diaryId)
      .then(response => {
        console.log('Diary with pages: ', response.data);
        setDiary(response.data);
      })
      // .then(() => {
      //   apiService.getAllPages(diaryId);
      // })
      // .then(response => {
      //   console.log(response);
      // })
      .catch(e => console.log(e));
  }, [diaryId]);
  console.log(diary);
  /* useEffect(() => {
    apiService
      .getAllPages(diaryId)
      .then(response => {
        setPages(response.data);
      })
      .catch(err => console.log(err));
  }, []); */

  return (
    <div>
      {/*<h1>{diary[0].diary.name ? diary[0].diary.name : 'Loading'}</h1>*/}
      <h2>Pages:</h2>
      <ul>
        {diary.map(elem => {
          <li key={elem._id}>{elem.type}</li>;
        })}
      </ul>
      <Link to={`/diaries/${diaryId}/add`}>
        <button>Add Page</button>
      </Link>
    </div>
  );
}

export default DiariesDetails;

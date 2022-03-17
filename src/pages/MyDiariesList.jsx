import { useContext, useEffect, useState } from 'react';
import Diary from '../components/Diary';
import apiService from '../services/api.service';
import Navbar from '../components/Navbar';
import { AuthContext } from '../context/auth.context';

function MyDiariesList() {
  const [diaries, setDiaries] = useState([]);
  const { user } = useContext(AuthContext);
  console.log('id', user._id);

  useEffect(() => {
    apiService
      .getMyDiaries(user._id)
      .then(response => {
        console.log(response);
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
export default MyDiariesList;

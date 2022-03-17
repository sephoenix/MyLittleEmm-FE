import { useContext, useEffect, useState } from 'react';
import Diary from '../components/Diary';
import apiService from '../services/api.service';
import Navbar from '../components/Navbar';
import { AuthContext } from '../context/auth.context';
import { Link } from 'react-router-dom';

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
        <h1 className="pageAddIcon">
          My Diaries
          <Link to="/diaries/add">
            <button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>
          </Link>
        </h1>

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

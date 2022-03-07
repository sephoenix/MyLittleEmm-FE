import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import apiService from '../services/api.service';

function DiaryDetail() {
  const { diaryId } = useParams();
  const [pages, setPages] = useState([]);

  useEffect(() => {
    apiService
      .getAllPages(diaryId)
      .then(response => {
        setPages(response.data);
      })
      .catch(err => console.log(err));
  }, [diaryId]);

  return (
    <div>
      {pages.length > 0 ? (
        <ul>
          {pages.map(elem => (
            <Link key={elem._id} to={`/pages/${elem._id}`}>
              <li>
                {elem.whoWrites}: {elem.content}
              </li>
            </Link>
          ))}
        </ul>
      ) : (
        <p>There are no pages written yet in this diary. Create one!</p>
      )}
      <div>
        {' '}
        <Link to={`/diaries/${diaryId}/edit`}>
          <button>Edit Diary</button>
        </Link>
        <Link to={`/diaries/${diaryId}/pages/add`}>
          <button>Add Page</button>
        </Link>
      </div>
    </div>
  );
}

export default DiaryDetail;

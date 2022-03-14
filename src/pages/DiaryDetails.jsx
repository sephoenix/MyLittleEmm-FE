import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import apiService from '../services/api.service';

function DiaryDetail() {
  const { diaryId } = useParams();
  const [pages, setPages] = useState([]);

  useEffect(() => {
    apiService
      .getDiaryPages(diaryId)
      .then(response => {
        setPages(response.data);
      })
      .catch(err => console.log(err));
  }, []);
  console.log(pages);

  return (
    <div className="container">
      <Link to={`/diaries/${diaryId}/edit`}>
        <button>Edit Diary</button>
      </Link>
      {pages.length > 0 ? (
        <ul>
          {pages.map(page => (
            <Link key={page._id} to={`/pages/${page._id}`}>
              <li>
                {page.whoWrites}: {page.content}
              </li>
            </Link>
          ))}
        </ul>
      ) : (
        <p>There are no pages written yet in this diary. Create one!</p>
      )}
      <div>
        {' '}
        <br />
        <Link to={`/pages/add/${diaryId}`}>
          <button>Add Page</button>
        </Link>
      </div>
    </div>
  );
}

export default DiaryDetail;

import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import apiService from '../services/api.service';

function DiaryDetail() {
  const { diaryId } = useParams();
  const [pages, setPages] = useState([]);

  useEffect(() => {
    apiService
      .getAllPages()
      .then(response => {
        let pagesArr = [];
        for (let i = 0; i < response.data.length; i++) {
          if (response.data[i].diary._id === diaryId) {
            pagesArr.push(response.data[i]);
          }
        }
        setPages(pagesArr);
      })
      .catch(err => console.log(err));
  }, []);
  console.log(pages);

  return (
    <div>
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
        <Link to={`/diaries/${diaryId}/edit`}>
          <button>Edit Diary</button>
        </Link>
        <Link to={`/pages/add/${diaryId}`}>
          <button>Add Page</button>
        </Link>
      </div>
    </div>
  );
}

export default DiaryDetail;

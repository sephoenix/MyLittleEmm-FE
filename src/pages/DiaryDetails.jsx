import { useState, useEffect, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';
import apiService from '../services/api.service';
import Navbar from '../components/Navbar';

function DiaryDetail() {
  const { diaryId } = useParams();
  const [pages, setPages] = useState([]);
  const { user } = useContext(AuthContext);
  const [owner, setOwner] = useState('');

  useEffect(() => {
    apiService
      .getDiaryById(diaryId)
      .then(response => {
        setOwner(response.data.owner);
      })
      .catch(err => console.log(err));
  }, []);

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
    <>
      <Navbar />
      <div className="container page">
        <h1>Pages</h1>
        <div /* className="pages" */>
          {pages.length > 0 ? (
            <ul>
              {pages.map(page => (
                <Link key={page._id} image={page.photo} to={`/pages/${page._id}`}>
                  <li className="pageCard">
                    <h3>
                      {page.date.slice(0, 10)}
                      <br />
                      {page.whoWrites}:
                    </h3>{' '}
                    <p>{page.content}</p>
                  </li>
                </Link>
              ))}
            </ul>
          ) : (
            <p>There are no pages written yet in this diary. Create one!</p>
          )}
        </div>
        <div>
          <br />
          {user._id === owner && (
            <>
              <div className="twobtn">
                <Link to={`/diaries/${diaryId}/edit`}>
                  <button className="btn">Edit Diary</button>
                </Link>
                <Link to={`/pages/add/${diaryId}`}>
                  <button className="btn">Add Page</button>
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default DiaryDetail;

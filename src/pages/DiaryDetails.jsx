import { useState, useEffect, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';
import apiService from '../services/api.service';
import Navbar from '../components/Navbar';

function DiaryDetail() {
  const { diaryId } = useParams();
  const [pages, setPages] = useState({});
  const { user } = useContext(AuthContext);
  const [owner, setOwner] = useState('');
  const [diary, setDiary] = useState('');

  useEffect(() => {
    apiService
      .getDiaryById(diaryId)
      .then(response => {
        setDiary(response.data.name);
        setOwner(response.data.owner);
      })
      .catch(err => console.log(err));
  }, [diaryId]);

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
      <div className="page">
        <h1>{diary}</h1>
        <div>
          {pages.length > 0 ? (
            <div>
              {pages.map(page => (
                <Link key={page._id} image={page.photo} to={`/pages/${page._id}`}>
                  {`${page.photo}` ? (
                    <div className="pageCard" style={{ backgroundImage: `url(${page.photo})` }}>
                      <h3>
                        {page.date.slice(0, 10)}
                        <br />
                        {page.whoWrites}:
                      </h3>
                      <p>{page.content}</p>
                    </div>
                  ) : (
                    <div className="pageCard">
                      <h3>
                        {page.date.slice(0, 10)}
                        <br />
                        {page.whoWrites}:
                      </h3>
                      <p>{page.content}</p>
                    </div>
                  )}
                </Link>
              ))}
            </div>
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

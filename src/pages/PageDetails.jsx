import { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';
import apiService from '../services/api.service';
import Navbar from '../components/Navbar';

function PageDetails() {
  const { pageId } = useParams();
  const [page, setPage] = useState({});
  const [owner, setOwner] = useState('');
  const { user } = useContext(AuthContext);

  useEffect(() => {
    apiService
      .getPageById(pageId)
      .then(response => {
        setOwner(response.data.diary.owner);
      })
      .catch(err => console.log(err));
  }, []);
  console.log('owner', owner);

  useEffect(() => {
    apiService
      .getPageById(pageId)
      .then(response => {
        setPage({
          _id: response.data._id,
          date: response.data.date.slice(0, 10),
          type: response.data.type,
          babyHeight: response.data.babyHeight,
          babyWeight: response.data.babyWeight,
          content: response.data.content,
          diary: response.data.diary,
          photo: response.data.photo,
          whoWrites: response.data.whoWrites,
        });
      })
      .catch(err => console.log(err));
  }, []);
  console.log(page);

  return (
    <>
      <Navbar />
      <div className="container page pageDetail">
        <h1>Page Detail</h1>
        <h3>Type of page: {page.type}</h3>
        <p>
          In this date {page.date}, your weight was {page.babyWeight} Kg and your size was {page.babyHeight} cms.
        </p>
        <p>
          Your {page.whoWrites}, remember that:
          <br /> {page.content}
        </p>
        {page.photo && <img src={page.photo} alt="photo" width="200" />}

        {user._id === owner && (
          <>
            <Link to={`/pages/${pageId}/edit`}>
              <button className="btn">Edit Page</button>
            </Link>
          </>
        )}
      </div>
    </>
  );
}
export default PageDetails;

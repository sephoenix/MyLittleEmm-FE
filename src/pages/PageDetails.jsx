import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import apiService from '../services/api.service';

function PageDetails() {
  const { pageId } = useParams();
  const [page, setPage] = useState({});

  useEffect(() => {
    apiService
      .getPageById(pageId)
      .then(response => {
        console.log(response.data);
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
    <div className="container">
      <p>Type of page: {page.type}</p>
      <p>Your weight: {page.babyWeight} Kg</p>
      <p>Your height: {page.babyHeight} cms</p>
      <p>
        In this date {page.date}, your {page.whoWrites}, remember that:
        <br /> {page.content}
      </p>
      {page.photo && <img src={page.photo} alt="photo" width="200" />}

      <Link to={`/pages/${pageId}/edit`}>
        <button>Edit Page</button>
      </Link>
    </div>
  );
}
export default PageDetails;

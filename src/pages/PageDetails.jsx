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
        setPage(response.data);
      })
      .catch(err => console.log(err));
  }, []);
  console.log(page);

  return (
    <div className="container">
      <h1>Type of page: {page.type}</h1>
      <h1>Your weight: {page.babyWeight} Kg</h1>
      <h1>Your height: {page.babyHeight} cms</h1>
      <h1>{page.public}</h1>
      <h1>
        In this date {page.date}, Your {page.whoWrites} remember that {page.content}
      </h1>
      <img src={page.photo} alt="photo" width="200" />
      <Link to={`/pages/${pageId}/edit`}>
        <button>Edit Page</button>
      </Link>
    </div>
  );
}
export default PageDetails;

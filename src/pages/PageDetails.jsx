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

  return (
    <div>
      <h2>{page.date}</h2>
      <h2>{page.type}</h2>
      <h2>{page.public}</h2>
      <h2>{page.photo}</h2>
      <h2>{page.whoWrites}</h2>
      <h2>{page.babyWeight}</h2>
      <h2>{page.babyHeight}</h2>
      <h2>{page.content}</h2>
      <Link to={`/pages/${pageId}/edit`}>
        <button>Edit Page</button>
      </Link>
    </div>
  );
}
export default PageDetails;

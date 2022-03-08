import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import apiService from '../services/api.service';

function PageDetails() {
  const { pageId } = useParams();
  // const { diaryId } = useParams();
  const [page, setPage] = useState({});

  useEffect(() => {
    apiService
      .getPageById(pageId)
      .then(response => {
        console.log('response', response);
        setPage(response.data);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div>
      <h1>Page content:{page.length > 0 ? page.content : 'No pages yet'}</h1>
      <p>Baby height: {page.babyHeight}</p>
    </div>
  );
}
export default PageDetails;

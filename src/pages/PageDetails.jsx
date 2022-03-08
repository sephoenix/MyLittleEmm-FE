import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import apiService from '../services/api.service';

function PageDetails() {
  const { pageId } = useParams();
  const { diaryId } = useParams();
  const [page, setPage] = useState();

  useEffect(() => {
    apiService
      .getPageById(diaryId, pageId)
      .then(response => {
        console.log('response', response);
        setPage(response.data);
      })
      .catch(err => console.log(err));
  }, []);
  console.table(page);

  return (
    <div>
      <h1>Page content:{page[0].content}</h1>
    </div>
  );
}
export default PageDetails;

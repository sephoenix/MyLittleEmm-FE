import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import apiService from '../services/api.service';

function PageDetails(pages) {
  const { pageId } = useParams();
  const [page, setPage] = useState();

  useEffect(() => {
    apiService
      .getPageById(pageId)
      .then(response => {
        setPage(response.data);
      })
      .catch(err => console.log(err));
  }, []);
  console.log(page, pages);

  return <h1>Page content:{pageId}</h1>;
}

//arreglar y meter map para que se vean todas las páginas
export default PageDetails;

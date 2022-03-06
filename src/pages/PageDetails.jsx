import { useParams } from 'react-router-dom';

function PageDetails() {
  const { pageId } = useParams();
  return <h1>Page id:{pageId} details</h1>;
}

export default PageDetails;

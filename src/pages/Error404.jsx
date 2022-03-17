import { useEffect } from 'react';
import { Link } from 'react-router-dom';

function Error404() {
  useEffect(() => {
    document.body.style.backgroundColor = '#6d4ba4'; // Background color of Homepage

    return () => {
      document.body.style.backgroundColor = '#f5def5'; // Background color of the rest of the pages
    };
  }, []);

  return (
    <div className="container error">
      <div className="title">ERROR 404</div>
      <h2>Page not found</h2>
      <Link to="/">
        <button className="btnInv">Back Home</button>
      </Link>
    </div>
  );
}

export default Error404;

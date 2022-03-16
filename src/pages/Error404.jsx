import { Link } from 'react-router-dom';

function Error404() {
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

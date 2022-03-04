import { Link } from 'react-router-dom';

function Diary({ name, id }) {
  return (
    <div>
      <Link to={`/diaries/${id}`}>
        <h2>{name}</h2>
      </Link>
    </div>
  );
}

export default Diary;

import { Link } from 'react-router-dom';

function Diary({ name, diariesId }) {
  return (
    <div>
      <Link to={`/diaries/${diariesId}`}>
        <h2>{name}</h2>
      </Link>
    </div>
  );
}

export default Diary;

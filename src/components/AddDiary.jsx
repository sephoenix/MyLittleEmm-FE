import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../services/api.service';
import Navbar from '../components/Navbar';

function AddDiary() {
  const [diary, setDiary] = useState({
    name: '',
  });
  const navigate = useNavigate();

  const handleChange = e => {
    setDiary(prev => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    apiService
      .addADiary(diary)
      .then(response => {
        console.log(response);
        navigate(`/diaries/${response.data._id}`);
      })
      .catch(e => console.log(e));
  };

  return (
    <>
      <Navbar />
      <div className="container form">
        <h1>Add Diary</h1>
        <form onSubmit={handleSubmit}>
          <label>
            <h2 className="ml">Name:</h2>
          </label>
          <div className="homeDiv">
            <input className="inp" type="text" name="name" value={diary.name} onChange={handleChange} />
            <button className="btn center" type="submit">
              Create new Diary
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default AddDiary;

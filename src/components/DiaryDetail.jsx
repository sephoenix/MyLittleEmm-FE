function DiaryDetail(props) {
  console.log(props);
  const [pages, setpages] = useState([]);

  useEffect(() => {
    apiService
      .getAllPages(diaryId)
      .then(response => {
        console.log(response.data);
        setpages(response.data);
      })
      .catch(err => console.log(err));
  }, []);
  console.log(pages);

  return (
    <div>
      <Link to={`/diaries/${diaryId}/add`}>
        <button>Add Page</button>
      </Link>
      <Link to={`/diaries/${diaryId}/pages/add`}>
        <button>Add Page</button>
      </Link>
    </div>
  );
}

export default DiaryDetail;

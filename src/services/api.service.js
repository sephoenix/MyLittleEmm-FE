import axios from 'axios';

class ApiService {
  constructor() {
    this.api = axios.create({
      baseURL: process.env.REACT_APP_SERVER_URL || 'http://localhost:5005',
    });

    // Automatically set JWT token in the headers for every request
    this.api.interceptors.request.use(config => {
      // Retrieve the JWT token from the local storage
      const storedToken = localStorage.getItem('authToken');

      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }

      return config;
    });
  }

  login = requestBody => {
    return this.api.post('/auth/login', requestBody);
    // same as
    // return axios.post("http://localhost:5005/auth/login");
  };

  signup = requestBody => {
    return this.api.post('/auth/signup', requestBody);
    // same as
    // return axios.post("http://localhost:5005/auth/singup");
  };

  verify = () => {
    return this.api.get('/auth/verify');
    // same as
    // return axios.post("http://localhost:5005/auth/verify");
  };

  getAllDiaries = () => {
    return this.api.get('/api/diaries');
  };

  postOneDiary = requestBody => {
    return this.api.post('/api/diaries', requestBody);
  };

  getDiaryById = diaryId => {
    return this.api.get(`/api/diaries/${diaryId}`);
  };

  putOneDiary = (diaryId, requestBody) => {
    return this.api.put(`/api/diaries/${diaryId}/edit`, requestBody);
  };

  deleteDiary = diaryId => {
    return this.api.delete(`/api/diaries/${diaryId}/delete`);
  };

  postOnePage = (requestBody, diaryId) => {
    return this.api.post(`/api/diaries/${diaryId}/pages/add`, requestBody);
  };

  getAllPages = diaryId => {
    return this.api.get(`/api/diaries/${diaryId}/pages`);
  };

  getPageById = (pageId) => this.api.get(`/api/pages/${pageId}`);

  putOnePage = (diaryId, pageId, requestBody) => {
    return this.api.put(`/api/diaries/${diaryId}/${pageId}/edit`, requestBody);
  };

  deleteOnePage = (diaryId, pageId) => {
    return this.api.delete(`/api/diaries/${diaryId}/${pageId}/delete`);
  };
}

// Create one instance (object) of the service
const apiService = new ApiService();

export default apiService;

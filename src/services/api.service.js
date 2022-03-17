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

  getMyDiaries = id => {
    return this.api.get('api/diaries/myDiaries', id);
  };

  addADiary = requestBody => {
    return this.api.post('/api/diaries/', requestBody);
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

  postOnePage = requestBody => {
    return this.api.post(`/api/pages/add`, requestBody);
  };

  getAllPages = () => {
    return this.api.get(`/api/pages`);
  };

  getPageById = pageId => {
    return this.api.get(`/api/pages/${pageId}`);
  };

  getDiaryPages = diaryId => {
    return this.api.get(`/api/pages/diary/${diaryId}`);
  };

  putOnePage = (pageId, requestBody) => {
    return this.api.put(`/api/pages/${pageId}/edit`, requestBody);
  };

  deleteOnePage = pageId => {
    return this.api.delete(`/api/pages/${pageId}/delete`);
  };

  getUser = () => {
    return this.api.get(`/api/user/`);
  };

  editUser = requestBody => {
    return this.api.put(`/api/user/edit`, requestBody);
  };

  uploadImage = file => {
    return this.api.post(`/api/pages/upload/`, file);
  };
}

// Create one instance (object) of the service
const apiService = new ApiService();

export default apiService;

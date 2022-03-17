import './App.css';
import { Route, Routes } from 'react-router-dom';
import AddDiary from './components/AddDiary';
import AddPage from './components/AddPage';
import IsAnon from './components/IsAnon';
import IsPrivate from './components/IsPrivate';
import { AuthProviderWrapper } from './context/auth.context';
import DiaryDetails from './pages/DiaryDetails';
import DiariesList from './pages/DiariesList';
import PageDetails from './pages/PageDetails';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import Protected from './pages/Protected';
import SignupPage from './pages/SignupPage';
import EditDiary from './components/EditDiary';
import EditPage from './components/EditPage';
import UserProfile from './pages/UserProfile';
import EditUser from './components/EditUser';
import Error404 from './pages/Error404';
import MyDiariesList from './pages/MyDiariesList';

function App() {
  return (
    <AuthProviderWrapper>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/diaries" element={<DiariesList />} />

        <Route
          path="/diaries/myDiaries"
          element={
            <IsPrivate>
              <MyDiariesList />
            </IsPrivate>
          }
        />
        <Route
          path="/diaries/add"
          element={
            <IsPrivate>
              <AddDiary />
            </IsPrivate>
          }
        />
        <Route
          path="/diaries/:diaryId/edit"
          element={
            <IsPrivate>
              <EditDiary />
            </IsPrivate>
          }
        />
        <Route
          path="/diaries/:diaryId"
          element={
            <IsPrivate>
              <DiaryDetails />
            </IsPrivate>
          }
        />
        <Route
          path="/pages/add/:diaryId"
          element={
            <IsPrivate>
              <AddPage />
            </IsPrivate>
          }
        />
        <Route
          path="/pages/:pageId"
          element={
            <IsPrivate>
              <PageDetails />
            </IsPrivate>
          }
        />
        <Route
          path="/pages/:pageId/edit"
          element={
            <IsPrivate>
              <EditPage />
            </IsPrivate>
          }
        />
        <Route
          path="/user"
          element={
            <IsPrivate>
              <UserProfile />
            </IsPrivate>
          }
        />
        <Route
          path="/user/edit"
          element={
            <IsPrivate>
              <EditUser />
            </IsPrivate>
          }
        />

        <Route
          path="/protected"
          element={
            <IsPrivate>
              <Protected />
            </IsPrivate>
          }
        />
        <Route
          path="/login"
          element={
            <IsAnon>
              <LoginPage />
            </IsAnon>
          }
        />
        <Route
          path="/signup"
          element={
            <IsAnon>
              <SignupPage />
            </IsAnon>
          }
        />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </AuthProviderWrapper>
  );
}

export default App;

import './App.css';
import { Route, Routes } from 'react-router-dom';
import AddDiary from './components/AddDiary';
import AddPage from './components/AddPage';
import IsAnon from './components/IsAnon';
import IsPrivate from './components/IsPrivate';
import Navbar from './components/Navbar';
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

function App() {
  return (
    <AuthProviderWrapper>
      <Navbar />
      <Routes>
        <Route path="/diaries" element={<DiariesList />} />
        <Route path="/diaries/add" element={<AddDiary />} />
        <Route path="/diaries/:diaryId/edit" element={<EditDiary />} />
        <Route path="/diaries/:diaryId" element={<DiaryDetails />} />
        <Route path="/pages/add" element={<AddPage />} />
        <Route path="/pages/:pageId" element={<PageDetails />} />
        <Route path="/pages/:pageId/edit" element={<EditPage />} />
        <Route path="/" element={<Home />} />
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
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </AuthProviderWrapper>
  );
}

export default App;

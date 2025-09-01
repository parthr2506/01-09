import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import CreatePost from './pages/CreatePost';
import EditPage from './pages/EditPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/signup' element={<Signup />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/dashboard' element={<Dashboard />}></Route>
        <Route path='/create-post' element={<CreatePost />}></Route>
        <Route path='edit-post/:id' element={<EditPage />}></Route>
      </Routes>
    </Router>
  );
}

export default App;

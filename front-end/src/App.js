import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './screens/Home'
import Login from './screens/Login'
import Register from './screens/Register';
import Profile from './screens/Profile';
import EditProfile from './screens/EditProfile';
import FriendsList from './screens/FriendsList'

const App = () => {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile/:username" element={<Profile />} />
        <Route path="/profile/:username/edit" element={<EditProfile />} />
        <Route path="/friendslist" element={<FriendsList />} />
      </Routes>
    </Router>
  )
}

export default App
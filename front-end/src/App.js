import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import loggedInData from './fillerData/loggedIn.json'
import Home from './screens/Home'
import Login from './screens/Login'
import Register from './screens/Register';
import Profile from './screens/Profile';
import EditProfile from './screens/EditProfile';
import Error404 from './screens/Error404';

const loggedInUser = loggedInData[0].id

const App = () => {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/profile/:username' element={<Profile />} />
        <Route path='/profile/:username/edit' element={<EditProfile />} />
        {
          !loggedInUser &&
          <>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
          </>
        }

        <Route path='*' element={<Error404 />} />
      </Routes>
    </Router>
  )
}

export default App
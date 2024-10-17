import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './screens/Home'
import CreateBlogPost from './screens/Createnewblogpost'

const App = () => {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/createnewblogpost" element={<CreateBlogPost />} />
      </Routes>
    </Router>
  )
}

export default App
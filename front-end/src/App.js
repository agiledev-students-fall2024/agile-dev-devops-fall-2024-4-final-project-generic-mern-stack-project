import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './screens/Home'
import CreateBlogPost from './screens/Createnewblogpost'
import Blogpostloggedin from './screens/Blogpostloggedin'
import Blogpostnotloggedin from './screens/Blogpostnotloggedin'
import Updateblogpost from './screens/Updateblogpost'

const App = () => {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/createnewblogpost" element={<CreateBlogPost />} />
        <Route path="/blogpostloggedin" element={<Blogpostloggedin />} />
        <Route path="/blogpostnotloggedin" element={<Blogpostnotloggedin />} />
        <Route path="/updateblogpost" element={<Updateblogpost />} />
      </Routes>
    </Router>
  )
}

export default App
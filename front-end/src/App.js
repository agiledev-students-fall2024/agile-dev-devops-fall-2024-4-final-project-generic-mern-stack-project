import './App.css';
import TitleAndDescription from './components/TitleAndDescription'
import TextAndButton from './components/TextAndButton'
import UploadImage from './components/UploadImage'
import DropdownMenu from './components/DropdownMenu'
import TitleAndDescriptionBox from './components/TitleAndDescriptionBox';
import NavigationBar from './components/NavigationBar';
import SubCommunity from './components/SubCommunity';
import CommunityPopup from './components/CommunityPopup';
import Home from './Home';
import Community from './Community';
import Blog from './Blog';
import Profile from './Profile';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <>
    <div className="App">
      <Router>
        <main className="App-main">
          <Routes>
            {/* a route for the home page */}
            <Route path="/" element={<Home />} />

            {/* a route to the community page */}
            <Route path="/community" element={<Community />} />

            {/* a route for blog page */}
            <Route path="/blog" element={<Blog/>} />

            {/* a route for profile page */}
            <Route path="/profile" element={<Profile/>} />

          </Routes>

          {/* test components */}
          <TitleAndDescription
            title={"Account Settings"}
            description={"See information about your account and learn about your deactivation settings."}
          />

          <h1></h1>

          <TextAndButton
            text={"blocked_account"}
            button={"Unblock"}
          />

          <h1></h1>

          <UploadImage
            image={"Profile icon"}
          />

          <h1></h1>

          <DropdownMenu
            name={"color-mode"}
            label={"Color Mode"}
            options={["Light", "Dark"]}
          />

          <h1></h1>

          <TitleAndDescriptionBox
            title={"Privacy"}
            description={"Limit access to your account and information from others in communities."}
          />

          <h1></h1>

          <SubCommunity
            image={"/logo192.png"}
            name={"React"}
            description={"React.js is a front-end Javascript library that creates HTML, CSS, and browser-based Javascript, going from intepreting non-compatible Javascript from JSX syntax to browser-compatible Javascript."}
          />

          <h1></h1>

          <CommunityPopup/>

          <h1></h1>

          <NavigationBar/>

        </main>
      </Router>
    </div>
    </>
  )
}

export default App;

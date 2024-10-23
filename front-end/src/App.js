import logo from "./logo.svg";
import "./App.css";
import TitleAndDescription from "./components/TitleAndDescription";
import TextAndButton from "./components/TextAndButton";
import UploadImage from "./components/UploadImage";
import DropdownMenu from "./components/DropdownMenu";
import TitleAndDescriptionBox from "./components/TitleAndDescriptionBox";
import NavigationBar from "./components/NavigationBar";
import SubCommunity from "./components/SubCommunity";
import CommunityPopup from "./components/CommunityPopup";
import InputField from "./components/InputField";
import SubmitButton from "./components/SubmitButton";
import LogoPageTitle from "./components/LogoPageTitle";
import SearchBar from "./components/SearchBar";
import Home from "./pages/Home";
import Community from "./pages/Community";
import Blog from "./pages/Blog";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings"
import Privacy from "./pages/Privacy"
import Blocked from "./pages/Blocked"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <main className="App-main">
          <Routes>
            {/* a route for the home page */}
            <Route path="/" element={<Home />} />

            {/* a route to the community page */}
            <Route path="/community" element={<Community />} />

            {/* a route for blog page */}
            <Route path="/blog" element={<Blog />} />

            {/* a route for profile page */}
            <Route path="/profile" element={<Profile />} />

            {/* a route for settings page */}
            <Route path="/settings" element={<Settings />} />

            {/* a route for privacy page */}
            <Route path="/privacy" element={<Privacy />} />

            {/* a route to blocked users page */}
            <Route path="/blocked-users" element={<Blocked type={'blocked_users'} text={'Blocked Users'} />} />

            {/* a route to blocked communities page */}
            <Route path="/blocked-communities" element={<Blocked type={'blocked_communities'} text={'Blocked Communities'} />} />

            {/* a route to muted words page */}
            <Route path="/muted-words" element={<Blocked type={'muted_words'} text={'Muted Words'} />} />
          </Routes>

          {/* test components */}
          {/* <TitleAndDescription
            title={"Account Settings"}
            description={
              "See information about your account and learn about your deactivation settings."
            }
          />

          <h1></h1>

          <TextAndButton text={"blocked_account"} button={"Unblock"} />

          <h1></h1>

          <UploadImage image={"Profile icon"} />

          <h1></h1>

          <DropdownMenu
            name={"color-mode"}
            label={"Color Mode"}
            options={["Light", "Dark"]}
          />

          <h1></h1>

          <TitleAndDescriptionBox
            title={"Privacy"}
            description={
              "Limit access to your account and information from others in communities."
            }
          />

          <h1></h1>

          <SubCommunity
            image={"/logo192.png"}
            name={"React"}
            description={
              "React.js is a front-end Javascript library that creates HTML, CSS, and browser-based Javascript, going from intepreting non-compatible Javascript from JSX syntax to browser-compatible Javascript."
            }
          />

          <h1></h1>

          <CommunityPopup />

            <h1></h1>

          <NavigationBar />

          <LogoPageTitle
            logoSrc="logo192.png"
            title="example logo and page title"
          />
          <InputField inputfieldName="Name" />
          <InputField inputfieldName="Email" inputType="email" />
          <InputField inputfieldName="Password" inputType="password" />
          <SubmitButton placeholder="Submit" />
          <SearchBar /> */}

        </main>
      </Router>
    </div>
  );
}

export default App;

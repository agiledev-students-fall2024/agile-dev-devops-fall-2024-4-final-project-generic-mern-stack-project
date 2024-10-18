import logo from "./logo.svg";
import "./App.css";
import InputField from "./Components/InputField";
import SubmitButton from "./Components/SubmitButton";
import LogoPageTitle from "./Components/LogoPageTitle";
import SearchBar from "./Components/SearchBar";

function App() {
  return (
    <>
      <LogoPageTitle
        logoSrc="logo192.png"
        title="example logo and page title"
      />
      <InputField inputfieldName="Name" />
      <InputField inputfieldName="Email" inputType="email" />
      <InputField inputfieldName="Password" inputType="password" />
      <SubmitButton placeholder="Submit" />
      <SearchBar />
    </>
  );
}

export default App;

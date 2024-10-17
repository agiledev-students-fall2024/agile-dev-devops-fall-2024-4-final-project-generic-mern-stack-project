import './App.css';
import TitleAndDescription from './components/TitleAndDescription'
import TextAndButton from './components/TextAndButton'
import UploadImage from './components/UploadImage'
import DropdownMenu from './components/DropdownMenu'

function App() {
  return (
    <>
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
    </>
  )
}

export default App;

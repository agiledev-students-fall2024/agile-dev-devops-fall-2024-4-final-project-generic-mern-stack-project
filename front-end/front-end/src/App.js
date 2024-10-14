import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom"
import Homepage from './Homepage';
function App() {
  return (
    <div className='App'>
        <BrowserRouter>
          <Routes>
            {/* Add any route in the same format it is defined as here */}
            <Route path='/' element={<Homepage/>} />
          </Routes>
        </BrowserRouter>
      </div>
  );
}

export default App;

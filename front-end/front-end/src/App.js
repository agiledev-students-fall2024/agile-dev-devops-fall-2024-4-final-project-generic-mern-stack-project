import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom"
import Homepage from './Homepage';
import Tasks from './Tasks';
import CreateTask from './CreateTask';
import Calendar_monthly from './Calendar_monthly';

function App() {
  return (
    <div className='App'>
        <BrowserRouter>
          <Routes>
            {/* Add any route in the same format it is defined as here */}
            <Route path='/' element={<Homepage/>} />
            <Route path="/Tasks" element={<Tasks />} />  {/* Task page route */}
            <Route path="/CreateTask" element={<CreateTask />} />
            
            {/* Rena's part : monthly Calendar */}
            <Route path="/Monthly_calendar" element={<Calendar_monthly/>} />
          </Routes>
        </BrowserRouter>
      </div>
  );
}

export default App;

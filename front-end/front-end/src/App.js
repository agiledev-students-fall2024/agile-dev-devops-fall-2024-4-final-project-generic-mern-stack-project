import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom"
import Homepage from './Homepage/Homepage';
import Tasks from './Tasks/Tasks';
import CreateTask from './Tasks/CreateTask';
import Calendar_monthly from './Calendar/Calendar_monthly';
import DailyView from './Calendar/DailyView';
import Header from './header';
import Goals from './Goals/Goals';
import NewGoal from './Goals/NewGoal';
import EditTask from './Tasks/EditTask';
import Login from './Authentication/Login';
import Register from './Authentication/Register';

function App() {

  return (
    <div className='App'>
        <BrowserRouter>
          <Header />
          <Routes>
            {/* Add any route in the same format it is defined as here */}
            <Route path='/' element={<Login/>} />
            <Route path="/Tasks" element={<Tasks />} />
            <Route path="/EditTask" element={<EditTask />}/>
            {/* Comment for the edit task: because of the restriction of mock data now, 
              this function cannot fully achieved, so the way we connect it is not exactly true.
              the page itself can be seen from http://localhost:3000/EditTask. */}
            <Route path="/CreateTask" element={<CreateTask />} />
            <Route path="/Goals" element={<Goals />} />
            <Route path="/NewGoal" element={<NewGoal />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/Homepage" element={<Homepage />} />
            {/* Rena's part : monthly Calendar */}
            <Route path="/Calendar_monthly" element={<Calendar_monthly/>} />
            <Route path=":month/:day/:year" element={<DailyView />} /> 
          </Routes>
        </BrowserRouter>
      </div>
  );
}

export default App;

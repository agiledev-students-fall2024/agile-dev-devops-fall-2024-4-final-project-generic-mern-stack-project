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
function App() {
  return (
    <div className='App'>
        <BrowserRouter>
          <Header />
          <Routes>
            {/* Add any route in the same format it is defined as here */}
            <Route path='/' element={<Homepage/>} />
            <Route path="/Tasks" element={<Tasks />} />  {/* Task page route */}
            <Route path="/CreateTask" element={<CreateTask />} />
            <Route path="/Goals" element={<Goals />} />
            <Route path="/NewGoal" element={<NewGoal />} />
            {/* Rena's part : monthly Calendar */}
            <Route path="/Monthly_calendar" element={<Calendar_monthly/>} />
            <Route path="/day/:day" element={<DailyView />} /> {/* Daily view route */}
          </Routes>
        </BrowserRouter>
      </div>
  );
}

export default App;

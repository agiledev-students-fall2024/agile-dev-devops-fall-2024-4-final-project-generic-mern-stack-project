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
import { useState } from 'react';
import EditTask from './Tasks/EditTask';
import Login from './Authentication/Login';
import Register from './Authentication/Register';

function App() {

  // //stored tasks to act as database in order to be used to populate edit task page
  // const [tasks, setTasks] = useState([
  //   // { name: 'Read Algorithms Notes', due: '11/23', status: 'finished', priority: 'high', subject: 'Algorithms', recurring_period: "Weekly" },
  //   // { name: 'Read SDE Notes', due: '11/25', status: 'ongoing', priority: 'medium', subject: 'Software Engineering', recurring_period: "Biweekly" },
  //   // { name: 'Read Ethics Notes', due: '11/24', status: 'not_started', priority: 'low', subject: 'Ethics', recurring_period: "Monthly" },
  //   // { name: 'Complete React Project', due: '11/26', status: 'not_started', priority: 'high', subject: 'Algorithms', recurring_period: "Weekly" },
  //   // { name: 'Study for Math Exam', due: '11/27', status: 'ongoing', priority: 'medium', subject: 'Ethics', recurring_period: "Bimonthly" },
  //   // { name: 'Prepare Presentation', due: '11/28', status: 'ongoing', priority: 'low', subject: 'Software Engineering', recurring_period: "Monthly" },
  //   // { name: 'Write Blog Post', due: '11/29', status: 'finished', priority: 'high', subject: 'Algorithms', recurring_period: "Weekly" },
  //   // { name: 'Finish Machine Learning Assignment', due: '12/01', status: 'not_started', priority: 'medium', subject: 'Software Engineering', recurring_period: "Biweekly" },
  //   // { name: 'Start Gym Routine', due: '12/02', status: 'ongoing', priority: 'low', subject: 'Algorithms', recurring_period: "Monthly" },
  //   // { name: 'Read Ethics Paper', due: '12/03', status: 'not_started', priority: 'high', subject: 'Ethics', recurring_period: "Weekly" }
  // ]);

  return (
    <div className='App'>
        <BrowserRouter>
          <Header />
          <Routes>
            {/* Add any route in the same format it is defined as here */}
            <Route path='/' element={<Login/>} />
            <Route path="/Tasks" element={<Tasks />} />
            <Route path="/EditTask" element={<EditTask />}/>
            <Route path="/CreateTask" element={<CreateTask />} />
            <Route path="/Goals" element={<Goals />} />
            <Route path="/NewGoal" element={<NewGoal />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/Homepage" element={<Homepage />} />
            {/* Rena's part : monthly Calendar */}
            <Route path="/Calendar_monthly" element={<Calendar_monthly/>} />
            <Route path="/day/:day" element={<DailyView />} /> 
          </Routes>
        </BrowserRouter>
      </div>
  );
}

export default App;

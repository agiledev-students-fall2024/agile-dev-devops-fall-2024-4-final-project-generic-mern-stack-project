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

function App() {

  const [tasks, setTasks] = useState([
    { name: 'Read Algorithms Notes', due: '11/23', status: 'finished' },
    { name: 'Read SDE Notes', due: '11/25', status: 'ongoing' },
    { name: 'Read Ethics Notes', due: '11/24', status: 'not_started' },
    { name: 'Complete React Project', due: '11/26', status: 'not_started' },
    { name: 'Study for Math Exam', due: '11/27', status: 'ongoing' },
    { name: 'Prepare Presentation', due: '11/28', status: 'ongoing' },
    { name: 'Write Blog Post', due: '11/29', status: 'finished' },
    { name: 'Finish Machine Learning Assignment', due: '12/01', status: 'not_started' },
    { name: 'Start Gym Routine', due: '12/02', status: 'ongoing' },
    { name: 'Read Ethics Paper', due: '12/03', status: 'not_started' }
  ]);

  return (
    <div className='App'>
        <BrowserRouter>
          <Header />
          <Routes>
            {/* Add any route in the same format it is defined as here */}
            <Route path='/' element={<Homepage/>} />
            <Route 
              path="/Tasks" 
              element={<Tasks tasks={tasks} setTasks={setTasks} />} />  {/* Task page route */}
            
            <Route
              path="/edit-task/:taskId"
              element={<EditTask tasks={tasks} setTasks={setTasks} />}
            />
            <Route path="/CreateTask" element={<CreateTask />} />
            <Route path="/Goals" element={<Goals />} />
            <Route path="/NewGoal" element={<NewGoal />} />
            {/* Rena's part : monthly Calendar */}
            <Route path="/Calendar_monthly" element={<Calendar_monthly/>} />
            <Route path="/day/:day" element={<DailyView />} /> {/* Daily view route */}
          </Routes>
        </BrowserRouter>
      </div>
  );
}

export default App;

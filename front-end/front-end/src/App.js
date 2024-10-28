import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom"
import { useState } from 'react';
import Homepage from './Homepage';
import Tasks from './Tasks';
import CreateTask from './CreateTask';
import Calendar_monthly from './Calendar_monthly';
import EditTask from './EditTask';

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
            
            {/* Rena's part : monthly Calendar */}
            <Route path="/Monthly_calendar" element={<Calendar_monthly/>} />
          </Routes>
        </BrowserRouter>
      </div>
  );
}

export default App;

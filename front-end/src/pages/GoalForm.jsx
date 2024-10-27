import { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './Goal.css'

function GoalForm() {
  const [inputs, setInputs] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({ ...values, [name]: value }));
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(inputs);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name Your Goal: 
        <input 
          type="text" 
          name="username" 
          value={inputs.username || ""} 
          onChange={handleChange}
        />
      </label>
      <label>
        Spending:
        <select 
          name="spending" 
          value={inputs.spending || ""} 
          onChange={handleChange}
        >
          <option value="" disabled> spending frequency</option>
          <option value="daily">Daily</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
      </label>
      <label>
       
        <input 
          type="text" 
          name="spendingDetails" 
          value={inputs.spendingDetails || ""} 
          onChange={handleChange}
        />
      </label>
      <input  className="button" type="submit" />
    </form>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<GoalForm />);

export default GoalForm;

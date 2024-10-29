import { useState, useEffect } from 'react';
import './Goal.css';

function GoalForm({ initialData, onSubmit }) {
  const [inputs, setInputs] = useState({
    username: '',
    spending: '',
    spendingDetails: ''
  });

  useEffect(() => {
    if (initialData) {
      setInputs(initialData); // Initialize with existing goal data if editing
    }
  }, [initialData]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(inputs); // Submit goal to parent component
    setInputs({ username: '', spending: '', spendingDetails: '' }); // Clear form
  };

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
          <option value="" disabled>spending frequency</option>
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
      <input className="button" type="submit" />
    </form>
  );
}

export default GoalForm;

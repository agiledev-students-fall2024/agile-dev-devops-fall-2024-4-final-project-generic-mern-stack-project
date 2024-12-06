import { useState, useEffect } from 'react';
import './Goal.css';

function GoalForm({ initialData, onSubmit, currentUserId }) { // Added `currentUserId` prop
  const [inputs, setInputs] = useState({
    goalName: '', // Updated field name to match schema
    spending: '',
    spendingDetails: '',
  });

  useEffect(() => {
    if (initialData) {
      console.log("Prefilling with initial data:", initialData); // Debug log
      setInputs({
        goalName: initialData.goalName || '', // Populate goalName
        spending: initialData.spending || '', // Populate spending
        spendingDetails: initialData.spendingDetails || '', // Populate spendingDetails
      });
    }
  }, [initialData]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Map frontend form fields to backend schema
    const mappedGoal = {
      goalName: inputs.goalName, // Updated field
      spendingDetails: parseFloat(inputs.spendingDetails), // Ensure target amount is a number
      spending: inputs.spending, // Spending frequency
      owner: currentUserId, // Set owner as the current user
    };

    onSubmit(mappedGoal); // Submit the mapped goal data to the parent component
    setInputs({ goalName: '', spending: '', spendingDetails: '' }); // Clear form inputs
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name Your Goal:
        <input
          type="text"
          name="goalName" // Field matches schema
          value={inputs.goalName || ""}
          onChange={handleChange}
        />
      </label>
      <label>
        Spending:
        <select
          name="spending" // Field matches schema
          value={inputs.spending || ""}
          onChange={handleChange}
        >
          <option value="" disabled>Select frequency</option>
          <option value="daily">Daily</option>
          <option value="monthly">Monthly</option>
          <option value="annual">Annual</option>
        </select>
      </label>
      <label>
        Target Amount:
        <input
          type="text"
          name="spendingDetails" // Field matches schema
          value={inputs.spendingDetails || ""}
          onChange={handleChange}
        />
      </label>
      <input className="button" type="submit" value="Submit Goal" />
    </form>
  );
}

export default GoalForm;

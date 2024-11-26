// RecipeSteps.jsx
import React from 'react';

function RecipeSteps({ steps, completedSteps, onStepComplete, buttonRef, onComplete }) {
  return (
    <div className="steps-container">
      <h3>Steps:</h3>
      {steps?.map((step, index) => (
        <div key={index} className={`steps-card ${completedSteps.includes(index) ? 'completed' : 'default'}`}>
          <h4>Step {index + 1}</h4>
          <p>{step}</p>
          <button
            className={`steps-button ${completedSteps.includes(index) ? 'completed' : 'default'}`}
            onClick={() => onStepComplete(index)}
          >
            {completedSteps.includes(index) ? 'Completed' : 'Mark as Completed'}
          </button>
        </div>
      ))}
      <button
        ref={buttonRef}
        className={`finish-activity-button ${completedSteps.length === steps.length ? 'finished' : 'default'}`}
        onClick={onComplete}
      >
        Finish Activity
      </button>
    </div>
  );
}

export default RecipeSteps;

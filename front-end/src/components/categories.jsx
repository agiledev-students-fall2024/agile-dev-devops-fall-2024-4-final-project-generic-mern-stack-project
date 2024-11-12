import React from 'react';
import budgetLimits from '../mocks/budgetLimits';
import './categories.css';

function categories({ categoryTotals, isEditing, handleLimitChange }) {
  const calculateProgress = (spent, limit) => Math.min((spent / limit) * 100, 100);

  const definedCategoryLimitTotal = Object.keys(budgetLimits)
    .filter((category) => category !== "MonthlyBudget")
    .reduce((sum, category) => sum + (budgetLimits[category] || 0), 0);

  const otherLimit = budgetLimits.MonthlyBudget - definedCategoryLimitTotal;
  const otherSpent = categoryTotals.Other || 0;

  const categoriesToDisplay = { ...budgetLimits, Other: otherLimit };

  return (
    <div className="category-breakdown-grid">
      {Object.keys(categoriesToDisplay).map((category) => {
        if (category === "MonthlyBudget") return null; 
        
        const spent = categoryTotals[category] || (category === "Other" ? otherSpent : 0);
        const limit = categoriesToDisplay[category] || 100;
        const percentage = calculateProgress(spent, limit);

        return (
          <div key={category} className="category-card">
            <div className="progress-circle" style={{ '--progress': `${percentage}%` }}>
              <div className="progress-text">{Math.round(percentage)}%</div>
            </div>
            <p className="category-name">{category}</p>
            {isEditing ? (
              <input
                type="number"
                value={limit}
                onChange={(e) => handleLimitChange(category, e.target.value)}
                className="category-limit-input"
              />
            ) : (
              <p>${spent.toFixed(2)} / ${limit}</p>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default categories;

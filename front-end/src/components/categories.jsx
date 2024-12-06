import React from 'react';
import './categories.css';

function categories({ categoryTotals, categoryLimits, isEditing, handleLimitChange }) {
  const calculateProgress = (spent, limit) => (limit > 0 ? Math.min((spent / limit) * 100, 100) : 0);

  return (
    <div className="category-breakdown-grid">
      {Object.keys(categoryLimits).map((category) => {
        const spent = categoryTotals[category] || 0;
        const limit = categoryLimits[category] || 0;
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
                onChange={(e) => handleLimitChange(category, Number(e.target.value))}
                className="category-limit-input"
              />
            ) : (
              <p>${spent.toFixed(2)} / ${limit.toFixed(2)}</p>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default categories;

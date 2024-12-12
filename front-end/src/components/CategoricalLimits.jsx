import React, { useState, useEffect } from 'react';
import './categories.css';

function CategoricalLimits({ categoryTotals, isEditing, handleLimitChange }) {
    const [budgetLimits, setBudgetLimits] = useState({ categories: [] });

    useEffect(() => {
        const fetchBudgetLimits = async () => {
            try {
                const userId = localStorage.getItem('id');
                const response = await fetch(`http://localhost:3001/api/budget-limits?userId=${userId}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });

                if (!response.ok) {
                    throw new Error(`Error fetching budget limits: ${response.statusText}`);
                }

                const data = await response.json();
                setBudgetLimits(data);
            } catch (error) {
                console.error(error.message);
            }
        };

        fetchBudgetLimits();
    }, []);

    const categoryData = (budgetLimits.categories || []).reduce((acc, category) => {
        const name = category.name;
        acc[name] = {
            spent: categoryTotals[name] || 0,
            limit: category.limit || 0,
        };
        return acc;
    }, {});

    return (
        <div className="category-breakdown-grid">
            {Object.keys(categoryData).map((name) => {
                const { spent, limit } = categoryData[name];
                const percentage = limit > 0 ? Math.min((spent / limit) * 100, 100) : 0;

                return (
                    <div key={name} className="category-card">
                        <div
                            className="progress-circle"
                            style={{ '--progress': `${percentage}%` }}
                        >
                            <div className="progress-text">{Math.round(percentage)}%</div>
                        </div>
                        <p className="category-name">{name}</p>
                        {isEditing ? (
                            <input
                                type="number"
                                value={limit}
                                onChange={(e) => handleLimitChange(name, Number(e.target.value))}
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

export default CategoricalLimits;

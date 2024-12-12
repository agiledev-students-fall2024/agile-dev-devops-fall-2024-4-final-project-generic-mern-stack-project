import React, { useState } from 'react';
import './SetBudget.css';
import CategoryDropdown from './categoryDropdown';

function SetBudget({ onSetBudget, onClose }) {
    const [monthlyLimit, setMonthlyLimit] = useState('');
    const [categories, setCategories] = useState([{ name: '', limit: '' }]);

    const handleAddCategory = () => {
        setCategories([...categories, { name: '', limit: '' }]);
    };

    const handleCategoryChange = (index, field, value) => {
        const updatedCategories = [...categories];
        updatedCategories[index][field] = value;
        setCategories(updatedCategories);
    };

    const handleSubmit = async () => {
        const validCategories = categories.filter((cat) => cat.name && cat.limit);
        const payload = {
            userId: localStorage.getItem('id'),
            monthlyLimit: parseFloat(monthlyLimit),
            categories: validCategories.map((cat) => ({
                name: cat.name,
                limit: parseFloat(cat.limit),
            })),
        };
    
        try {
            const response = await fetch('http://localhost:3001/api/budget-limits', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify(payload),
            });
    
            if (!response.ok) throw new Error('Failed to save budget');
    
            onSetBudget(payload.monthlyLimit, payload.categories);
        } catch (error) {
            console.error('Error saving budget:', error);
        }
    };     

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Set Budget</h2>
                <label>
                    Monthly Limit:
                    <input
                        type="number"
                        value={monthlyLimit}
                        onChange={(e) => setMonthlyLimit(e.target.value)}
                    />
                </label>
                <div>
                    <h3>Sublimits:</h3>
                    {categories.map((category, index) => (
                        <div key={index} className="category-input">
                            <CategoryDropdown
                                selectedCategory={category.name}
                                onChange={(value) => handleCategoryChange(index, 'name', value)}
                                allowCustom={true}
                            />
                            <input
                                type="number"
                                placeholder="Limit"
                                value={category.limit}
                                onChange={(e) =>
                                    handleCategoryChange(index, 'limit', e.target.value)
                                }
                            />
                        </div>
                    ))}
                    <button onClick={handleAddCategory}>Add Category</button>
                </div>
                <button className="button" onClick={handleSubmit}>
                    Save
                </button>
                <button className="button cancel-button" onClick={onClose}>
                    Cancel
                </button>
            </div>
        </div>
    );
}

export default SetBudget;

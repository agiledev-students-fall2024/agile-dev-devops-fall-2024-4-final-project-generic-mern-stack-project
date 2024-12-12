import React, { useState, useEffect } from 'react';

function CategoryManager({
    mode = "dropdown",
    selectedCategory = '',
    onCategorySelect = () => {},
    allowCustom = false,
}) {
    const [categories, setCategories] = useState([]);
    const [customCategory, setCustomCategory] = useState('');

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/categories', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });

                if (!response.ok) {
                    throw new Error(`HTTP Error ${response.status}: ${response.statusText}`);
                }

                const data = await response.json();
                console.log('Fetched categories:', data);
                setCategories(data || []);
            } catch (err) {
                console.error('Error fetching categories:', err.message);
                setCategories([]);
            }
        };

        fetchCategories();
    }, []);

    const handleAddCustomCategory = async () => {
        if (!customCategory.trim()) {
            console.error('Category name cannot be empty.');
            return;
        }

        try {
            const response = await fetch('http://localhost:3001/api/categories', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({ name: customCategory }),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || 'Failed to add category');
            }

            const newCategory = await response.json();
            console.log('Added category:', newCategory);
            setCategories([...categories, newCategory]);
            setCustomCategory('');
            onCategorySelect(newCategory.name);
        } catch (error) {
            console.error('Error adding custom category:', error.message);
        }
    };

    if (mode === "dropdown") {
        return (
            <div className="category-dropdown">
                <select
                    value={selectedCategory}
                    onChange={(e) => onCategorySelect(e.target.value)}
                >
                    <option value="" disabled>
                        -- Select a Category --
                    </option>
                    {categories.map((category) => (
                        <option key={category.name} value={category.name}>
                            {category.name}
                        </option>
                    ))}
                    {allowCustom && <option value="custom">Custom</option>}
                </select>
                {allowCustom && selectedCategory === 'custom' && (
                    <div className="custom-category-input">
                        <input
                            type="text"
                            value={customCategory}
                            onChange={(e) => setCustomCategory(e.target.value)}
                            placeholder="Enter custom category"
                        />
                        <button onClick={handleAddCustomCategory}>Save</button>
                    </div>
                )}
            </div>
        );
    }

    return null;
}

export default CategoryManager;

import React from 'react';
import CategoryManager from './CategoryManager';

function CategoryDropdown({ selectedCategory, onChange, allowCustom }) {
    return (
        <CategoryManager
            mode="dropdown"
            selectedCategory={selectedCategory}
            onCategorySelect={onChange}
            allowCustom={allowCustom}
        />
    );
}

export default CategoryDropdown;

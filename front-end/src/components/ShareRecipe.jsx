import React from 'react'
import { useState } from 'react';
import '../Home.css'

function ShareRecipe({ closeShare, submitShareRecipe }) {

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        ingredients: [''],
        steps: [''],
        duration: 0,
        prep_time: 0,
        cook_time: 0,
        total_time: 0,
        cuisine: '',
        difficulty_level: 1,
        calories_per_serving: 0,
        rating: 0,
        isChallenge: false,
      });
    
      const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        // Parse value as a number for specific fields
        const numericFields = ['duration', 'prep_time', 'cook_time', 'total_time', 'difficulty_level', 'calories_per_serving', 'rating'];
        setFormData({
          ...formData,
          [name]: numericFields.includes(name) ? Number(value) : type === 'checkbox' ? checked : value,
        });
      };
    
      const handleArrayChange = (e, index, field) => {
        const updatedArray = [...formData[field]];
        updatedArray[index] = e.target.value;
        setFormData({ ...formData, [field]: updatedArray });
      };
    
      const addArrayField = (field) => {
        setFormData({ ...formData, [field]: [...formData[field], ''] });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        console.log('form data is:', formData)
        submitShareRecipe(formData)
        // Handle form submission logic (e.g., sending data to an API)
      };
    return (
        <div className="share-full-page-card">
        <button className="share-close-button" onClick={closeShare}>X</button>
        <form className = "share-form" onSubmit={handleSubmit}>
            <h1>Share Your Recipe!</h1>
                <div>
                <label>Recipe Name:</label>
                <input name="name" type="text" value={formData.name} onChange={handleChange} required />
            </div>
            <div>
                <label>Description:</label>
                <textarea name="description" value={formData.description} onChange={handleChange} />
            </div>
            <div>
                <label>Ingredients:</label>
                {formData.ingredients.map((ingredient, index) => (
                <div key={index}>
                    <input
                    type="text"
                    value={ingredient}
                    onChange={(e) => handleArrayChange(e, index, 'ingredients')}
                    required
                    />
                </div>
                ))}
                <button className = "share-button" type="button" onClick={() => addArrayField('ingredients')}>Add Ingredient</button>
            </div>
            <div>
                <label>Steps:</label>
                {formData.steps.map((step, index) => (
                <div key={index}>
                    <textarea
                    value={step}
                    onChange={(e) => handleArrayChange(e, index, 'steps')}
                    required
                    />
                </div>
                ))}
                <button className = "share-button" type="button" onClick={() => addArrayField('steps')}>Add Step</button>
            </div>
            <div>
                <label>Prep Time (minutes):</label>
                <input name="prep_time" type="number" value={formData.prep_time} onChange={handleChange} required />
            </div>
            <div>
                <label>Cook Time (minutes):</label>
                <input name="cook_time" type="number" value={formData.cook_time} onChange={handleChange} required />
            </div>
            <div>
                <label>Total Time (minutes):</label>
                <input name="total_time" type="number" value={formData.total_time} onChange={handleChange} required />
            </div>
            <div>
                <label>Cuisine:</label>
                <select
                    name="cuisine"
                    value={formData.cuisine}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select Cuisine</option> {/* Placeholder option */}
                    <option value="Italian">Italian</option>
                    <option value="Mexican">Mexican</option>
                    <option value="Indian">Indian</option>
                    <option value="Chinese">Chinese</option>
                    <option value="Japanese">Japanese</option>
                    <option value="French">French</option>
                    <option value="Thai">Thai</option>
                    <option value="Mediterranean">Mediterranean</option>
                </select>
            </div>
            <div>
                <label>Difficulty Level:</label>
                <select
                    name="difficulty_level"
                    value={formData.difficulty_level}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select Difficulty</option> {/* Placeholder option */}
                    <option value="1">1 - Very Easy</option>
                    <option value="2">2 - Easy</option>
                    <option value="3">3 - Moderate</option>
                    <option value="4">4 - Hard</option>
                    <option value="5">5 - Very Hard</option>
                </select>
            </div>
            <div>
                <label>Calories Per Serving:</label>
                <input name="calories_per_serving" type="number" value={formData.calories_per_serving} onChange={handleChange} required />
            </div>        
            <button className='share-form-submit-button' type="submit">Submit</button>

        </form>
    </div>
    );
  }
  
  export default ShareRecipe;
  
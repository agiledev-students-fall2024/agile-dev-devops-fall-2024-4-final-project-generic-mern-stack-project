import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function EditProfile() {
  const navigate = useNavigate();

  // Add predefined gender options
  const genderOptions = [
    'Select gender',
    'Male',
    'Female',
    'Non-binary',
    'Other',
    'Prefer not to say'
  ];

  const [formData, setFormData] = useState({
    name: '',
    username: '',
    biography: '',
    gender: 'Select gender'
  });

  const [errors, setErrors] = useState({
    name: '',
    username: '',
    biography: '',
    gender: ''
  });

  const validateField = (name, value) => {
    switch (name) {
      case 'name':
        if (!value.trim()) return 'Name is required';
        if (value.length < 2) return 'Name must be at least 2 characters';
        if (value.length > 50) return 'Name must be less than 50 characters';
        return '';

      case 'username':
        if (!value.trim()) return 'Username is required';
        if (value.length < 3) return 'Username must be at least 3 characters';
        if (value.length > 20) return 'Username must be less than 20 characters';
        if (!/^[a-zA-Z0-9_]+$/.test(value)) return 'Username can only contain letters, numbers, and underscores';
        return '';

      case 'biography':
        if (value.length > 200) return 'Biography must be less than 200 characters';
        return '';

      case 'gender':
        if (value === 'Select gender') return 'Please select a gender option';
        return '';
  
      default:
        return '';
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors = {};
    let hasErrors = false;
    
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) {
        newErrors[key] = error;
        hasErrors = true;
      }
    });

    if (hasErrors) {
      setErrors(newErrors);
      return;
    }

    console.log('Form submitted:', formData);
    navigate('/profile');
  };

  const renderFormField = (key, value) => {
    if (key === 'gender') {
      return (
        <select
          name={key}
          value={value}
          onChange={handleChange}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none
            ${errors[key] ? 'border-red-500' : 'border-gray-200'}`}
        >
          {genderOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      );
    }

    return (
      <input
        type="text"
        name={key}
        value={value}
        onChange={handleChange}
        placeholder={`Enter your ${key}`}
        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none
          ${errors[key] ? 'border-red-500' : 'border-gray-200'}`}
      />
    );
  };

  return (
    <div className="App">
      <div className="pt-16 px-4 min-h-screen bg-white">
        <div className="max-w-md mx-auto">
          <h1 className="text-xl font-bold mb-6">Edit Profile</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="w-32 h-32 mx-auto bg-gray-200 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-300 transition-colors">
              <span className="text-sm text-gray-500 text-center px-2">
                Change Profile Picture
              </span>
            </div>

            {Object.entries(formData).map(([key, value]) => (
              <div key={key} className="space-y-1 text-left">
                <label className="block text-sm font-medium text-gray-700 capitalize">
                  {key}:
                </label>
                {renderFormField(key, value)}
                {errors[key] && (
                  <p className="text-red-500 text-sm mt-1">{errors[key]}</p>
                )}
                {key === 'biography' && (
                  <p className="text-sm text-gray-500 mt-1">
                    {200 - (value?.length || 0)} characters remaining
                  </p>
                )}
              </div>
            ))}

            <button 
              type="submit"
              className="w-full py-3 bg-emerald-800 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors"
            >
              Save Changes
            </button>

            <button 
              type="button"
              onClick={() => navigate('/profile')}
              className="w-full py-3 mt-4 bg-gray-500 text-white rounded-lg font-medium hover:bg-gray-600 transition-colors"
            >
              Return to Profile
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
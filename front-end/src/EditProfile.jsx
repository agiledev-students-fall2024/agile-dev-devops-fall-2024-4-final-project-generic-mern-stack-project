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
    'Prefer not to say',
  ];

  const [formData, setFormData] = useState({
    name: '',
    username: '',
    biography: '',
    gender: 'Select gender',
  });

  const [errors, setErrors] = useState({
    name: '',
    username: '',
    biography: '',
    gender: '',
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
        if (value.length > 20)
          return 'Username must be less than 20 characters';
        if (!/^[a-zA-Z0-9_]+$/.test(value))
          return 'Username can only contain letters, numbers, and underscores';
        return '';

      case 'biography':
        if (value.length > 200)
          return 'Biography must be less than 200 characters';
        return '';

      case 'gender':
        if (value === 'Select gender') return 'Please select a gender option';
        return '';

      default:
        return '';
    }
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));

    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error,
    }));
  };

  const handleSubmit = e => {
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
          className={`w-full rounded-lg border px-4 py-2 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500 ${errors[key] ? 'border-red-500' : 'border-gray-200'}`}
        >
          {genderOptions.map(option => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      );
    }

    return (
      <input
        type='text'
        name={key}
        value={value}
        onChange={handleChange}
        placeholder={`Enter your ${key}`}
        className={`w-full rounded-lg border px-4 py-2 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500 ${errors[key] ? 'border-red-500' : 'border-gray-200'}`}
      />
    );
  };

  return (
    <div className='App'>
      <div className='min-h-screen bg-white px-4 pt-16'>
        <div className='mx-auto max-w-md'>
          <h1 className='mb-6 text-xl font-bold'>Edit Profile</h1>

          <form onSubmit={handleSubmit} className='space-y-6'>
            <div className='mx-auto flex h-32 w-32 cursor-pointer items-center justify-center rounded-lg bg-gray-200 transition-colors hover:bg-gray-300'>
              <span className='px-2 text-center text-sm text-gray-500'>
                Change Profile Picture
              </span>
            </div>

            {Object.entries(formData).map(([key, value]) => (
              <div key={key} className='space-y-1 text-left'>
                <label className='block text-sm font-medium capitalize text-gray-700'>
                  {key}:
                </label>
                {renderFormField(key, value)}
                {errors[key] && (
                  <p className='mt-1 text-sm text-red-500'>{errors[key]}</p>
                )}
                {key === 'biography' && (
                  <p className='mt-1 text-sm text-gray-500'>
                    {200 - (value?.length || 0)} characters remaining
                  </p>
                )}
              </div>
            ))}

            <button
              type='submit'
              className='w-full rounded-lg bg-emerald-800 py-3 font-medium text-white transition-colors hover:bg-emerald-700'
            >
              Save Changes
            </button>

            <button
              type='button'
              onClick={() => navigate('/profile')}
              className='mt-4 w-full rounded-lg bg-gray-500 py-3 font-medium text-white transition-colors hover:bg-gray-600'
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

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function EditProfile() {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    biography: '',
    gender: ''
  });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    navigate('/profile');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
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
                <input
                  type="text"
                  name={key}
                  value={value}
                  onChange={handleChange}
                  placeholder={`Update ${key}`}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>
            ))}

            <button 
              type="submit"
              className="w-full py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors"
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

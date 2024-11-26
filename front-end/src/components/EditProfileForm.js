import React from 'react'
import axios from 'axios'
import { Navigate } from 'react-router-dom'

const apiUrl = process.env.REACT_APP_API_URL;

const EditProfileForm = () => {
    const token = localStorage.getItem('token')
    const [formData, setFormData] = React.useState({
        name: '',
        bio: '',
        layout: '',
        file: null
    })

    const [error, setError] = React.useState(null)
    const [success, setSuccess] = React.useState(null)

    React.useEffect(() => {
        axios
        .get(`${apiUrl}/api/account/edit`, 
            { headers: { Authorization: `Bearer ${token}` }, }
        )
        .then(res => {
            setFormData({
                name: res.data.name,
                bio: res.data.bio ? res.data.bio : '',
                layout: res.data.layout,
                file: null
            })
        })
        .catch(err => {})
    }, [token])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios
                .put(`${apiUrl}/api/account/edit`, 
                    formData,
                    { headers: { Authorization: `Bearer ${token}` }, },
                )
            setError(null)
            setSuccess(response.data.username)
        } catch (error) {
          if (error.response) {
              setError(error.response.data.message)
          } else {
              setError(`Network error: ${error.message}`)
          }
        }
      }

    const layoutChoices = [
        { val: 'list', label: 'List'},
        { val: 'list-title', label: 'List (title only)'},
        { val: 'grid', label: 'Grid (image only)'},
        { val: 'masonry', label: 'Masonry (image only)'},
        { val: 'masonry-title', label: 'Masonry'}
    ]

    if (success) {
        return <Navigate to={`/profile/${success}`} /> 
    }

    return (
        <>
            <div className='text-center'>
                <label htmlFor='fileInput'>Edit picture</label>
                <input
                    name='profileImg'
                    id='fileInput'
                    type='file'
                    accept='image/*'
                    onChange={handleChange}
                />
            </div>
            <form onSubmit={handleSubmit}>
                <div className='grid'>
                    <label htmlFor='name' className='text-base mb-2 font-medium'>Name</label>
                    <input 
                        name='name' 
                        type='text' 
                        onChange={handleChange}
                        value={formData.name}
                        required
                        className='border border-gray-300 rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-gray-400 text-base' />
                </div>

                <div className='grid'>
                    <label htmlFor='layout' className='text-base mb-2 font-medium'>Layout</label>
                    <select
                        id='layout'
                        name='layout'
                        onChange={handleChange}
                        value={formData.layout}
                        className='border border-gray-300 rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-gray-400 text-base'
                    >
                    {layoutChoices.map((choice) => (
                        <option key={choice.val} value={choice.val}>
                            {choice.label}
                        </option>
                    ))}
                    </select>
                </div>

                <div className='grid'>
                    <label htmlFor='bio' className='text-base mb-2 font-medium'>Bio</label>
                    <textarea 
                        name='bio' 
                        onChange={handleChange}
                        value={formData.bio}
                        rows='10'
                        className='border border-gray-300 rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-gray-400 text-base'  />
                </div>

                <div className='grid gap-2'>
                    <button 
                        type='submit'
                        className='bg-gray-900 text-white py-2 px-2 rounded hover:bg-gray-400'
                    >
                        Update
                    </button>
                </div>

                {error && <p className='text-red-500'>{error}</p>}
            </form>
        </>
    )
}

export default EditProfileForm

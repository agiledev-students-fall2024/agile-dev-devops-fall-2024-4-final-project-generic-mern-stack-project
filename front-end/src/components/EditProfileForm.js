import React from 'react'
import userData from '../fillerData/users.json'
import loggedInData from '../fillerData/loggedIn.json'

const EditProfileForm = () => {
    const loggedInUser = loggedInData[0]
    const user = userData.find(user => user.id === loggedInUser.id)

    const [formData, setFormData] = React.useState({
        name: user.name,
        bio: user.bio ? user.bio : '',
        layout: user.layout,
        file: null
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('Form submitted:', formData)
      }

    const layoutChoices = [
    { val: 'list', label: 'List'},
    { val: 'list-title', label: 'List (title only)'},
    { val: 'grid', label: 'Grid (image only)'},
    { val: 'masonry', label: 'Masonry (image only)'},
    { val: 'masonry-title', label: 'Masonry'}]

    return (
        <>
            <div className='text-center'>
                <label htmlFor='fileInput'>Edit picture</label>
                <input
                    type='file'
                    id='fileInput'
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
            </form>
        </>
    )
}

export default EditProfileForm

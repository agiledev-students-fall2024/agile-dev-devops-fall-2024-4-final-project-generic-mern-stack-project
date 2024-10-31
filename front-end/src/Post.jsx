import React, { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Post() {
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState('');
  const fileInputRef = useRef(null);

  const handleImageUpload = e => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = e => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleDragOver = e => {
    e.preventDefault();
  };

  const handleCaptionChange = e => {
    setCaption(e.target.value);
  };

  const handlePostClick = () => {
    console.log('Post clicked. Caption:', caption);
    alert('Post submitted successfully!');
  };

  return (
    <div className='mx-auto max-w-lg p-4'>
      <h1 className='mb-4 text-center text-2xl font-bold'>
        Report an Incident
      </h1>
      <div className='image-uploader'>
        <div
          className={`mb-4 flex h-64 w-full cursor-pointer items-center justify-center rounded border-2 border-dashed ${
            image ? '' : 'bg-gray-100'
          }`}
          onClick={handleImageClick}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          {image ? (
            <img
              src={image}
              alt='Uploaded'
              className='h-full w-full object-cover'
            />
          ) : (
            <p className='text-gray-500'>
              Click or drag and drop to upload an image
            </p>
          )}
        </div>

        <input
          type='file'
          accept='image/*'
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleImageUpload}
        />
      </div>

      <button className='mb-4 w-full rounded border border-gray-300 bg-emerald-800 p-2 hover:bg-gray-600 hover:transition-all'>
        <span className='font-semibold text-white'>
          Recents <FontAwesomeIcon icon='fa-solid fa-caret-down' />
        </span>
      </button>

      <textarea
        className='mb-4 w-full resize-none rounded border border-gray-300 p-2 align-top'
        rows='3'
        placeholder='Write a caption ...'
        value={caption}
        onChange={handleCaptionChange}
      />

      <button
        className='w-full rounded bg-gray-500 py-2 font-semibold text-white hover:bg-gray-700 hover:transition-all'
        onClick={handlePostClick}
      >
        Post
      </button>
    </div>
  );
}

export default Post;

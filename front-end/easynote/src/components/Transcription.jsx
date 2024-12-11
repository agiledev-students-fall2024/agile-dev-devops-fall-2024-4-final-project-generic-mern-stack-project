import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useProfile } from './ProfileContext';

const Transcription = () => {
  const [audioFile, setAudioFile] = useState(null);
  const [transcription, setTranscription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const { user } = useProfile();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setAudioFile(file);
    setError(null);
  };

  const handleTranscribe = async () => {
    if (!audioFile) {
      setError('Please select an audio file');
      return;
    }

    setIsLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('audio', audioFile);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Please log in again');
        return;
      }

      const response = await axios.post(
        `https://easynote-aivlj.ondigitalocean.app/api/transcribe`, 
        formData, 
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
          }
        }
      );

      setTranscription(response.data.transcription);
    } catch (err) {
      setError(err.response?.data?.message || 'Transcription failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveTranscription = () => {
    if (!transcription) {
      alert('No transcription to save');
      return;
    }

    const newNote = {
      id: Date.now(),
      user,
      title: `Transcription - ${audioFile.name}`,
      preview: transcription.slice(0, 150) + '...',
      category: 'Other',
      updatedAt: new Date().toISOString(),
      tags: ['transcription'],
      author: user?._id,
      content: transcription
    };

    // Implement API for Transcription here
    axios.post(
      `https://easynote-aivlj.ondigitalocean.app/api/notes/`, 
      newNote,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      }
    )
    .then(() => {
      navigate('/existing-notes');
    })
    .catch((error) => {
      alert('Failed to save transcription: ' + error.response?.data?.message);
    });
  };

  const handleBackClick = () => {
    navigate('/');
  };

  return (
    <section className="transcription-view">
      <div className="main">
        <div className="controls">
          <button 
            className="back-button" 
            type="button" 
            onClick={handleBackClick}
          >
            ← Back
          </button>
          <h2>Audio Transcription</h2>
        </div>

        <div className="transcription-container">
          <div className="file-input-container">
            <input 
              type="file" 
              accept="audio/*" 
              onChange={handleFileChange}
              ref={fileInputRef}
              className="file-input"
            />
            <button 
              onClick={() => fileInputRef.current.click()}
              className="file-select-button"
            >
              Select Audio File
            </button>
            {audioFile && (
              <span className="file-name">{audioFile.name}</span>
            )}
          </div>

          <button 
            onClick={handleTranscribe} 
            disabled={!audioFile || isLoading}
            className="transcribe-button"
          >
            {isLoading ? 'Transcribing...' : 'Transcribe'}
          </button>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          {transcription && (
            <div className="transcription-result">
              <h3>Transcription:</h3>
              <textarea 
                value={transcription}
                onChange={(e) => setTranscription(e.target.value)}
                className="transcription-textarea"
                readOnly={false}
              />
              <button 
                onClick={handleSaveTranscription}
                className="save-button"
              >
                Save Transcription as Note
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Transcription;
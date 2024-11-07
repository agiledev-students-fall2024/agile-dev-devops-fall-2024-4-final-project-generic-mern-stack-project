import '../index.css';
import axios from '../axiosConfig';
import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Modal from 'react-modal';

Modal.setAppElement('#root');
function Record() {
  const [allRecipes, setAllRecipes] = useState([]);
  const [currRecipe, setCurrRecipe] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [recipeId, setRecipeId] = useState(location.state?.recipeId || null)
  const [error, setError] = useState(null); 

  const [completedSteps, setCompletedSteps] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const buttonRef = useRef(null);
  const handleStepComplete = (index) => {
    setCompletedSteps((prev) =>
      prev.includes(index) 
    ? prev.filter((stepIndex) => stepIndex !== index) // Remove index if it exists
    : [...prev, index] // Add index if it doesn't exist
    );
  };

  const handleRecipeComplete = () => {
    setIsModalOpen(true); 
  };

  const closeModal = () => {
    setCompletedSteps([])
    setCurrRecipe({})
    setRecipeId(null)
    setIsModalOpen(false); 
    
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    
    // Limit the number of files to 1
    if (files.length > 1) {
      alert('You can only upload one file at a time!');
      event.target.value = ''; // Reset the input
      return;
    }

    setSelectedFiles(files);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    console.log(selectedFiles)
    selectedFiles?.forEach(file => {
      formData.append('my_files', file);
    });
  
    try {
      const response = await axios.post('/api/upload-recipe-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      // Log the success message only if upload is successful
      if (response.data.status === 'success') {
        console.log('Upload successful:', response.data);
        setSelectedFiles(null)
        closeModal();
        setError(null);
      } else {
        console.error('Upload failed:', response.data.message);
      }
    } catch (error) {
      setError(`Upload failed - ${error.response?.data?.message}`);
      console.error('Error uploading image:', error);
    }
  };
  useEffect(() => {
    const fetchAllRecipes = async () => {
      try {  //fetch all activities
        const response = await axios.get('/api/record-activity');
        setAllRecipes([...response.data]);
      } catch (error) {
        console.error('Error fetching all recipes', error);
      }
    };
    fetchAllRecipes();
  }, []);

  useEffect(() => {
    if (recipeId) {
      const currentRecipe = allRecipes.find((ele) => ele.id === recipeId);
      if (currentRecipe) {
        setCurrRecipe(currentRecipe);
      } else {
        console.warn(`No recipe found for ID: ${recipeId}`);
      }
    }
  }, [recipeId, allRecipes]);

  useEffect(() => {
    // Check if all steps are completed
    const allStepsCompleted = completedSteps.length === currRecipe.recipe_steps?.step?.length;

    if (allStepsCompleted && buttonRef.current) {
      // Scroll smoothly to the button when all steps are completed
      buttonRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [completedSteps.length, currRecipe.recipe_steps?.step?.length]);

  if (!recipeId) {
    return (
      <div className="no-recipe-container">
        <h2>No Recipe Selected!</h2>
        <p>Please start a recipe from the Recipes or Challenges page to see details here.</p>

        {/* Navigation buttons */}
        <div className="navigation-buttons">
          <button onClick={() => navigate('/recipes')} className="nav-button">
            Go to Recipes
          </button>
          <button onClick={() => navigate('/challenges')} className="nav-button">
            Go to Challenges
          </button>
        </div>

        {/* Tooltip or help text */}
        <p className="help-text">
          <em>Once you start a recipe, it will appear here with steps and ingredients.</em>
        </p>
      </div>
    );
  }

  return (
    <div className="record-container">
      <h1>Current Activity: {currRecipe.recipe_name || 'N/A'}</h1>
      <h2>Description of Activity: {currRecipe.recipe_description || 'N/A'}</h2>

      <h3>Ingredients:</h3>
      <ul className="ingredients-list">
        {currRecipe.ingredients?.item?.map((ingredient, index) => (
          <li key={index}>
            <label>
              <input type="checkbox" className="strikethrough" />{' '}
              <span>{ingredient}</span>
            </label>
          </li>
        ))}
      </ul>

      <h3>Steps:</h3>
      <div className="steps-container">
        {currRecipe.recipe_steps?.step?.map((step, index) => (
          <div key={index} className={`steps-card ${completedSteps.includes(index) ? 'completed' : 'default'}`}>
            <h4>Step {index + 1}</h4>
            <p>{step}</p>
            <button
              className={`steps-button ${completedSteps.includes(index) ? 'completed' : 'default'}`}
              onClick={() => handleStepComplete(index)}
            >
              {completedSteps.includes(index) ? 'Completed' : 'Mark as Completed'}
            </button>
          </div>
        ))}
        <button
          ref={buttonRef}
          className={`finish-activity-button ${completedSteps.length===currRecipe.recipe_steps?.step?.length ? 'finished':'default'}`}
          onClick={handleRecipeComplete}
        >
          Finish Activity
        </button>

        {/* Modal component */}
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          contentLabel="Activity Complete"
          className="modal-content" 
          overlayClassName="modal-overlay"
        >
          <h2>Recipe Completed!</h2>
          <p>Congratulations on finishing this recipe!</p>
          <form onSubmit={handleSubmit}>
            <label>Upload an image of your finished dish!
              <input type='file' name='my_files' accept="image/*" onChange={handleFileChange}></input>
            </label>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <button type='submit' className='upload-image-button'>Upload image</button>
          </form>
          <button onClick={closeModal} className="close-modal-button">
            Close
          </button>
        </Modal>
      </div>
    </div>
  );
}

export default Record;

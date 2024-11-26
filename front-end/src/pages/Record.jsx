import "../index.css";
import axios from "../axiosConfig";
import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Modal from "react-modal";

import IngredientsList from "../components/IngredientsList";
import NoRecipe from "../components/NoRecipes";
import RecipeSteps from "../components/RecipeSteps";
import CompletionModal from "../components/CompletionModal";
import Timer from "../components/Timer.jsx";

Modal.setAppElement("#root");
function Record() {
  const location = useLocation();
  const [currRecipe, setCurrRecipe] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const [completedSteps, setCompletedSteps] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);

  const buttonRef = useRef(null);
  const handleStepComplete = (index) => {
    setCompletedSteps((prev) => {
      const updatedSteps = prev.includes(index)
        ? prev.filter((stepIndex) => stepIndex !== index)
        : [...prev, index];

      // Save updated steps to localStorage
      localStorage.setItem("completedSteps", JSON.stringify(updatedSteps));
      return updatedSteps;
    });
  };
  const handleIngredientSelect = (index) => {
    setSelectedIngredients((prev) => {
      const updatedIngredients = prev.includes(index)
        ? prev.filter((ingredientIndex) => ingredientIndex !== index)
        : [...prev, index];

      // Save updated selected ingredients to localStorage
      localStorage.setItem(
        "selectedIngredients",
        JSON.stringify(updatedIngredients)
      );
      return updatedIngredients;
    });
  };

  const handleRecipeComplete = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setCompletedSteps([]);
    setCurrRecipe(null);
    localStorage.removeItem("currentRecipe");
    localStorage.removeItem("completedSteps");
    localStorage.removeItem("selectedIngredients");

    setIsModalOpen(false);
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);

    // Limit the number of files to 1
    if (files.length > 1) {
      alert("You can only upload one file at a time!");
      event.target.value = ""; // Reset the input
      return;
    }

    setSelectedFiles(files);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    console.log(selectedFiles);
    selectedFiles?.forEach((file) => {
      formData.append("my_files", file);
    });

    try {
      const response = await axios.post("/api/upload-recipe-image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Log the success message only if upload is successful
      if (response.data.status === "success") {
        console.log("Upload successful:", response.data);
        setSelectedFiles(null);
        closeModal();
        setError(null);
      } else {
        console.error("Upload failed:", response.data.message);
      }
    } catch (error) {
      setError(`Upload failed - ${error.response?.data?.message}`);
      console.error("Error uploading image:", error);
    }
  };

  useEffect(() => {
    const cachedRecipe = JSON.parse(localStorage.getItem("currentRecipe"));
    if (cachedRecipe) {
      setCurrRecipe(cachedRecipe);
      console.log('set cached recipe as current', cachedRecipe);
    } else if (location.state?.selectedRecipe) {
      setCurrRecipe(location.state.selectedRecipe);
      console.log('set recipe from location state', location.state.selectedRecipe);
    }
  }, [location.state?.selectedRecipe]);

  useEffect(() => {
    if (currRecipe) {
      localStorage.setItem("currentRecipe", JSON.stringify(currRecipe));
      console.log('put into local storage', currRecipe);
    }
  }, [currRecipe]); 

  useEffect(() => {
    const savedCompletedSteps = JSON.parse(
      localStorage.getItem("completedSteps")
    );
    if (savedCompletedSteps) {
      setCompletedSteps(savedCompletedSteps);
    }
  }, []);

  useEffect(() => {
    const savedSelectedIngredients = JSON.parse(
      localStorage.getItem("selectedIngredients")
    );
    if (savedSelectedIngredients) {
      setSelectedIngredients(savedSelectedIngredients);
    }
  }, []);

  useEffect(() => {
    // Check if all steps are completed
    if (!currRecipe) {
      console.log("Recipe is not available yet");
      return; // Exit early if currRecipe is null or undefined
    }
    const allStepsCompleted =
      completedSteps.length === currRecipe.steps?.length;

    if (allStepsCompleted && buttonRef.current) {
      buttonRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [completedSteps.length, currRecipe?.steps?.length, currRecipe]);

  if (!currRecipe) {
    return <NoRecipe navigate={navigate} />;
  }

  return (
    <div className="record-container">
      <h1> {currRecipe.dish || "N/A"}</h1>
      <hr></hr>
      <Timer duration={currRecipe.duration || 240} />
      
      <IngredientsList
        ingredients={currRecipe.ingredients}
        selectedIngredients={selectedIngredients}
        handleIngredientSelect={handleIngredientSelect}
      />
      <RecipeSteps
        steps={currRecipe.steps}
        completedSteps={completedSteps}
        onStepComplete={handleStepComplete}
        buttonRef={buttonRef}
        onComplete={handleRecipeComplete}
      />

      <button onClick={closeModal}>Quit Recipe</button>
      
      <CompletionModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        onFileChange={handleFileChange}
        onSubmit={handleSubmit}
        error={error}
      />
    </div>
  );
}

export default Record;

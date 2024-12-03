import React, { useState } from "react";
import axios from "axios";
const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setMessage("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("my_file", selectedFile);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACK_PORT}/api/upload-recipe-image`,
        formData, // `formData` should be the body for POST requests
        {
          headers: {
            "Content-Type": "multipart/form-data", // Ensure proper content type for file uploads
          },
        }
      );

      if (response.status === 200) {
        setMessage(`Upload successful! File: ${response.data.file.filename}`);
      } else {
        setMessage(`Error: ${response.data.message || "File upload failed"}`);
      }
    } catch (error) {
      console.error("Error during file upload:", error);
      setMessage("An error occurred during the upload.");
    }
  };

  return (
    <div>
      <h1>Upload Recipe Image</h1>
      <input type="file" onChange={handleFileChange} accept="image/*" />
      <button onClick={handleUpload}>Upload</button>
      <p>{message}</p>
    </div>
  );
};

export default FileUpload;

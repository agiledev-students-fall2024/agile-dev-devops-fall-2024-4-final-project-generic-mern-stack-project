import React, { useState } from "react";
import InputField from "../components/InputField";
import SubmitButton from "../components/SubmitButton";
import toast from "react-hot-toast";
import { axiosInstance } from "../axios";

const CreateCommunity = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [communityPicture, setCommunityPicture] = useState("");

  function handleCreateCommunity(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("file", communityPicture);

    axiosInstance
      .post("/create-community", formData)
      .then((response) => {
        console.log("New community:", response.data)
        toast.success("Community created successfully!");
      })
      .catch((err) => {
        toast.error("Failed to create community.");
      })
  }

  function handlePictureUpload(e) {
    const file = e.target.files[0];
    if (file == undefined){
      toast.error("Failed to upload picture.")
    }
    else{
      setCommunityPicture(file);
      toast.success("Picture uploaded successfully!");
    }
  }

  return (
    <div className="w-[40%] flex flex-col justify-center items-center gap-4 p-8 m-[auto]">
      <h1 className="text-xl text-ebony-700 text-center font-bold">
        Create Community
      </h1>
      <InputField
        inputfieldName="Name"
        handleChange={(e) => setName(e.target.value)}
        inputValue={name}
      ></InputField>
      <InputField
        inputfieldName="Description"
        handleChange={(e) => setDescription(e.target.value)}
        inputValue={description}
      ></InputField>
      <div className="flex flex-col gap-1 w-full">
        <label className="text-sm text-ebony-700 font-bold">
          Upload a picture for your community:
        </label>
        <input type="file" onChange={handlePictureUpload} />
      </div>

      <SubmitButton
        placeholder="Create"
        handleClick={handleCreateCommunity}
      ></SubmitButton>
    </div>
  );
};

export default CreateCommunity;

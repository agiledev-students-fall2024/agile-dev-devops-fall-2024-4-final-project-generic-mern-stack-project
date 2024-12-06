import axios from "axios";
import React,{useState} from 'react';

const handleDelete = async (noteId, setNotes) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this note? This action cannot be undone."
    );

    if (isConfirmed) {
      try {
        // Remove the note from the database
        const token = localStorage.getItem("token");  // Make sure user is authenticated
        if (!token) {
          alert("Please log in again.");
          return;
        }

        await axios.delete(
          `http://localhost:${process.env.EXPRESS_SERVER_PORT || 5000}/api/notes/${noteId}`,
          {
            headers: {
              "Authorization": `Bearer ${token}`,
            },
          }
        );

        // After successful deletion, remove the note from the state
        setNotes(prevNotes => prevNotes.filter(note => note.id !== noteId));

        alert("Note deleted successfully.");
        // return response.data;
      } catch (error) {
        console.error("Error deleting note:", error);
        alert("Failed to delete the note.");
      }
    }
  };

  describe("handleDelete", () => {
    let mockNoteId;
    let mockNotes;
    let setNotes;

    beforeEach(() => {
      jest.spyOn(Storage.prototype, "getItem").mockImplementation((key) => {
        if (key === "token") {
          return "mocked-token"; 
        }
        return null;
      });
    });

    axios.delete = jest.fn();
    setNotes = jest.fn();
    global.alert = jest.fn();
    global.confirm = jest.fn().mockReturnValue(true);

    mockNoteId = "123"; 
    mockNotes = {
      _id: mockNoteId,
      title: "Testing",
      content: "<p><br></p><p>asdfasdfasdf</p>",
      updatedAt: "2024-11-30T20:55:18.776Z",
      tags: ["Test"],
      category: "Other",
      createdAt: "2024-11-30T20:55:18.790Z",
      attachments: [],
    };


  afterEach(() => {
    jest.restoreAllMocks();
  });
    
  
  it("should delete data successfully", async () => {
    axios.delete.mockResolvedValueOnce(); // Mocking a 204 No Content response
  
    await handleDelete(mockNoteId, setNotes);
  
    expect(axios.delete).toHaveBeenCalledWith(
      `https://easynote-aivlj.ondigitalocean.app/api/notes/${mockNoteId}`,
      {
        headers: {
          Authorization: `Bearer mocked-token`,
        },
      }
    );
    expect(setNotes).toHaveBeenCalledWith(expect.any(Function));
    expect(global.alert).toHaveBeenCalledWith("Note deleted successfully.");
  });
  
});

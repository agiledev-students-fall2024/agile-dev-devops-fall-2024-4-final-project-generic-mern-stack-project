import axios from "axios";
import { useNavigate } from "react-router-dom";

jest.mock("axios", () => ({
  put: jest.fn(),
}));

jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));
jest.mock("quill", () => {
  return jest.fn().mockImplementation(() => {
    return { root: { innerHTML: "<p>Some content</p>" } };
  });
});

export async function handleSave(
  e,
  title,
  category,
  quillRef,
  note,
  user,
  tags,
  navigate
) {
  e.preventDefault();

  if (!title || !category || !quillRef.current) {
    alert("Please fill in all required fields (title, category, and content)");
    return;
  }

  const updatedContent = quillRef.current.root.innerHTML;
  const preview = quillRef.current.getText().slice(0, 150) + "...";

  const updatedNote = {
    id: note.id, // Existing note's ID
    user,
    title,
    preview,
    category,
    updatedAt: new Date().toISOString(),
    tags: tags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag),
    author: user?._id,
    content: updatedContent,
  };

  try {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please log in again.");
      return;
    }

    await axios.put(
      `http://localhost:${process.env.EXPRESS_SERVER_PORT || 5000}/api/notes/${
        note.id
      }`,
      updatedNote,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("Note updated successfully.");
    navigate(`/view-note/${note.id}`);
  } catch (error) {
    console.error("Error updating note:", error);
    alert("Failed to update the note.");
  }
}

describe("handleSave", () => {
  let mockNavigate;
  let mockToken;
  let quillRef;
  let setTitle;
  let setCategory;
  let setTags;
  let note;
  let user;

  beforeEach(() => {
    mockNavigate = jest.fn();
    global.alert = jest.fn();
    useNavigate.mockReturnValue(mockNavigate);

    quillRef = {
      current: {
        root: { innerHTML: "<p>Some content</p>" },
        getText: jest.fn(() => "Some content"),
      },
    };

    setTitle = "Test Title";
    setCategory = "Test Category";
    setTags = "tag1, tag2";
    note = { id: "123" };
    user = { _id: "user1" };

    jest.spyOn(Storage.prototype, "getItem").mockImplementation((key) => {
      if (key === "token") {
        return "mocked-token";
      }
      return null;
    });
  });

  it("should update note successfully and navigate to the updated note", async () => {
    axios.put.mockResolvedValue({ data: { success: true } });

    const event = { preventDefault: jest.fn() };
    await handleSave(event, setTitle, setCategory, quillRef, note, user, setTags, mockNavigate);

    expect(axios.put).toHaveBeenCalledWith(
      `http://localhost:5000/api/notes/${note.id}`,
      {
        id: note.id,
        user,
        title: setTitle,
        preview: "Some content...",
        category: setCategory,
        updatedAt: expect.any(String),
        tags: ["tag1", "tag2"],
        author: user._id,
        content: "<p>Some content</p>",
      },
      {
        headers: { Authorization: `Bearer mocked-token` },
      }
    );
    expect(mockNavigate).toHaveBeenCalledWith(`/view-note/${note.id}`);
    expect(global.alert).toHaveBeenCalledWith("Note updated successfully.");
  });

});

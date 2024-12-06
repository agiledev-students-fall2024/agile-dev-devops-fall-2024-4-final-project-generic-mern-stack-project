import axios from "axios";
jest.mock("axios");

export async function triggerAPI(notes) {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please log in again");
      return;
    }

    const res = await axios.post(
      `http://localhost:${process.env.EXPRESS_SERVER_PORT || 5000}/api/notes/`,
      notes,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("Note saved successfully", res);
    return res.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      error.response?.message ||
      "Unknown error";
    alert(`Failed to save note: ${errorMessage}`);
    console.error("Error occurred:", error);
    throw error; // Re-throw for tests to catch
  }
}

describe("triggerAPI", () => {
  beforeEach(() => {
    jest.spyOn(Storage.prototype, "getItem").mockImplementation((key) => {
      if (key === "token") {
        return "mocked-token"; 
      }
      return null;
    });
  });
  
  afterEach(() => {
    jest.restoreAllMocks();
  });
  

  it("should post data successfully", async () => {
    const mockData = { message: "Note saved successfully" };
    axios.post.mockResolvedValueOnce({ data: mockData });

    const notes = {
      title: "Testing",
      content: "<p><br></p><p>asdfasdfasdf</p>",
      updatedAt: "2024-11-30T20:55:18.776Z",
      tags: ["Test"],
      category: "Other",
      // _id: new ObjectId("674b7bb6c6dd1fdc1ef6a1af"),
      createdAt: "2024-11-30T20:55:18.790Z",
      attachments: [],
    };
    const result = await triggerAPI(notes);
    // console.log(result)

    expect(result).toEqual(mockData);
    expect(axios.post).toHaveBeenCalledWith(
      `https://easynote-aivlj.ondigitalocean.app/api/notes/`,
      notes,
      expect.objectContaining({
        headers: {
          "Content-Type": "application/json",
          Authorization: expect.stringContaining(`Bearer mocked-token`),
        },
      })
    );
  });
});

import multer from "multer";
import express from "express";
import path from "path";

//handles creaing a new community and uploading a picture 
const router = express.Router();

// enable file uploads saved to disk in a directory named 'public/uploads'
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/community");
  },
  filename: function (req, file, cb) {
    // take apart the uploaded file's name so we can create a new one based on it
    const extension = path.extname(file.originalname);
    const basenameWithoutExtension = path.basename(
      file.originalname,
      extension
    );

    // create a new filename with a timestamp in the middle
    const newName = `${basenameWithoutExtension}-${Date.now()}${Math.random()}${extension}`;
    // tell multer to use this new filename for the uploaded file
    cb(null, newName);
  },
});

const upload = multer({ storage: storage });

//route for HTTP POST requests for /api/create-community (includes file upload)
router.post("/api/create-community", upload.single("file"), async (req, res) => {
    const {name, description}  = req.body;
    const picture = req.file ? req.file.path : undefined;
    console.log(name, description, picture);

    if (!name || !description || !picture){
        res.status(500).json({
            message: "missing name, description, or file field on form"
        })
    }
    else{
        const data = {
            status: "all good",
            name: name,
            description: description,
            picturePath: picture,
        };

        res.status(200).json(data);
    }
})

export default router;
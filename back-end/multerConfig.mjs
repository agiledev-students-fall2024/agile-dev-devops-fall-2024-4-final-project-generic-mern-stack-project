import multer from "multer";
import { extname } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

// File URL and directory helpers
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Define storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `${__dirname}/back-end/public/uploads`); // Save files to the 'uploads' directory
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${extname(file.originalname)}`); // Unique file name
  },
});

// File filter for validation
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Unsupported file type"), false);
  }
};

export const upload = multer({ storage, fileFilter });

import express from "express";
import { uploadFile, getFiles } from "../controllers/fileController.js";
import multer from "multer";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "backend/uploads"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});

const upload = multer({ storage });

router.post("/upload", upload.single("file"), uploadFile);
router.get("/", getFiles);

export default router;

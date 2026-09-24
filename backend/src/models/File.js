import mongoose from "mongoose";

const FileSchema = new mongoose.Schema({
  filename: String,
  storedName: String, // nom physique sur disque
  uploader: String,
  uploadedAt: { type: Date, default: Date.now },
  size: Number,
  mimetype: String,
});

export default mongoose.model("File", FileSchema);

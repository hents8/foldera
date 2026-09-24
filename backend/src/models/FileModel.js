import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
  name: String,
  path: String,
  type: { type: String, enum: ["file", "directory"] },
  size: Number,
  modified: Date,
});

export default mongoose.model("FileItem", fileSchema);

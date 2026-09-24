import File from "../models/File.js";

export const uploadFile = async (req, res) => {
  try {
    const newFile = new File({
      name: req.file.filename,
      path: req.file.path,
      size: req.file.size,
    });
    await newFile.save();
    res.json(newFile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getFiles = async (req, res) => {
  try {
    const files = await File.find().sort({ createdAt: -1 });
    res.json(files);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

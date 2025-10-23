import multer from "multer";

// Memory storage: keeps the file in RAM
const storage = multer.memoryStorage(); 

const upload = multer({ storage });

export default upload;

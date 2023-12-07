import multer, { diskStorage } from "multer";
import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const storage = diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../uploads"));
      },
      filename: (req, file, cb) => {
        cb(null, new Date().getTime() + file.originalname);
      },
})

const upload = multer({ storage });

export default upload;

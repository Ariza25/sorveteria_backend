import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    const baseUrl = process.env.BASE_URL || 'http://localhost:3333/uploads';
    const uniqueSuffix = Date.now() + path.extname(file.originalname);
    const filename = path.join(baseUrl, uniqueSuffix);
    cb(null, filename);
    cb(null, uniqueSuffix);
  }
})

const upload = multer({ storage: storage }).array('images');

export default upload;
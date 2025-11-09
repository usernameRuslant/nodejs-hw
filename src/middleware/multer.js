import multer from 'multer';
import createHttpError from 'http-errors';

const storage = multer.memoryStorage();
const limits = {
  fileSize: 1024 * 1024 * 2,
};
const fileFilter = (req, file, cb) => {
  if (!file.mimetype.startsWith('image/')) {
    return cb(createHttpError(400, 'Only images allowed'));
  }
  cb(null, true);
};

const upload = multer({
  storage,
  limits,
  fileFilter,
});

export default upload;

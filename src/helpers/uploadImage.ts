import multer from 'multer';
import path from 'path';

const imageStorage = multer.diskStorage({
  // Destination to store image
  destination: path.join(__dirname, '../public'), // Use an absolute path
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname));
    // file.fieldname is the name of the field (image)
    // path.extname gets the uploaded file extension
  }
});

const ImageUpload = multer({
  storage: imageStorage,
  limits: {
    fileSize: 10000000, // 1000000 Bytes = 1 MB
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
      // upload only png and jpg format
      return cb(new Error('Please upload an image with a valid format (png or jpg).'));
    }
    cb(null, true);
  },
});

export default ImageUpload;

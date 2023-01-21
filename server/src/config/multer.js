const multer = require('multer');

// notes.....
// public===>اسم الفولدر
// image===>اسم البراميتر
// upload===> اسم الميدل وير

// Multer Configurations
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './public');
    },
    filename: (req, file, cb) => {
      const fileName = `${Date.now()}_${file.originalname.replace(/\s+/g, '-')}`;
      cb(null, fileName);
    },
});
const upload = multer({ storage }).single('image');



exports.upload=upload;
  
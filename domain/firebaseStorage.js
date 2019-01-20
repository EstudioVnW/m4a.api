const firebase = require('firebase');
const { Storage } = require('@google-cloud/storage');
const fs = require('fs')
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + file.originalname);
  }
});
/*
const upload = multer({ storage : storage }).array('userPhoto',2);
*/

const imageFilter = function (req, file, cb) {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      return cb(new Error('Only image files are allowed!'), false);
  }
  cb(null, true);
};

const handleImage = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 10000
  },
  fileFilter: imageFilter
});

const cleanFolder = (file) => {
  fs.unlink(file, (err) => {
    if (err) throw err;
  });
}

const createPublicFileURL = (storageName) => {
  return `http://storage.googleapis.com/${bucketName}/${encodeURIComponent(storageName)}`;
}

const projectId = config.projectId
const bucketName = `${projectId}.appspot.com`;
const keyFilename='./infra/firebase-adminsdk.json';

const firebaseStorage = new Storage({
  projectId: projectId,
  keyFilename: keyFilename
});

const bucket = firebaseStorage.bucket(bucketName);

const sendAvatar = async (file) => {
  try {
    const storageFile = await bucket.upload(file.path, {
      destination: `user-avatar/${file.filename}`,
      public: true,
    })
    if (storageFile) {
      cleanFolder(file.path)
      return createPublicFileURL(file.path)
    }
    cleanFolder(file.path)
    throw err
  }
  catch (err) {
    console.error('ERROR:', err);
    cleanFolder(file.path)
    throw err;
  }
}

module.exports = { sendAvatar, handleImage };
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

const cleanFiles = (file) => {
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

const uploadAvatar = async (file) => {
  try {
    const storageFile = await bucket.upload(file.path, {
      destination: `user-avatar/${file.filename}`,
      public: true,
    })
    if (storageFile) {
      cleanFiles(file.path)
      return createPublicFileURL(file.path)
    }
  }
  catch (err) {
    console.error('ERROR:', err);
    cleanFiles(file.path)
    throw err;
  }
}

module.exports = { uploadAvatar };
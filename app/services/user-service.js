'use strict';
const { User, Match, Initiative, UsersInterests } = require('../../domain/entities');
const Json = require('../responses/users');
const multer = require('multer');
const firebase = require('firebase');
const {Storage} = require('@google-cloud/storage');
const fs = require('fs')
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../../config/config.js')[env];

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + file.originalname);
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 10000
  }
});

const cleanFiles = (file) => {
  fs.unlink(file, (err) => {
    if (err) throw err;
    console.log('clean successfully:)');
  });
}

const createPublicFileURL = (storageName) => `http://storage.googleapis.com/${bucketName}/${encodeURIComponent(storageName)}`;

const projectId = config.projectId
const bucketName = `${projectId}.appspot.com`;
const keyFilename='./config/firebase-adminsdk.json';

// Creates a client
const firebaseStorage = new Storage({
  projectId: projectId,
  keyFilename: keyFilename
});

const bucket = firebaseStorage.bucket(bucketName);

module.exports = class Users {
  constructor(router) {
    this.router = router;
  }

  expose() {
    this.findUsersList();
    this.createUser();
    this.findUser();
    this.updateUser();
    this.deleteUser();
    this.uploadAvatar();
  }

  uploadAvatar() {
    this.router.post("/users/uploadAvatar", upload.single('avatar'), async (req, res) => {
      try {
        bucket.upload(req.file.path, {
          destination: `user-avatar/${req.file.filename}`,
          public: true,
        }, (err, file) => {
          if (err) {
            console.log(err);
            cleanFiles(req.file.path)
            return;
          }
          cleanFiles(req.file.path)
          res.status(200).json({message: createPublicFileURL(req.file.path)})
        });
      }
      catch (err) {
        cleanFiles(req.file.path)
        res.status(500).json({message: 'something is broken', err: err})
      }
    });
  }

  findUsersList() {
    this.router.get('/users', async (req, res) => {
      try {
        const { include } = req.query;
        if (include === 'users-interests') {
          return res.status(200).json({
              data: await User.findAll({
              include: [UsersInterests]
            })
          })
        }
        res.status(200).json({
          data: await User.findAll().map(user => Json.format(user))
        })
      }
      catch (err) {
        res.status(500).json(err)
      }
    });
  }

  createUser() {
    this.router.post('/users', async (req, res) => {
      try {
        res.status(200).json({
          data: await User.create(
            req.body, { include: [UsersInterests] }
          )
        })
      }
      catch (err) {
        res.status(500).json(err)
      }
    });
  }

  findUser() {
    this.router.get('/users/:email', async (req, res) => {
      try {
        const { include } = req.query;
        if (include === 'initiatives') {
          const user = await User.findOne({
            where: { email: req.params.email },
            include: [Initiative]
          })
          if (user) {
            return res.status(200).json({data: user});
          }
        }

        const user = await User.findOne({
          where: { email: req.params.email },
        })

        if (user) {
          return res.status(200).json({ data: Json.format(user) });
        }

        return res.status(404).json({ message: 'Didn’t find anything here!' });
      }
      catch (err) {
        res.status(500).json(err)
      }
    });
  }

  updateUser() {
    this.router.put('/users/:userId', async (req, res) => {
      try {
        if (await User.findOne({ where: { id: req.params.userId } })) {
          if (await User.update(req.body, { where: { id: req.params.userId } })) {
            return res.status(201).json({ message: 'User has been updated.'});
          }
        }
        return res.status(404).json({ message: 'Didn’t find anything here!' });
      }
      catch (err) {
        return res.status(500).json(err);
      }
    });
  }

  deleteUser() {
    this.router.delete('/users/:userId', async (req, res) => {
      try {
        if (await User.findOne({ where: { id: req.params.userId } })) {
          if (await User.destroy({ where: { id: req.params.userId } })) {
            return res.status(201).json({ message: 'User has been deleted.'});
          }
        }
        return res.status(404).json({ message: 'Didn’t find anything here!' });
      }
      catch (err){
        res.status(500).json(err);
      }
    });
  }

};
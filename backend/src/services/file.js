const formidable = require('formidable');
const fs = require('fs');
const config = require('../config');
const path = require('path');
const { format } = require('util');

const ensureDirectoryExistence = (filePath) => {
  var dirname = path.dirname(filePath);

  if (fs.existsSync(dirname)) {
    return true;
  }

  ensureDirectoryExistence(dirname);
  fs.mkdirSync(dirname);
};

const uploadLocal = (
  folder,
  validations = {
    entity: null,
    maxFileSize: null,
    folderIncludesAuthenticationUid: false,
  },
) => {
  return (req, res) => {
    if (!req.currentUser) {
      res.sendStatus(403);
      return;
    }

    if (validations.entity) {
      res.sendStatus(403);
      return;
    }

    if (validations.folderIncludesAuthenticationUid) {
      folder = folder.replace(':userId', req.currentUser.authenticationUid);
      if (
        !req.currentUser.authenticationUid ||
        !folder.includes(req.currentUser.authenticationUid)
      ) {
        res.sendStatus(403);
        return;
      }
    }

    const form = new formidable.IncomingForm();
    form.uploadDir = config.uploadDir;

    if (validations && validations.maxFileSize) {
      form.maxFileSize = validations.maxFileSize;
    }

    form.parse(req, function (err, fields, files) {
      const filename = String(fields.filename);
      const fileTempUrl = files.file.path;

      if (!filename) {
        fs.unlinkSync(fileTempUrl);
        res.sendStatus(500);
        return;
      }

      const privateUrl = path.join(form.uploadDir, folder, filename);
      ensureDirectoryExistence(privateUrl);
      fs.renameSync(fileTempUrl, privateUrl);
      res.sendStatus(200);
    });

    form.on('error', function (err) {
      res.status(500).send(err);
    });
  };
};

const downloadLocal = async (req, res) => {
  const privateUrl = req.query.privateUrl;
  if (!privateUrl) {
    return res.sendStatus(404);
  }
  res.download(path.join(config.uploadDir, privateUrl));
};

const initGCloud = () => {
  const processFile = require('../middlewares/upload');
  const { Storage } = require('@google-cloud/storage');

  const crypto = require('crypto');
  const hash = config.gcloud.hash;

  const privateKey = process.env.GC_PRIVATE_KEY.replace(/\\\n/g, '\n');

  const storage = new Storage({
    projectId: process.env.GC_PROJECT_ID,
    credentials: {
      client_email: process.env.GC_CLIENT_EMAIL,
      private_key: privateKey,
    },
  });

  const bucket = storage.bucket(config.gcloud.bucket);
  return { hash, bucket, processFile };
};

const uploadGCloud = async (folder, req, res) => {
  try {
    const { hash, bucket, processFile } = initGCloud();
    await processFile(req, res);
    let buffer = await req.file.buffer;
    let filename = await req.body.filename;

    if (!req.file) {
      return res.status(400).send({ message: 'Please upload a file!' });
    }

    let path = `${hash}/${folder}/${filename}`;
    let blob = bucket.file(path);

    console.log(path);

    const blobStream = blob.createWriteStream({
      resumable: false,
    });

    blobStream.on('error', (err) => {
      console.log('Upload error');
      console.log(err.message);
      res.status(500).send({ message: err.message });
    });

    console.log(`https://storage.googleapis.com/${bucket.name}/${blob.name}`);

    blobStream.on('finish', async (data) => {
      const publicUrl = format(
        `https://storage.googleapis.com/${bucket.name}/${blob.name}`,
      );

      res.status(200).send({
        message: 'Uploaded the file successfully: ' + path,
        url: publicUrl,
      });
    });

    blobStream.end(buffer);
  } catch (err) {
    console.log(err);

    res.status(500).send({
      message: `Could not upload the file. ${err}`,
    });
  }
};

const downloadGCloud = async (req, res) => {
  try {
    const { hash, bucket, processFile } = initGCloud();

    const privateUrl = await req.query.privateUrl;
    const filePath = `${hash}/${privateUrl}`;
    const file = bucket.file(filePath);
    const fileExists = await file.exists();

    if (fileExists[0]) {
      const stream = file.createReadStream();
      stream.pipe(res);
    } else {
      res.status(404).send({
        message: 'Could not download the file. ' + err,
      });
    }
  } catch (err) {
    res.status(404).send({
      message: 'Could not download the file. ' + err,
    });
  }
};

const deleteGCloud = async (privateUrl) => {
  try {
    const { hash, bucket, processFile } = initGCloud();
    const filePath = `${hash}/${privateUrl}`;

    const file = bucket.file(filePath);
    const fileExists = await file.exists();

    if (fileExists[0]) {
      file.delete();
    }
  } catch (err) {
    console.log(`Cannot find the file ${privateUrl}`);
  }
};

module.exports = {
  initGCloud,
  uploadLocal,
  downloadLocal,
  deleteGCloud,
  uploadGCloud,
  downloadGCloud,
};

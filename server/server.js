const express = require('express')
const multer = require('multer')
const path = require('path')
const db = require('./db/photos')

const server = express()

server.use(express.json())
server.use(express.static(path.join(__dirname, 'public')))

const memStorage = multer.memoryStorage({
  destination: function (req, file, callback) {
    callback(null, '')
  },
})
const upload = multer({
  storage: memStorage,
})

server.post('/:name', upload.single('photo'), async (req, res) => {
  const photo = {
    name: req.params.name,
    mimetype: req.file.mimetype,
    image: req.file.buffer,
  }
  try {
    await db.addPhoto(photo)
    res.sendStatus(201)
  } catch (error) {
    console.error(error)
  }
})

server.get('/:name', (req, res) => {
  const photoName = req.params.name
  db.getPhotoByName(photoName)
    .then((photos) => {
      res.json(
        photos.map((photo) => ({
          id: photo.id,
          name: photo.name,
          mimetype: photo.mimetype,
          image: photo.image.toString('base64'),
        }))
      )
    })
    .catch(console.error)
})

module.exports = server

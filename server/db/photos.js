const connection = require('./connection')

const addPhoto = (photoName, buffer, db = connection) => {
  return db('photos').insert({ name: photoName, image: buffer })
}

const getPhotoByName = (name, db = connection) => {
  return db('photos').where('name', name).select('image')
}

module.exports = {
  addPhoto,
  getPhotoByName,
}

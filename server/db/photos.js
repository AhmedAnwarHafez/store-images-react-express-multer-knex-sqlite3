const connection = require('./connection')

const addPhoto = (photo, db = connection) => {
  const { name, mimetype, image } = photo
  return db('photos').insert({ name, mimetype, image })
}

const getPhotoByName = (name, db = connection) => {
  return db('photos').where('name', name).select('image', 'mimetype')
}

module.exports = {
  addPhoto,
  getPhotoByName,
}

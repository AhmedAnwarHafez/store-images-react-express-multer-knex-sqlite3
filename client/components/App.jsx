import React, { useState } from 'react'
import request from 'superagent'
// .set('Content-Type', 'multipart/form-data')

function App() {
  const [uploadImage, setUploadImage] = useState([])
  const [photos, setPhotos] = useState([])
  const [photoName, setPhotoName] = useState('')

  function onChange(event) {
    setUploadImage(event.target.files[0])
  }

  function handleNameChange(event) {
    setPhotoName(event.target.value)
  }

  function onSubmit() {
    const formData = new FormData()
    formData.append('photo', uploadImage)

    return request
      .post(`/${photoName}`)
      .send(formData)
      .then(() => {})
  }

  function onload() {
    request
      .get(`/${photoName}`)
      .then((res) => {
        setPhotos(res.body)
      })
      .catch(console.error)
  }

  return (
    <>
      <input
        id="uploadFile"
        type="file"
        name="photo"
        onChange={onChange}
        encType="multipart/form-data"
      />
      <input
        type="text"
        name="name"
        onChange={handleNameChange}
        value={photoName}
      />
      <button onClick={onSubmit}>Submit</button>
      <button onClick={onload}>load</button>

      {photos.map((photo) => (
        <img
          key={photo.id}
          src={`data:image/png;base64,${photo.image}`}
          alt={photo.name}
        />
      ))}
    </>
  )
}

export default App

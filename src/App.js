// src/App.js
import React, { useState } from 'react';

import imageData from './data';
import './App.css';

const AddImageForm = ({ onAddImage }) => {
  const [newImage, setNewImage] = useState({ title: '', file: null });

  const handleInputChange = (e) => {
    setNewImage({ ...newImage, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setNewImage({ ...newImage, file: e.target.files[0] });
  };

  const handleAddImage = async () => {
    // Vous pouvez effectuer ici une logique d'envoi de fichier vers le serveur, si nécessaire
    // Par exemple, utilisez la bibliothèque `axios` pour effectuer une requête POST vers votre backend

    // Enregistrez l'image dans le tableau d'images local
    onAddImage({ id: imageData.length + 1, title: newImage.title, filename: newImage.file.name });
    setNewImage({ title: '', file: null });
  };

  return (
    <div className="add-form">
      <h2>Ajouter une nouvelle image</h2>
      <input
        type="text"
        name="title"
        placeholder="Titre"
        value={newImage.title}
        onChange={handleInputChange}
      />
      <input
        type="file"
        name="file"
        onChange={handleFileChange}
      />
      <button onClick={handleAddImage}>Ajouter</button>
    </div>
  );
};

const App = () => {
  const [images, setImages] = useState(imageData);
  const [newlyAddedImage, setNewlyAddedImage] = useState(null);

  const handleAddImage = (newImage) => {
    setImages([...images, newImage]);
    setNewlyAddedImage(newImage); // Stockez la nouvelle image pour l'affichage
  };

  const handleRemoveImage = (id) => {
    const updatedImages = images.filter(image => image.id !== id);
    setImages(updatedImages);
    setNewlyAddedImage(null);
  };

  return (
    <div className="app">
      <h1>Auto Gallery</h1>
      <div className="gallery">
        {images.map(image => (
          <div key={image.id} className="image-container">
            <img src={`./image/${image.filename}`} alt={image.title} className="image" />
            <p className="image-title">{image.title}</p>
            <button onClick={() => handleRemoveImage(image.id)}>Supprimer</button>
          </div>
        ))}
        {newlyAddedImage && (
          <div className="image-container">
            <img src={`./image/${newlyAddedImage.filename}`} alt={newlyAddedImage.title} className="image" />
            <p className="image-title">{newlyAddedImage.title}</p>
            <button onClick={() => handleRemoveImage(newlyAddedImage.id)}>Supprimer</button>
          </div>
        )}
      </div>
      <AddImageForm onAddImage={handleAddImage} />
    </div>
  );
};

export default App;

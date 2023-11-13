// src/App.js
import React, { useState } from 'react';

import imageData from './data';
import './App.css';

const App = () => {
  const [images, setImages] = useState(imageData);
  const [newlyAddedImage, setNewlyAddedImage] = useState(null);

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
    </div>
  );
};

export default App;


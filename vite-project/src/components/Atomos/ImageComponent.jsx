// ImageComponent.js

import React from 'react';
import './ImageComponent.css'; // Importa el archivo CSS de estilos para la imagen

const ImageComponent = () => {
  return (
    <div className="image-container">
      <img src="./public/img/huevo.png" alt="Descripción de la imagen" className="main-image" />
    </div>
  );
};

export default ImageComponent;

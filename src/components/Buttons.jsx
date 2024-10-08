import { useState } from 'react';

const Buttons = () => {
  const [videoFile, setVideoFile] = useState(null);
  const [color, setColor] = useState('#FFFFFF');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setVideoFile(file); // Guardamos el archivo completo
    }
  };

  const handleColorChange = (event) => {
    setColor(event.target.value);
  };

  const handleUpload = async () => {
    if (!videoFile) {
      alert('Por favor, selecciona un video.');
      return;
    }

    const formData = new FormData();
    formData.append('videoFile', videoFile); // Agrega el archivo de video
    formData.append('color', color); // Agrega el color


    try {
      const response = await fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: formData, // Envía el FormData
      });

      if (!response.ok) {
        throw new Error('Error en la carga del video y color');
      }

      const result = await response.json();
      console.log('Datos cargados:', result);
      alert('Carga exitosa!');
    } catch (error) {
      console.error('Error al cargar:', error);
      alert('Error al cargar los datos. Inténtalo de nuevo.');
    }
  };

  return (
    <div>
      <header>
        <h1>Upload Video and Color</h1>
      </header>
      <div className="container">
        <input type="file" id="uploadBtn" onChange={handleFileChange} />
        <label htmlFor="uploadBtn">
          <i className="fa-solid fa-upload"></i> Upload
        </label>
        <input
          type="color"
          id="colorPicker"
          value={color}
          onChange={handleColorChange}
        />
        <button onClick={handleUpload}>Submit</button>
      </div>
    </div>
  );
};

export default Buttons;

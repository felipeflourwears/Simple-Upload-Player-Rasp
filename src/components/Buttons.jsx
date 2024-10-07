import { useState } from 'react';

const Buttons = () => {
  const [videoName, setVideoName] = useState('');
  const [color, setColor] = useState('#FFFFFF');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setVideoName(file.name); // Guardamos solo el nombre del archivo
    }
  };

  const handleColorChange = (event) => {
    setColor(event.target.value);
  };

  const handleUpload = async () => {
    if (!videoName) {
      alert('Por favor, selecciona un video.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          video: videoName, // Solo enviamos el nombre del video
          color: color,
        }),
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

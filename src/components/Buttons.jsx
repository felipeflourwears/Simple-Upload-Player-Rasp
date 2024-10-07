const Buttons = () => {
    return (
      <div>
        <header>
          <h1>Upload Video and Color</h1>
        </header>
        <div className="container">
          <input type="file" id="uploadBtn" />
          <label htmlFor="uploadBtn"><i className="fa-solid fa-upload"></i> Upload</label>
          <input type="color" id="colorPicker" />
        </div>
      </div>
    );
  };
  
  export default Buttons;
  
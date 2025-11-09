import React, { useState } from "react";

function Photo() {
  const [file, setFile] = useState(null);
  const [dataform, setDataform] = useState({
    firstName : "",
    lastName: ""
  })
  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState("");
  const [messageColor, setMessageColor] = useState("red");

  // Handle file selection
  const handleFileChange = (e) => {
   const selectedFile = e.target.files[0]
   if (selectedFile) {
    setFile(selectedFile)
    const reader = new FileReader();
    reader.onloadend =() => {
        setPreview(reader.result)
    }

    reader.readAsDataURL(selectedFile)
    setMessage("File chosen, Please Click Upload")
    setMessageColor("green")
   }else{

       setFile(null);
          setPreview(null);
          setMessage("No file selected");
          setMessageColor("red");
   }
  };

  

  // Handle upload
  const uploadImage = (e) => {
    e.preventDefault();
    if (!file) {
      setMessage("Please select a file first");
      setMessageColor("red");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);
    formData.append(`firstName`, dataform.firstName)

    fetch("http://localhost:3200/uploadimage", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        setMessage(data.message || "Upload complete");
        setMessageColor("green");
      })
      .catch((err) => {
        console.error(err);
        setMessage("Upload failed");
        setMessageColor("red");
      });
  };

  return (
    <div>
      <h1>Image Upload & Preview</h1>
      <form onSubmit={uploadImage}>
        <input 
        onChange={(e)=> setDataform({...dataform, firstName: e.target.value})}
        type="text"
        name={dataform.firstName} />
         {/* Preview */}
      {preview && (
        <div>
          <img
            src={preview}
            alt="Preview"
            style={{ width: "200px", height: "auto", marginTop: "10px" }}
          />
        </div>
      )}
        <input type="file" onChange={handleFileChange} />
      <br /> <br />
        <button type="submit">Upload</button>
      </form>

      

      

      {/* Message */}
      {message && <p style={{ color: messageColor }}>{message}</p>}
    </div>
  );
}

export default Photo;

const express = require(`express`);
const cors = require(`cors`);
const app = express();
const multer = require(`multer`);
const { config } = require("dotenv");
const upload = multer({ dest: `/upload/images` });
const cloudinary = require(`cloudinary`).v2;
const port = 3200;
const db = require(`./database`);
const nodemailer = require(`nodemailer`);
require(`dotenv`).config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL,
    pass: process.env.GMAILPASS,
  }
})

cloudinary.config({
  cloud_name: process.env.CLOUDNAME,
  api_key: process.env.CLOUDAPI,
  api_secret: process.env.CLOUDAPIS,
});
app.use(cors({ origin: "http://localhost:5174" }));
app.use(express.json());

app.get(`/`, (req, res) => {
  res.json({ message: `This is Home Page` });
});
app.get(`/home`, (req, res) => {
  res.json({ message: `This is Home Page` });
});
app.post(`/uploadimage`, upload.single(`image`), (req, res) => {
  const { firstName } = req.body;
  console.log(firstName);

  if (!req.file  || !firstName) {
    return res.status(401).json({ message: "One input Missing" });
  } else {
    console.log("Uploaded file info:", req.file);
    const filePath = req.file.path;
    const name = req.file.originalname;

    cloudinary.uploader.upload(
      filePath,
      { folder: "UploadLearn" },
      (err, result) => {
        if (err)
          return res.status(404).json({ message: "Cloud Database Error" });
        // console.log(result);
        const secureUrl = result.secure_url;
        const assetId = result.asset_id;
        const uploadTime = result.created_at;
        
        db.query(
          `insert into profilePicture set ?`,
          {
            name: name,
            imageUrl: secureUrl,
            assetId: assetId,
            uploadTime: uploadTime,
          },
          (err, result) => {
            if (err) {
              console.log(err);
              return res.status(500).json({message : `UPLOAD FAILED : INTERNAL SERVER ERROR`});
            } else {
              // id, name, imageUrl, assetId, uploadTime, timeCreated
              res.status(200).json({ message: "Uploaded successfully" });
            }
          }
        );
      }
    );
  }
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

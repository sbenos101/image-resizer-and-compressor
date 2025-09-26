const express = require("express");
const multer = require("multer");
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, "public")));

const upload = multer({ storage: multer.memoryStorage() });

const TEMP_DIR = path.join(__dirname, "temp");
if (!fs.existsSync(TEMP_DIR)) fs.mkdirSync(TEMP_DIR);

app.post("/compress-upload", upload.array("images", 50), async (req, res) => {
  try {
    const files = req.files;
    if (!files || files.length === 0) return res.status(400).send("No files uploaded");

    const resultFiles = [];

    for (const file of files) {
      try {
        const compressedBuffer = await sharp(file.buffer)
          .resize(550, 550, { fit: "cover" })
          .jpeg({ quality: 95 })
          .toBuffer();

        const filename = file.originalname.replace(/\.[^/.]+$/, ".jpg");
        const filepath = path.join(TEMP_DIR, `${uuidv4()}_${filename}`);

        fs.writeFileSync(filepath, compressedBuffer);
        resultFiles.push({ filename, path: filepath });
      } catch (err) {
        console.error(`Error processing ${file.originalname}:`, err);
      }
    }

    const baseUrl = `http://localhost:${PORT}`;
    const images = resultFiles.map(f => `${baseUrl}/temp/${path.basename(f.path)}`);

    res.json({ images });
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).send("Batch processing failed");
  }
});

app.use("/temp", express.static(TEMP_DIR));

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import cors from "cors";
const app = express();
const PORT = 3000;
app.use(cors());
// Папка для загруженных файлов
const uploadDir = "./uploads";

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Настройка Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });

// ----------------- POST: загрузка файла -----------------
app.post("/upload", upload.single("file"), (req, res) => {
  console.log("Файл получен:", req.file);

  res.json({
    message: "Файл успешно загружен",
    fileName: req.file.filename,
    path: req.file.path,
  });
});

// ----------------- GET: список файлов -------------------
app.get("/files", (req, res) => {
  fs.readdir(uploadDir, (err, files) => {
    if (err)
      return res.status(500).json({ error: "Не удалось прочитать каталог" });

    const fileList = files.map((file) => ({
      name: file,
      url: `http://localhost:${PORT}/files/${file}`,
    }));

    res.json(fileList);
  });
});

// ----------------- GET: скачать файл ---------------------
app.get("/files/:fileName", (req, res) => {
  const fileName = req.params.fileName;
  const filePath = path.join(uploadDir, fileName);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: "Файл не найден" });
  }

  res.download(filePath, fileName);
});

// --------------------------------------------------------

app.listen(PORT, () => {
  console.log(`File upload server running on port ${PORT}`);
});

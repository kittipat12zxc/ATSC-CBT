//ไฟล์นี้ทำหน้าที่จัดการเส้นทาง (Route) เกี่ยวกับการอัปโหลด, แสดง, และลบรูปภาพ
const express = require('express'); // Framework หลักสำหรับสร้าง Web Server ด้วย Node.js
const multer = require('multer');   // Middleware สำหรับจัดการการอัปโหลดไฟล์ (multipart/form-data)
const fs = require('fs');           // Module ของ Node.js สำหรับทำงานกับ File System (อ่าน/เขียน/ลบไฟล์)
const path = require('path');       // Module ของ Node.js สำหรับจัดการกับ Path ของไฟล์และโฟลเดอร์

const router = express.Router(); // สร้าง Instance ของ Router จาก Express

// ส่วนของการตั้งค่า Multer 
// กำหนดค่าคอนฟิกสำหรับ multer ว่าจะเก็บไฟล์ที่อัปโหลดมาอย่างไร
const storage = multer.diskStorage({
  // diskStorage คือการบอกให้ multer บันทึกไฟล์ลงในดิสก์ (server)
  destination: (req, file, cb) => {
    // กำหนดโฟลเดอร์ที่จะเก็บไฟล์ ในที่นี้คือโฟลเดอร์ 'uploads/'
    cb(null, 'uploads_annnouce');
  },
  filename: (req, file, cb) => {
    // กำหนดชื่อไฟล์ใหม่ เพื่อป้องกันไม่ให้ชื่อไฟล์ซ้ำกันหากมีการอัปโหลดไฟล์ชื่อเดียวกันเข้ามา
    cb(null, Date.now() + '-' + file.originalname);
  },
});

// สร้าง instance ของ multer ด้วยคอนฟิกที่เพิ่งตั้งค่าไป
const upload = multer({ storage });


// ส่วนของ Endpoints

// ใช้ HTTP POST ไปที่ /api/upload
router.post('/uploads_annnouce', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  // ✅ Return correct public URL
  res.json({ imageUrl: `http://localhost:5000/images-annouce/${req.file.filename}` });
});
// ใช้ HTTP GET ไปที่ /api/images
router.get('/images-annouce', (req, res) => {
  const folder = path.resolve(__dirname, '../../../uploads_annnouce');

  if (!fs.existsSync(folder)) {
    return res.json([]);
  }

  const files = fs.readdirSync(folder);

  const imageUrls = files.map(file => ({
    name: file,
    url: `http://localhost:5000/images-annouce/${file}`, // ✅ use /images-annouce/
  }));

  res.json(imageUrls);
});

// ใช้ HTTP DELETE ไปที่ /api/images/:filename
router.delete('/images-annouce/:filename', (req, res) => {
  const filePath = path.join(__dirname, '../../../uploads_annnouce', req.params.filename);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ message: 'File not found' });
  }

  fs.unlinkSync(filePath);
  res.json({ message: 'Image deleted successfully' });
});
// Export router เพื่อให้ไฟล์หลัก (เช่น server.js) นำไปใช้ได้
module.exports = router;
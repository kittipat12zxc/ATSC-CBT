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
    cb(null, 'uploads/');
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
router.post('/upload', upload.single('image'), (req, res) => {
  // upload.single('image') คือ middleware ของ multer
  // มันจะดักจับ request ที่เข้ามา และหาไฟล์จาก form field ที่ชื่อว่า 'image'
  
  // เช็คว่ามีไฟล์ถูกอัปโหลดมาด้วยหรือไม่
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  
  // ถ้าอัปโหลดสำเร็จ req.file จะมีข้อมูลของไฟล์นั้นๆ
  // ส่ง URL ของไฟล์ที่อัปโหลดสำเร็จกลับไปให้ client
  res.json({ imageUrl: `http://localhost:5000/images/${req.file.filename}` });
});

// ใช้ HTTP GET ไปที่ /api/images
router.get('/images', (req, res) => {
  // หา path จริงๆ ของโฟลเดอร์ uploads (ย้อนกลับไปหนึ่งระดับจาก __dirname แล้วเข้า /uploads)
  const folder = path.resolve(__dirname, '../../../uploads');

  // เช็คก่อนว่าโฟลเดอร์ uploads มีอยู่จริงมั้ย ถ้าไม่มีก็ส่ง array ว่างๆ กลับไป
  if (!fs.existsSync(folder)) {
    return res.json([]);
  }

  // อ่านรายชื่อไฟล์ทั้งหมดในโฟลเดอร์แบบ Synchronous (รอให้เสร็จก่อนไปต่อ)
  const files = fs.readdirSync(folder);
  
  // แปลง array ของชื่อไฟล์ ให้เป็น array ของ object ที่มี 'name' กับ 'url'
  const imageUrls = files.map(file => ({
    name: file,
    url: `http://localhost:5000/images/${file}`,
  }));
  
  // ส่ง array ของข้อมูลรูปภาพกลับไป
  res.json(imageUrls);
});

// ใช้ HTTP DELETE ไปที่ /api/images/:filename
router.delete('/images/:filename', (req, res) => {
  // สร้าง path แบบเต็มไปยังไฟล์ที่ต้องการลบ
  const filePath = path.join(__dirname, '../../../uploads', req.params.filename);

  // เช็คก่อนว่ามีไฟล์นี้อยู่จริงมั้ยใน server
  if (!fs.existsSync(filePath)) {
    // ถ้าไม่มี ก็แจ้งกลับไปว่าหาไฟล์ไม่เจอ (404 Not Found)
    return res.status(404).json({ message: 'File not found' });
  }

  // ถ้าไฟล์มีอยู่จริง ก็สั่งลบไฟล์ออกจาก server
  fs.unlinkSync(filePath);
  
  // ส่งข้อความยืนยันกลับไปว่าลบสำเร็จ
  res.json({ message: 'Image deleted successfully' });
});

// Export router เพื่อให้ไฟล์หลัก (เช่น server.js) นำไปใช้ได้
module.exports = router;
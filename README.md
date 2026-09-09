# ATSC-CBT (ระบบการจัดสอบออนไลน์ - Computer Based Testing)

**ATSC-CBT** คือ ระบบการจัดสอบออนไลน์ (Computer Based Testing) แบบครบวงจร พัฒนาขึ้นเพื่อรองรับกระบวนการจัดสอบตั้งแต่ต้นจนจบ เริ่มจากการประกาศรับสมัครสอบ การลงทะเบียนของผู้เข้าสอบ การทำแบบทดสอบผ่านระบบออนไลน์ ไปจนถึงระบบจัดการหลังบ้านสำหรับผู้ดูแลระบบ (Administrator) เพื่อจัดการข้อมูลการสอบและผู้เข้าสอบ

## 🌟 ฟีเจอร์หลัก (Features)

### 🎓 ระบบสำหรับผู้เข้าสอบ (Client Portal)
- **ระบบรับสมัครสอบ (Registration System)**: ตรวจสอบประกาศรับสมัครสอบ และลงทะเบียนสมัครสอบ
- **ตรวจสอบสถานะ**: เช็คสถานะการสมัครสอบ และพิมพ์บัตรประจำตัวสอบ
- **ระบบจัดการการสอบ (CBT)**: เข้าสู่ระบบเพื่อทำแบบทดสอบออนไลน์
- **หน้าจอทำแบบทดสอบ**: อ่านคำชี้แจงการสอบ, ทำแบบทดสอบ, และส่งคำตอบเข้าสู่ระบบได้อย่างมีประสิทธิภาพ

### 🛡️ ระบบสำหรับผู้ดูแลระบบ (Admin Dashboard)
- **จัดการการรับสมัคร (Registration Management)**: ตรวจสอบและจัดการรายชื่อผู้สมัครสอบ
- **ระบบจัดการข้อมูล**: จัดการข้อมูลที่เกี่ยวข้องกับการสอบ, อัปโหลดรูปภาพ และทรัพยากรต่างๆ ภายในระบบ
- **ออกรายงาน (Reporting)**: รองรับการ Export ข้อมูลและออกรายงานต่างๆ (สามารถแปลงหน้าจอเป็นไฟล์ PDF ได้)

### ⚙️ ระบบหลังบ้าน (Backend Server)
- **RESTful API**: พัฒนาด้วย Node.js และ Express.js
- **ความปลอดภัย**: ระบบยืนยันตัวตน (Authentication) ด้วย JWT (JSON Web Token) และเข้ารหัสผ่านด้วย bcryptjs
- **การจัดการไฟล์**: รองรับการอัปโหลดไฟล์รูปภาพด้วย Multer

## 🛠️ เทคโนโลยีที่ใช้ (Tech Stack)

- **Frontend (Client & Admin)**: React 19, React Router, Tailwind CSS, React Hook Form, Axios
  - *UI Libraries*: Ant Design (สำหรับ Client), Lucide React (สำหรับ Icon ใน Admin)
- **Backend**: Node.js, Express.js
- **Database**: MySQL 8.0
- **Infrastructure & Tools**: Docker, Docker Compose, phpMyAdmin

## 📂 โครงสร้างโปรเจค (Project Structure)

```bash
ATSC-CBT/
├── admin/               # ระบบ Frontend สำหรับผู้ดูแลระบบ (Port 3001)
├── client/              # ระบบ Frontend สำหรับผู้เข้าสอบ (Port 3000)
├── server/              # ระบบ Backend Server & API (Port 5000)
└── docker-compose.yml   # ไฟล์ตั้งค่า Docker สำหรับ Database และ phpMyAdmin
```

## 🚀 การติดตั้งและการรันโปรเจค (Getting Started)

### สิ่งที่ต้องติดตั้งล่วงหน้า (Prerequisites)
- [Node.js](https://nodejs.org/) (แนะนำเวอร์ชัน 18 ขึ้นไป)
- [Docker](https://www.docker.com/) และ Docker Compose

### 1. การตั้งค่า Database
ทำการรัน MySQL Database และ phpMyAdmin ผ่าน Docker Compose ในโฟลเดอร์หลักของโปรเจค:
```bash
docker-compose up -d
```
- **MySQL Database**: `localhost:3306` (User: `dev`, Password: `123456`, Database: `ATSC`) 
- **phpMyAdmin**: `http://localhost:8080` (เข้าสู่ระบบด้วย User: `root`, Password: `2521`)

### 2. การติดตั้ง Dependencies
เปิด Terminal แล้วทำการรันคำสั่งต่อไปนี้เพื่อติดตั้งแพ็กเกจที่จำเป็นในแต่ละโฟลเดอร์:

```bash
# ติดตั้งแพ็กเกจของ Server
cd server
npm install

# ติดตั้งแพ็กเกจของ Client
cd ../client
npm install

# ติดตั้งแพ็กเกจของ Admin
cd ../admin
npm install
```

### 3. การรันแอปพลิเคชันทั้งหมด
โปรเจคนี้มีการตั้งค่า Script แบบรวมศูนย์เอาไว้ ทำให้คุณสามารถรันระบบทั้ง 3 ส่วน (Server, Client, Admin) ได้พร้อมกันในคำสั่งเดียว

ให้เข้าไปที่โฟลเดอร์ `server` และใช้คำสั่งรันโปรเจค:
```bash
cd ../server
npm run dev
```

ระบบจะทำการเปิด:
- **Backend Server**: `http://localhost:5000`
- **Client App**: `http://localhost:3000`
- **Admin App**: `http://localhost:3001`

## 👥 ทีมพัฒนา (Contributors)

โปรเจคนี้ได้รับการพัฒนาโดย:

- [@Kittipat12zxc](https://github.com/kittipat12zxc)
- [@FORDTNK](https://github.com/FORDTNK)
- [@SariverHoMez](https://github.com/SariverHoMez)
- [@FayOsaka](https://github.com/FayOsaka)
- [@pongsapakmessi10](https://github.com/pongsapakmessi10)
- [@Zaint1fy](https://github.com/Zaint1fy)
- [@toto-zzz](https://github.com/toto-zzz)
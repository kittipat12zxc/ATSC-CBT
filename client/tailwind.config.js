/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // ตรวจสอบให้แน่ใจว่า path นี้ถูกต้อง
  ],
  theme: {
    extend: {
      colors: {
        'custom-blue': {
          DEFAULT: '#082290', // สีหลัก
          dark: '#061a74',   // สีเข้มขึ้นสำหรับ hover
          light: '#a3b0e8'   // สีอ่อนสำหรับ focus ring
        }
      }
    },
  },
  plugins: [],
}
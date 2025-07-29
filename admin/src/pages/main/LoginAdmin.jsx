import React,{ useState } from 'react'
import { useForm } from 'react-hook-form';
import axios from 'axios'
import {  useNavigate } from 'react-router-dom';

const LoginAdmin = () => {
  // ใช้ Library useForm() โดย register เชื่อมกับ input , handleSubmit เช็คก่อนส่งฟอม , formState เช็คว่ามี error ไหม
  const { register, handleSubmit, formState: {errors}} = useForm()
  const [message,setMessage] = useState('')
  const navigate = useNavigate()

  // ฟังก์ชั่น ไว้เช็คฟอมตอนกดเข้าสู่ระบบ ถ้าสำเร็จให้ไปหน้า /RegistrationSystemAdmin
  const onSubmit = async (data) => {
    try {
      const res = await axios.post('http://localhost:5000/api/admin/login',data)
      const {token} = res.data // รับค่า token จาก backend

      localStorage.setItem('admin_token',token)
      setMessage('เข้าสู่ระบบสำเร็จ')

      navigate('/RegistrationSystemAdmin') // ไปหน้า RegistrationSystemAdmin



    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || 'เข้าสู่ระบบล้มเหลว'); 
    }
  }

  return (
    <div className="min-h-screen flex pt-[10%] justify-center bg-gray-100 px-6 py-12">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
      
        <div className="mt-2 mb-4">
          <img
            src="/images/atsclogin.png"
            alt="ATSC Logo"
            className="mx-auto h-auto w-[50%]"
          />
        </div>

  
        <div className="relative p-10 pt-6 rounded-xl bg-blue-800 pb-[70px]">
          <h2 className="text-white text-center text-4xl font-semibold tracking-tight mb-6">
            ADMIN PAGE
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6"> 
           
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-white">
                USERNAME / ชื่อผู้ใช้
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  type="text"
                  name="username"
                  required
                  autoComplete="username"
                  placeholder="กรุณากรอกชื่อผู้ใช้"
                  {...register('username', { required: true })}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600"
                />

                {errors.username && (
                  <p className="text-red-300 text-sm mt-1">กรุณากรอกชื่อผู้ใช้</p>
                )}
              </div>
            </div>

          
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-white">
                PASSWORD / รหัสผ่าน
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  type="password"
                  name="password"
                  required
                  autoComplete="current-password"
                  placeholder="กรุณากรอกรหัสผ่าน"
                  {...register('password', {required:true})}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600"
                />
                {errors.password && (
                  <p className="text-red-300 text-sm mt-1">กรุณากรอกรหัสผ่าน</p>
                )}
              </div>
            </div>

         
            <button
              type="submit"
              className="absolute bottom-[-30px] left-0 right-0 mx-auto w-[40%] px-6 py-2 rounded-full border-4 border-white bg-blue-800 text-sm font-semibold text-white shadow hover:bg-indigo-500 focus:outline-indigo-600"
            >
              เข้าสู่ระบบ
            </button>
          </form>

           {message && (
            <p className="text-center mt-4 text-white font-semibold">{message}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginAdmin;

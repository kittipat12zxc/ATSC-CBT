import React from 'react'
import SDU from './conponents/sdulogo.png'
import Pin from './conponents/pin.png'
import Phone from './conponents/contact/phone.png'
import Line from './conponents/contact/line.png'
import Gmail from './conponents/contact/envelope.png'
import Envelope from './conponents/contact/envelope-white.png'
import Global from './conponents/contact/global.png'
import Facebook from './conponents/contact/facebook.png'
import Instagram from './conponents/contact/instagram.png'
import Twitter from './conponents/contact/twitter.png'
import Layout from '../../../Components/layout/layout'

function ContacttheDepartment() {
    return (
        <>
        <Layout>
            <div className='bg-gradient-to-b from-[#5dc7ef] to-white py-[2rem] min-h-screen'>
                <div className='w-[90%] 2xl:w-[70%] bg-white mx-auto p-[1rem] shadow-xl'>
                    <div className='flex 2xl:flex-row flex-col gap-[2rem] 2xl:gap-[0] bg-[#368bc1] p-[1rem] sm:p-[2rem] justify-between items-start 2xl:items-end'>
                        <div className='flex gap-[1rem] items-center'>
                            <div className='flex justify-center items-center'>
                                <img src={SDU} alt="" className='w-[4rem] object-cover ' />
                            </div>
                            <div className='text-white'>
                                <h1 className='text-[1.2rem] sm:text-[2rem] whitespace-nowrap'>SDU-Computer Base Testing</h1>
                                <h1 className='text-[1.2rem] sm:text-[1.5rem] whitespace-nowrap'>มหาวิทยาลัยสวนดุสิต</h1>
                            </div>
                        </div>
                        <div className='text-white'>
                            <span className='text-[1rem] sm:text-[1.3rem] flex justify-start items-center'>
                                <img src={Pin} alt="" className='w-[1.3rem] sm:w-[2rem]' />
                                ที่ตั้ง
                            </span>
                            <p className='text-[1rem]'>เลขที่ 295 มหาวิทยาลัยสวนดุสิต ถนนนครราชสีมา เขตดุสิต กรุงเทพมหานคร 10300</p>
                        </div>
                    </div>
                    <div class="flex flex-col sm:flex-row py-[2rem]">
                        <div class="w-full py-[1rem] flex flex-col gap-[1rem] justify-start items-center sm:w-1/4">
                            <span className='text-[1.2rem] flex justify-center items-end gap-[0.3rem]  text-[#368bc1]'><img src={Phone} alt="" className='w-[2rem] ' />โทรศัพท์</span>
                            <p>09012345555333333</p>
                        </div>
                        <div class="w-full py-[1rem] flex flex-col gap-[1rem] justify-start items-center sm:w-1/4">
                            <span className='text-[1.2rem] flex justify-center items-end gap-[0.3rem]  text-[#368bc1]'><img src={Line} alt="" className='w-[2rem] ' />ไลน์</span>
                            <p>09012345555333333</p>
                        </div>
                        <div class="w-full py-[1rem] flex flex-col gap-[1rem] justify-start items-center sm:w-1/4">
                            <span className='text-[1.2rem] flex justify-center items-end gap-[0.3rem]  text-[#368bc1]'><img src={Gmail} alt="" className='w-[2rem] ' />อีเมล</span>
                            <p>09012345555333333</p>
                        </div>
                        <div class="w-full py-[1rem] flex flex-col gap-[1rem] justify-start items-center sm:w-1/4">
                            <span className='text-[1.2rem] flex justify-center items-end gap-[0.3rem]  text-[#368bc1]'><img src={Global} alt="" className='w-[2rem] ' />สื่อออนไลน์</span>
                            <span className='flex gap-[1rem]'>
                                <a href="https://www.facebook.com/"><img src={Facebook} alt="" className='w-[2rem]' /></a>
                                <a href="https://www.instagram.com/"><img src={Instagram} alt="" className='w-[2rem]' /></a>
                                <a href="https://x.com/"><img src={Twitter} alt="" className='w-[2rem]' /></a>
                            </span>
                        </div>

                    </div>
                    <div className=''>
                        <div className='bg-[#368bc1] py-[1rem]'>
                            <span className='flex justify-center items-center text-white text-[1.5rem] gap-[1rem]'><img src={Envelope} alt="" className='w-[2rem] brightness-0 invert' />แบบฟอร์มติดต่อ</span>
                        </div>
                        <div className='flex flex-col justify-start items-center w-full max-w-md mx-auto mt-[2rem]'>
                            <label htmlFor="" className="mb-1 text-[1.2rem]">ชื่อ-นามสกุล</label>
                            <input type="text" placeholder='กรุณากรอกชื่อ-นามสกุล'
                                className="border border-gray-300 rounded-full px-3 py-2 sm:w-full mb-4 text-[1rem] w-[80%] " />

                            <label htmlFor="" className="mb-1 text-[1.2rem]">อีเมล</label>
                            <input type="email" placeholder='อีเมล์'
                                className="border border-gray-300 rounded-full px-3 py-2 sm:w-full mb-4 text-[1rem] w-[80%] " />

                            <label htmlFor="" className="mb-1 text-[1.2rem]">หัวข้อการติดต่อ</label>
                            <input type="text" placeholder='หัวข้อการติดต่อ'
                                className="border border-gray-300 rounded-full px-3 py-2 sm:w-full mb-4 text-[1rem] w-[80%] " />

                            <label htmlFor="" className="mb-1 text-[1.2rem]">รายละเอียด</label>
                            <input type="text" placeholder='กรุณากรอกรายละเอียด'
                                className="border border-gray-300 rounded-full px-3 py-2 sm:w-full mb-4 text-[1rem] w-[80%] " />

                            <button className='bg-[#368bc1] text-[1.2rem] text-white px-[2rem] py-[0.2rem] rounded-full'>ส่งข้อความ</button>
                        </div>

                    </div>
                </div>
            </div>
            </Layout>

        </>
    )
}

export default ContacttheDepartment
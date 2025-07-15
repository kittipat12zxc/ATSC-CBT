import React, { useEffect, useState } from 'react';
import DetailImageSlider from '../DetailImageSlider/DetailImageSlider';
import SideBarRegistration from '../../../components/SideBarRegistration/SideBarRegistration'
import axios from 'axios'; // ไว้ใช้ดึงจาก Backend

// HomePage() ดึงข้อมูลจาก Backend server

function HomePage() {
  const [publicRelations, setPublicRelations] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/public-relations')
      .then(response => {
        setPublicRelations(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

// หน้า UX/UI

  return (
    <div className="w-full min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="flex flex-col md:flex-row md:gap-x-8">
          <div className="w-full md:w-[30%] mb-8 md:mb-0">
            <SideBarRegistration />
          </div>

          <div className="w-full md:w-[70%]">
            <DetailImageSlider />

            <div className="relative rounded-lg mt-8 w-full bg-[#E0E0E0] px-6 sm:px-8 md:px-12 py-8 flex flex-col gap-5">
              <div>
                <p className="absolute top-[-14px] left-0 bg-[#082290] text-white py-1 px-8 rounded-t-md">
                  ประชาสัมพันธ์
                </p>
              </div>
              
              {/* วนลูป เพื่อดึงข้อมูลมาจาก arrays ของ publicRelations (เป็น arrays จาก mysql) */}
              {publicRelations.map((item, index) => (
                <div key={index}className="relative border-l-[5px] border-[#082290] bg-[#C0C0C0] w-full min-h-[140px] p-4">
                  <h2 className="text-lg font-semibold text-black">{item.News_body}</h2>
                  <p className="text-sm text-gray-800 mt-2"><span className='font-semibold'>เรื่อง</span> {item.Download_Pdf}</p>
                  <p className="text-base text-black mt-1 font-semibold">ครั้งที่ {item.Date}</p>
                  
                  <div>
                    <a className='absolute bottom-[-10px] right-4 px-[20px] py-[2px] rounded-3xl bg-[#082290] text-white' href="/">อ่านรายละเอียด</a>
                  </div>
                </div>
              ))}

              

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;

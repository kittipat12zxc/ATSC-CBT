import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import DetailImageSlider from './components/DetailImageSlider/DetailImageSlider';
import SideBarRegistration from './components/SideBarRegistration/SideBarRegistration';
import axios from 'axios';
import Header from '../../components/Header/PCHeader';
import Footer from '../../components/Footer/Footer';

// ฟังก์ชันดึง query parameter
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

// ฟังก์ชันแปลงวันที่เป็นแบบ "14 กุมภาพันธ์ 2568"
function formatThaiDate(dateString) {
  if (!dateString) return '-';
  const monthsThai = [
    "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
    "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
  ];
  const date = new Date(dateString);
  const day = date.getDate();
  const month = monthsThai[date.getMonth()];
  const year = date.getFullYear() + 543;
  return `${day} ${month} ${year}`;
}

function HomePage() {
  const query = useQuery();
  const id = query.get('id'); // ดึงค่า id จาก URL เช่น '686002'
  const [publicRelations, setPublicRelations] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) {
      setError('ไม่พบรหัสประชาสัมพันธ์');
      setPublicRelations([]);
      return;
    }

    axios.get('http://localhost:5000/api/registration/public-relations')
      .then(response => {
        // กรองข้อมูลที่ exam_enrollments_id === id (แปลงเป็น Number เทียบกัน)
        const filtered = response.data.filter(
          item => Number(item.exam_enrollments_id) === Number(id)
        );

        if (filtered.length === 0) {
          setError('ไม่พบข้อมูลประชาสัมพันธ์ที่ตรงกับรหัส');
          setPublicRelations([]);
        } else {
          setError(null);
          setPublicRelations(filtered);
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError('เกิดข้อผิดพลาดในการโหลดข้อมูลประชาสัมพันธ์');
        setPublicRelations([]);
      });
  }, [id]);

  return (
    <>
      <Header />
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

                {error && (
                  <p className="text-red-600">{error}</p>
                )}

                {!error && publicRelations.length === 0 && (
                  <p>ไม่พบข้อมูลประชาสัมพันธ์</p>
                )}

                {publicRelations.map((item, index) => (
                  <div key={index} className="relative border-l-[5px] border-[#082290] bg-[#C0C0C0] w-full min-h-[140px] p-4">
                    <h2 className="text-lg font-semibold text-black">{item.title}</h2>
                    <p className="text-base mt-1 font-normal">{item.details}</p>
                    <p className="text-sm text-gray-800 mt-2">
                      <span className='font-semibold'>ช่วงเวลารับสมัคร:</span> {formatThaiDate(item.open_date)} - {formatThaiDate(item.end_date)}
                    </p>
                    {item.pdf && (
                      <p className="mt-2">
                        <a
                          href={item.pdf}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 underline"
                        >
                          ดาวน์โหลดไฟล์ PDF
                        </a>
                      </p>
                    )}
                  </div>
                ))}

              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default HomePage;

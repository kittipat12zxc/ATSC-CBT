import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../../components/Header/PCHeader';
import Footer from '../../components/Footer/Footer';

function MainExamAnnouncement() {
  const [registrations, setRegistrations] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/MainExamAnnouncement')
      .then(response => {
        setRegistrations(response.data);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // ✅ ฟังก์ชันแปลงวันที่เป็นภาษาไทย
  function formatThaiDate(dateString) {
    const monthsThai = [
      "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
      "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
    ];

    const date = new Date(dateString);
    const day = date.getDate();
    const month = monthsThai[date.getMonth()];
    const year = date.getFullYear() + 543; // แปลง ค.ศ. → พ.ศ.

    return `${day} ${month} ${year}`;
  }

  return (
    <>
      <div className='flex flex-col min-h-screen'>
        <Header />
        <main className='flex-grow'>
          <div className='w-[90%] mx-auto flex flex-col gap-[3rem] mb-[5rem] '>
            {registrations.map((item, index) => (
              <div
                key={index}
                className="border-[#082290] border-l-[0.4rem] pt-[1rem] pb-[2rem] xl:pb-[3rem] px-[1rem] xl:pl-[2rem] bg-[#EFEFEF] relative"
              >
                <h1 className='text-[1.5rem]  xl:text-[2rem]'>{item.title}</h1>
                <p className='text-[1rem] xl:text-[1.5rem] font-light'>
                  ช่วงเวลาที่เปิดรับสมัคร : {formatThaiDate(item.open_date)} - {formatThaiDate(item.end_date)}
                </p>
                <a
                  className='text-[1rem] xl:text-[1.5rem] bg-[#082290] px-[2rem] text-white absolute bottom-[-0.7rem] xl:bottom-[-1rem]'
                  href={`/DetailRegistration?id=${item.exam_enrollments_id}`}
                >
                  สมัครสอบ
                </a>
              </div>
            ))}
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default MainExamAnnouncement;

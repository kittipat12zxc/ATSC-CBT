import React, { useEffect, useState } from "react";
import RegisterIcon from '../../../../assets/MenuImage/RegisterIcon.png'
import CBTIcon from '../../../../assets/MenuImage/CBTIcon.png'
import TOR from '../../../../assets/MenuImage/TOR_Preparation_System.png'
import Exam_Design_System from '../../../../assets/MenuImage/Exam_Design_System.png'
import Exam_Printing_and_Preparation_System from '../../../../assets/MenuImage/Exam_Printing_and_Preparation_System.png'
import Exam_Distribution_System from '../../../../assets/MenuImage/Exam_Distribution_System.png'
import Exam_Administration_System from '../../../../assets/MenuImage/Exam_Administration_System.png'
import Exam_Grading_System from '../../../../assets/MenuImage/Exam_Grading_System.png'
import Result_Announcement_System from '../../../../assets/MenuImage/Result_Announcement_System.png'
import Evaluation_and_Summary_System from '../../../../assets/MenuImage/Evaluation_and_Summary_System.png'


function MenuSlide() {
  const items = [
    { name: "ระบบรับสมัคร", imageUrl: RegisterIcon, link: "/Exam-Announcement" },
    { name: "ระบบ CBT", imageUrl: CBTIcon, link: "/CBT" },
    { name: "ระบบการจัดทำ\nขอบเขตของงาน", imageUrl: TOR, link: "/test3" },
    { name: "ระบบการ\nออกแบบข้อสอบ", imageUrl: Exam_Design_System, link: "/test4" },
    { name: "ระบบการจัดพิมพ์\nและเตรียมข้อสอบ", imageUrl: Exam_Printing_and_Preparation_System, link: "/test5" },
    { name: "ระบบการกระจาย\nข้อสอบไปยังสนามสอบ", imageUrl: Exam_Distribution_System, link: "/test6" },
    { name: "ระบบการจัดสอบจริง", imageUrl: Exam_Administration_System, link: "/test7" },
    { name: "ระบบการตรวจข้อสอบ", imageUrl: Exam_Grading_System, link: "/test8" },
    { name: "ระบบการ\nประกาศผลสอบ", imageUrl: Result_Announcement_System, link: "/test8" },
    { name: "ระบบการ\nประเมินและสรุปผล", imageUrl: Evaluation_and_Summary_System, link: "/test8" },
  ];


  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const updateItemsPerPage = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setItemsPerPage(2);
      } else if (width < 1024) {
        setItemsPerPage(3);
      } else if (width > 1450) {
        setItemsPerPage(8);
      } else if (width > 1300) {
        setItemsPerPage(6);
      } else {
        setItemsPerPage(5);
      }
    };

    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  const totalPages = Math.ceil(items.length / itemsPerPage);

  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1));
  };

  // % ที่ต้องเลื่อนในแต่ละหน้า
  const slidePercent = 100 * (itemsPerPage / items.length);
  const translateX = -(currentPage * slidePercent);

  return (
    <div className="w-full mx-auto px-4">
      <div className="relative flex items-center overflow-hidden">
        {/* ปุ่มย้อนกลับ */}
        <button
          onClick={handlePrev}
          disabled={currentPage === 0}
          className="z-10 text-2xl px-2 py-1 rounded disabled:opacity-30 cursor-pointer"
        >
          ←
        </button>

        {/* แถบแสดงผล */}
        <div className="overflow-hidden flex-1">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              width: `${(items.length / itemsPerPage) * 100}%`,
              transform: `translateX(${translateX}%)`,
            }}
          >
            {items.map((item, index) => (
              <div
                key={index}
                className="flex justify-center items-start p-4 "
                style={{ width: `${100 / items.length}%` }}
              >
                <div className="flex justify-center items-center flex-col gap-[5px]">
                  <a href={item.link} className="flex flex-col justify-center items-center">
                    <div className="border-[#082290] border-[0.4rem] sm:border-[0.47rem] w-[7rem] h-[7rem] sm:w-[10rem] sm:h-[10rem] rounded-full overflow-hidden hover:-translate-y-1 duration-300 ease-in-out">
                      <img
                        src={item.imageUrl} // Use the imageUrl from your item object
                        alt={item.name}     // Use the name for alt text
                        className="w-full h-full"
                      />
                    </div>
                    <div className="whitespace-pre-line text-center ">{item.name}</div>
                  </a>
                </div>

              </div>
            ))}
          </div>
        </div>

        {/* ปุ่มถัดไป */}
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages - 1}
          className="z-10 text-2xl px-2 py-1 rounded disabled:opacity-30 cursor-pointer"
        >
          →
        </button>
      </div>

    </div>
  );
}

export default MenuSlide;
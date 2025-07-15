import React, { useEffect, useState } from "react";
import RegisterIcon from '../../../assets/MenuImage/RegisterIcon.png'
import CBTIcon from '../../../assets/MenuImage/CBTIcon.png'

function MenuSlide() {
  const items = [
    { name: "ระบบรับสมัคร", imageUrl: RegisterIcon, link: "/Exam-Announcement" },
    { name: "ระบบ CBT", imageUrl: CBTIcon, link: "/CBT" },
    // { name: "O-NET", imageUrl: "/images/onet.png", link: "/test3" },
    // { name: "V-NET", imageUrl: "/images/vnet.png", link: "/test4" },
    // { name: "B-NET", imageUrl: "/images/bnet.png", link: "/test5" },
    // { name: "I-NET", imageUrl: "/images/inet.png", link: "/test6" },
    // { name: "N-NET", imageUrl: "/images/nnet.png", link: "/test7" },
    // { name: "E-SCORE", imageUrl: "/images/escore.png", link: "/test8" },
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
                className="flex justify-center items-center p-4"
                style={{ width: `${100 / items.length}%` }}
              >
                <div className="flex justify-center items-center flex-col gap-[5px]">
                  <a href={item.link} className="flex flex-col justify-center items-center">
                    <div  className="border-[#082290] border-[0.4rem] sm:border-[0.47rem] w-[7rem] h-[7rem] sm:w-[10rem] sm:h-[10rem] rounded-full overflow-hidden hover:-translate-y-1 duration-300 ease-in-out">
                      <img
                        src={item.imageUrl} // Use the imageUrl from your item object
                        alt={item.name}     // Use the name for alt text
                        className="w-full h-full"
                      />
                    </div>
                    {item.name} {/* Display the name of the item */}
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
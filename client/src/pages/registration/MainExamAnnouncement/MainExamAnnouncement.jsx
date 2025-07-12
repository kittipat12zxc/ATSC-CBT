import React from 'react';

function MainExamAnnouncement() {
  const registrations = [
    {
      title: "การรับสมัครสอบ O-NET",
      period: "วันที่ 1 มกราคม พ.ศ.2568 ถึง วันที่ 31 มกราคม พ.ศ.2568",
      link: "/exam1"
    },
    {
      title: "การรับสมัครสอบ V-NET",
      period: "วันที่ 1 กุมภาพันธ์ พ.ศ.2568 ถึง วันที่ 28 กุมภาพันธ์ พ.ศ.2568",
      link: "/exam2"
    },
    {
      title: "การรับสมัครสอบ B-NET",
      period: "วันที่ 1 มีนาคม พ.ศ.2568 ถึง วันที่ 31 มีนาคม พ.ศ.2568",
      link: "/exam3"
    },
    {
      title: "การรับสมัครสอบ I-NET",
      period: "วันที่ 1 เมษายน พ.ศ.2568 ถึง วันที่ 30 เมษายน พ.ศ.2568",
      link: "/exam4"
    },
    {
      title: "การรับสมัครสอบ N-NET",
      period: "วันที่ 1 พฤษภาคม พ.ศ.2568 ถึง วันที่ 31 พฤษภาคม พ.ศ.2568",
      link: "/exam5"
    },
    {
      title: "การรับสมัครสอบ E-SCORE",
      period: "วันที่ 1 มิถุนายน พ.ศ.2568 ถึง วันที่ 30 มิถุนายน พ.ศ.2568",
      link: "/exam6"
    },
  ];

  return (
    <div className='w-[90%] mx-auto flex flex-col gap-[3rem] mb-[5rem] '>
      {registrations.map((item, index) => (
        <div
          key={index}
          className="border-[#082290] border-l-[0.4rem] pt-[1rem] pb-[2rem] xl:pb-[3rem] px-[1rem] xl:pl-[2rem] bg-[#EFEFEF] relative"
        >
          <h1 className='text-[1.5rem]  xl:text-[2rem]'>{item.title}</h1>
          <p className='text-[1rem] xl:text-[1.5rem] font-light'>ช่วงเวลาที่เปิดรับสมัคร : {item.period}</p>
          <a
            className='text-[1rem] xl:text-[1.5rem] bg-[#082290]  px-[2rem] text-white absolute  bottom-[-0.7rem] xl:bottom-[-1rem]'
            href={item.link}
          >
            สมัครสอบ
          </a>
        </div>
      ))}
    </div>
  );
}

export default MainExamAnnouncement;

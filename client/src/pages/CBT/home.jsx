import { useState, useEffect } from "react";
import axios from "axios";

// Component
import Layout from "../../components/CBT/layout";

function Announcement({
  title,
  subtitle,
  faculty,
  description,
  exam_date_start,
  exam_date_end,
  exam_time_start,
  exam_time_end,
  location,
  subject,
  rules,
  prohibites,
  contact_info,
  footer_message,
  color,
}) {
  const [isOpen, setIsOpen] = useState(false);

  // Tailwind border color based on `color` prop
  const borderColor =
    color === "red"
      ? "border-l-4 border-[#ff6b6b] bg-[#ffecec]"
      : color === "green"
      ? "border-l-4 border-[#51cf66] bg-[#eaffea]"
      : color === "blue"
      ? "border-l-4 border-[#339af0] bg-[#e8f7ff]"
      : "border-l-4 border-gray-400 bg-white";

  return (
    <div
      className={`p-6 rounded-lg mb-4 cursor-pointer transition-shadow duration-300 ${borderColor} hover:shadow-lg`}
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="mb-2">
        <strong className="block font-bold text-[#333] mb-2 text-lg">
          <i className="fa fa-thumb-tack mr-2" aria-hidden="true"></i>
          {title}
        </strong>
        <div className="text-black">
          <p className="ml-4 mb-1">{subtitle}</p>
          <div className="flex justify-between items-center ml-4">
            <p>{faculty}</p>
            <div className="text-xl">{isOpen ? "🔺" : "🔻"}</div>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="mt-2">
          <p className="ml-4 mb-2">
            <strong>รายละเอียด:</strong> {description}
          </p>
          <p className="ml-4 mb-2">
            <strong>วันสอบ:</strong> {exam_date_start} ถึง {exam_date_end}
          </p>
          <p className="ml-4 mb-2">
            <strong>เวลาเริ่มสอบ:</strong> {exam_time_start} ถึง {exam_time_end}
          </p>
          <p className="ml-4 mb-2">
            <strong>สถานที่สอบ:</strong> {location}
          </p>
          <p className="ml-4 mb-2">
            <strong>วิชา:</strong> {subject}
          </p>
          <p className="ml-4 mb-2">
            <strong>กฎระเบียบ:</strong> {rules}
          </p>
          <p className="ml-4 mb-2">
            <strong>สิ่งต้องห้าม:</strong> {prohibites}
          </p>
          <p className="ml-4 mb-2">
            <strong>ข้อมูลติดต่อ:</strong> {contact_info}
          </p>
          <p className="ml-4 mb-2">
            <strong>ข้อความท้ายประกาศ:</strong> {footer_message}
          </p>
        </div>
      )}
    </div>
  );
}

function Home() {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/Home")
      .then((res) => setAnnouncements(res.data))
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  return (
    <Layout>
      <div className="w-full min-h-screen">
        <div className="max-w-6xl mx-auto px-6 my-4">
          <div className="text-center">
            <img
              src='../public/images/BackgroundSDU.png'
              alt="Background SDU"
              className="w-full h-[25rem] rounded-xl shadow-md object-cover"
            />
          </div>

          <div className="bg-white rounded-xl shadow-md p-8 mt-4">
            <h1 className="text-2xl text-black mb-6 flex items-center gap-2">
              <i className="fa fa-bullhorn" aria-hidden="true"></i>{" "}
              ประชาสัมพันธ์
            </h1>
            <div className="max-w-4xl mx-auto">
              {announcements.map((announcement, index) => (
                <Announcement key={index} {...announcement} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Home;

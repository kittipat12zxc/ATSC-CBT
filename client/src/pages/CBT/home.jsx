import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
// --- ⬇️ ADD THESE IMPORTS ⬇️ ---
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// ---------------------------------
// Component
import Layout from "../../components/layout/layout";

// The Announcement component remains unchanged...
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
      {/* ... content of the announcement card ... */}
    </div>
  );
}

function Home() {
  const [announcements, setAnnouncements] = useState([]);
  // --- ⬇️ ADD STATE FOR SLIDESHOW IMAGES ⬇️ ---
  const [slideshowImages, setSlideshowImages] = useState([]);

  // Fetch announcements data
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/cbt/home")
      .then((res) => setAnnouncements(res.data))
      .catch((err) => console.error("Error fetching announcements:", err));
  }, []);

  // --- ⬇️ ADD USEEFFECT TO FETCH SLIDESHOW IMAGES ⬇️ ---
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/images-annouce");
        setSlideshowImages(res.data);
      } catch (error) {
        console.error("Error fetching slideshow images:", error);
      }
    };
    fetchImages();
  }, []); // Empty dependency array means this runs once on component mount

  // --- ⬇️ SLIDESHOW SETTINGS ⬇️ ---
  const slideshowSettings = {
    dots: true, // Show navigation dots
    infinite: true, // Loop the slideshow
    speed: 500, // Transition speed in ms
    slidesToShow: 1, // Show one slide at a time
    slidesToScroll: 1,
    autoplay: true, // Automatically change slides
    autoplaySpeed: 3000, // Change slide every 3 seconds
    fade: true, // Use a fade transition
    cssEase: "linear",
  };

  return (
    <Layout>
      <div className="w-full min-h-screen">
        <div className="max-w-6xl mx-auto px-6 my-4">
          {/* --- ⬇️ REPLACE STATIC IMAGE WITH THE SLIDESHOW ⬇️ --- */}
          <div className="text-center rounded-xl shadow-md overflow-hidden">
            {slideshowImages.length > 0 ? (
              <Slider {...slideshowSettings}>
                {slideshowImages.map((image) => (
                  <div key={image.name}>
                    <img
                      src={image.url}
                      alt={image.name}
                      className="w-full h-[25rem] object-cover"
                    />
                  </div>
                ))}
              </Slider>
            ) : (
              // Fallback if no images are available
              <div className="w-full h-[25rem] bg-gray-200 flex items-center justify-center">
                <p className="text-gray-500">No announcement images found.</p>
              </div>
            )}
          </div>
          {/* -------------------------------------------------------- */}

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
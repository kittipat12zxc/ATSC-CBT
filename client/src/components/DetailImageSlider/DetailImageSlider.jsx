import React, { useState, useEffect } from 'react';


const importAll = (r) =>
  r.keys().map((key) => ({
    src: r(key),
    caption: key.replace('./', '') 
  }));

// ดึงภาพมาจาก Folder เเบบ Dynamic วนลูปจาก uploads-T6611011 
const sliderImages = importAll(
  require.context('./uploads-T6611011', false, /\.(png|jpe?g|gif)$/)
);

function DetailImageSlider() {
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % sliderImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index) => setSlideIndex(index);
  const changeSlide = (step) =>
    setSlideIndex((prev) => (prev + step + sliderImages.length) % sliderImages.length);

  return (
    <div className="w-full">
      
      <div className="w-full mx-auto relative aspect-[16/5]  overflow-hidden rounded-lg shadow-lg">
        {sliderImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === slideIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            <img
              src={image.src}
              alt={image.caption}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
              {index + 1} / {sliderImages.length}
            </div>
          </div>
        ))}

     
        <button
          className="cursor-pointer absolute top-1/2 left-3 transform -translate-y-1/2 z-20 text-white text-3xl font-bold p-2 bg-black bg-opacity-40 hover:bg-opacity-70 rounded-full transition-colors"
          onClick={() => changeSlide(-1)}
          aria-label="Previous slide"
        >
          ❮
        </button>
        <button
          className="cursor-pointer absolute top-1/2 right-3 transform -translate-y-1/2 z-20 text-white text-3xl font-bold p-2 bg-black bg-opacity-40 hover:bg-opacity-70 rounded-full transition-colors"
          onClick={() => changeSlide(1)}
          aria-label="Next slide"
        >
          ❯
        </button>
      </div>

    
      <div className="w-full mt-4 flex justify-center items-center space-x-2">
        {sliderImages.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goToSlide(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`h-2 w-2 rounded-full cursor-pointer transition-all ${
              idx === slideIndex
                ? 'bg-blue-800 scale-125'
                : 'bg-gray-400 hover:bg-gray-500'
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
}

export default DetailImageSlider;

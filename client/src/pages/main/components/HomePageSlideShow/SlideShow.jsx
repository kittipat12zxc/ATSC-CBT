import React, { useState, useEffect } from 'react';
import axios from 'axios';

function SlideShow() {
    const [images, setImages] = useState([]);
    const [slideIndex, setSlideIndex] = useState(0);

    useEffect(() => {
  const fetchImages = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/images');
      console.log('Fetched images from server:', res.data); // ✅ add this
        
      setImages(res.data);
    } catch (err) {
      console.error("Error fetching images", err);
    }
  };
  fetchImages();
}, []);

    useEffect(() => {
        const timer = setInterval(() => {
            setSlideIndex((prev) => (prev + 1) % images.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [images]);

    const goToSlide = (index) => setSlideIndex(index);
    const changeSlide = (step) => setSlideIndex((prev) => (prev + step + images.length) % images.length);

    if (images.length === 0) return <div className="text-center py-10">No banner images uploaded yet.</div>;

    return (
        <>
            <div className="max-w-[90%] mx-auto relative h-[25vw] overflow-hidden rounded-[15px] w-[1800px] h-[30vw]">
                {images.map((image, index) => (
                    <div
                        key={index}
                        className={`flex justify-center items-center transition-opacity duration-700 ease-in-out ${index === slideIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
                            } absolute inset-0`}
                    >
                        <div key={index}>
                            <p className="text-white absolute z-50">{image.name}</p>
                            <img src={image.url} alt={`slide-${index}`} className="w-full h-full object-cover" />
                        </div>
                            
                        <div className="absolute top-0 left-0 text-white text-xs p-2">
                            {index + 1} / {images.length}
                        </div>
                    </div>
                ))}

                <button
                    className="cursor-pointer absolute top-1/2 left-2 transform -translate-y-1/2 z-30 text-white text-2xl font-bold px-2 bg-[rgba(17,17,17,0.4)] hover:bg-[rgba(17,17,17,0.7)] rounded"
                    onClick={() => changeSlide(-1)}
                >
                    ❮
                </button>
                <button
                    className="cursor-pointer absolute top-1/2 right-2 transform -translate-y-1/2 z-30 text-white text-2xl font-bold px-2 bg-[rgba(17,17,17,0.4)] hover:bg-[rgba(17,17,17,0.7)] rounded"
                    onClick={() => changeSlide(1)}
                >
                    ❯
                </button>
            </div>

            <div className="w-[90%] mt-[1rem] mx-auto flex justify-center items-center">
                {images.map((_, idx) => (
                    <span
                        key={idx}
                        onClick={() => goToSlide(idx)}
                        className={`inline-block mx-[5px] h-4 w-4 rounded-full cursor-pointer ${idx === slideIndex ? 'bg-gray-800' : 'bg-gray-400'
                            }`}
                    ></span>
                ))}
            </div>
        </>
    );
}

export default SlideShow;
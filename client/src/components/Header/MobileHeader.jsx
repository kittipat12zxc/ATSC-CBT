// MobileHeader.jsx
import React, { useState } from "react";
import Menu from "./Menu";

const MobileHeader = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative">
            {/* MobileHeader */}
            <div
                className={`fixed top-0 left-0 h-full bg-[rgba(17,17,17,0.9)] text-white z-50 pt-16 transition-all duration-500 overflow-x-hidden ${isOpen ? "w-64" : "w-0"
                    }`}
            >
                <button
                    className="absolute top-0 right-6 text-4xl"
                    onClick={() => setIsOpen(false)}
                >
                    &times;
                </button>
                <div className='flex flex-col xl:hidden'>
                    <Menu></Menu>
                </div>
            </div>

            {/* Main Content */}
            <div
                className={`transition-all duration-500 p-4 ${isOpen ? "ml-0" : "ml-0"
                    }`}
            >

                <span
                    className="text-3xl cursor-pointer xl:hidden"
                    onClick={() => setIsOpen(true)}
                >
                    &#9776;
                </span>
            </div>
        </div>
    );
};

export default MobileHeader;

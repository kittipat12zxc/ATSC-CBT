/* global customTranslations */
import React, { useState, useRef, useEffect } from 'react';
import ThaiFlag from '../../assets//Flags/ThailandFlag.png';
import UKFlag from '../../assets//Flags/UKFlag.png';


function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState('th');
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsOpen(prev => !prev);

  const handleSelectLanguage = (lang) => {
    setLanguage(lang);
    setIsOpen(false);

    const languageSelect = document.querySelector("select.goog-te-combo");
    if (!languageSelect) {
      console.warn("Google Translate ยังโหลดไม่เสร็จ");
      return;
    }

    if (lang === "th") {
      // Reset translate
      document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      window.location.reload();
    } else {
      // Set language
      languageSelect.value = lang;
      languageSelect.dispatchEvent(new Event("change"));
      setTimeout(() => {
        if (typeof customTranslations === 'function') {
          customTranslations();
           
        }
      }, 800);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentFlag = language === 'th' ? ThaiFlag : UKFlag;
  const currentLabel = language === 'th' ? 'ไทย' : 'ENG';

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="inline-flex items-center px-3 py-2 text-black bg-gray-200 hover:bg-gray-300 rounded-md focus:outline-none"
      >
        <img src={currentFlag} alt={currentLabel} className="h-5 mr-2" />
        {currentLabel}
        <svg className="ml-2 w-4 h-4 fill-current" viewBox="0 0 20 20">
          <path d="M5.516 7.548L10 12.032l4.484-4.484 1.032 1.032L10 14.096 4.484 8.58z" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-50">
          <button
            onClick={() => handleSelectLanguage('th')}
            className="w-full flex items-center px-4 py-2 hover:bg-gray-100 text-gray-800"
          >
            <img src={ThaiFlag} alt="ไทย" className="h-5 mr-2" />
            ไทย
          </button>
          <button
            onClick={() => handleSelectLanguage('en')}
            className="w-full flex items-center px-4 py-2 hover:bg-gray-100 text-gray-800"
          >
            <img src={UKFlag} alt="ENG" className="h-5 mr-2" />
            ENG
          </button>
        </div>
      )}
    </div>
  );
}

export default LanguageSwitcher;



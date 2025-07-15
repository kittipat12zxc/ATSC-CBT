import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/atsc.png'
import Translate from '../LanguageSwitcher/LanguageSwitcher'
import Menu from './Menu'
import MobileHeader from './MobileHeader'


function Header() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 0);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    return (
        <>
            <div className='flex w-full justify-between px-[3em] py-[0.3rem] bg-[#082290] text-[1rem] text-white'>
                <p>ศูนย์บริการทดสอบทางวิชาการ มหาวิทยาลัยสวนดุสิต</p>
                <p className='hidden xl:flex'>ACADEMIC TESTING SERVICE CENTER SUAN DUSIT UNIVERSITY</p>
            </div>
            <div className={`sticky top-0 z-50  bg-white transition-shadow duration-300 ${scrolled ? 'shadow-lg' : ''}`}>
                <div className="flex justify-between items-center px-[1rem] xl:px-[5rem] ">
                    <div ><Link to='/'><img className='min-w-[25vw] w-[25vw] md:min-w-[15vw] md:w-[15vw] xl:min-w-[10em] xl:w-[10em]' src={logo} alt="Logo" /></Link></div>
                    <div className='flex justify-center items-center'>
                        <div className="hidden xl:flex">
                            <Menu></Menu>
                        </div>
                        <div className='flex justify-center items-center p-[5px] ml-[2rem] rounded-[5px] gap-[1rem]'>
                            <Translate></Translate>
                        </div>
                        <MobileHeader></MobileHeader>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Header
import React from 'react'
import SlideShow from './components/HomePageSlideShow/SlideShow'
import MenuSlide from './components/HomePageMenuSlide/MenuSlide'
import Vector from '../../assets/Icon/Vector.svg'
import Header from '../../Components/Header/PCHeader'
import Footer from '../../Components/Footer/Footer'

function HomePage() {
  return (
    <>
    <Header/>
      <SlideShow></SlideShow>
      <div className='relative flex after:bg-[#082290] after:h-[5px] after:top-1/2 after:translate-y-[-50%] after:z-[-20] after:absolute after:w-full'>
        <div className='bg-[#082290] text-white px-[1.5rem] rounded-e-[100px] flex justify-start items-center'>
          <h1 className=' text-[1rem] sm:text-[1.5rem] xl:text-[2rem] whitespace-nowrap flex'><img src={Vector} alt="" className='w-[1rem] sm:w-[1.5rem] xl:w-[2rem] mr-[0.5rem] xl:mr-[1rem]' />ระบบการสอบ</h1>
        </div>

      </div>
      <MenuSlide></MenuSlide>
      <Footer />
    </>
  )
}

export default HomePage
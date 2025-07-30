import React from 'react'
import Header from '../../Components/Header/PCHeader'
import Footer from '../../Components/Footer/Footer'

function NotFound() {
 
  return (
    <>
    <Header/>
    <div className='flex justify-center items-center h-[calc(100vh-14rem)]'>404 NotFound</div>
    <Footer/>
    </>
  )
}

export default NotFound
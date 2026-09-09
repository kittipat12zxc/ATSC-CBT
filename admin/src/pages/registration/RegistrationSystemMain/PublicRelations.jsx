import LeftSideBarAdmin from '../../../components/LeftSideBarAdmin';


function PublicRelations() {

  return (
    <div className="bg-gray-50 min-h-screen">
      <LeftSideBarAdmin />

      <main className="ml-80 p-6 font-sans text-gray-800">
        <div className='max-w-[97%] mx-auto mt-[30px] w-full font-sans text-gray-800'>
          {/* Header ของ ระบบสมัครสอบ */}
          <div className='flex items-center border-b-4 border-black pb-4'>
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-person-lines-fill" viewBox="0 0 16 16">
              <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5m.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1z" />
            </svg>
            <a href='/RegistrationSystemAdmin' className='text-[25px] ml-[10px]'>ระบบสมัครสอบ</a>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" className="mt-1" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708" />
            </svg>
            <h1 className="text-[25px] ml-[10px]">ประชาสัมพันธ์</h1>
          </div>

          {/* ส่วนประชาสัมพันธ์ */}
          <section className='max-w-[95%] mx-auto mt-[80px] w-full'>
            ส่วนประชาสัมพันธ์
          </section>
        </div>
      </main>
    </div>
  )
}

export default PublicRelations
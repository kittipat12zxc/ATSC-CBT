import { Link } from 'react-router-dom';
import LeftSideBarAdmin from '../../components/LeftSideBarAdmin';

function RegistrationSystemAdmin() {

  // ไอคอนรูปคน
  const UserIcon = ({ className }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
    </svg>
  );

  // ไอคอรโทรโข่ง
  const Megaphone = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className={className}>
      <path stroke-linecap="round" stroke-linejoin="round" d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 1 1 0-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 0 1-1.44-4.282m3.102.069a18.03 18.03 0 0 1-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 0 1 8.835 2.535M10.34 6.66a23.847 23.847 0 0 0 8.835-2.535m0 0A23.74 23.74 0 0 0 18.795 3m.38 1.125a23.91 23.91 0 0 1 1.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 0 0 1.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 0 1 0 3.46" />
    </svg>
  );

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
            <h1 className='text-[25px] ml-[10px]'>ระบบสมัครสอบ</h1>
          </div>



          {/* เมนู */}
          <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-[95%] mx-auto mt-[80px] w-full">
            <Link to="/RegistrationSystemAdmin/PublicRelations">
              <div className="group rounded-2xl flex flex-col gap-4 items-center justify-center w-full py-8 px-4 text-white cursor-pointer bg-gradient-to-r from-[#0a183d] to-[#1e3a8a] shadow-lg hover:shadow-2xl transition-all duration-500 ease-in-out hover:from-[#1e3a8a] hover:to-[#0a183d] hover:scale-105">
                <Megaphone className="w-[3.5rem] h-[3.5rem] text-white transition-transform duration-300 group-hover:scale-110" />
                <p className="text-xl font-semibold tracking-wide">ประชาสัมพันธ์</p>
              </div>
            </Link>

            <Link to="/RegistrationSystemAdmin/ListSubject">
              <div className="group rounded-2xl flex flex-col gap-4 items-center justify-center w-full py-8 px-4 text-white cursor-pointer bg-gradient-to-r from-[#0a183d] to-[#1e3a8a] shadow-lg hover:shadow-2xl transition-all duration-500 ease-in-out hover:from-[#1e3a8a] hover:to-[#0a183d] hover:scale-105">
                <UserIcon className="w-[3.5rem] h-[3.5rem] text-white transition-transform duration-300 group-hover:scale-110" />
                <p className="text-xl font-semibold tracking-wide">รายชื่อผู้เข้าสอบ</p>
              </div>
            </Link>
          </section>

        </div>
      </main>
    </div>
  );
}

export default RegistrationSystemAdmin;

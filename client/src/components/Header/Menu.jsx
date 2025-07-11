import React from 'react'
import { Link } from 'react-router-dom'

function Menu() {
    return (
        <ul className="gap-[1.5rem] xl:gap-[5rem] text-[1.2rem] pl-[2rem] xl:pl-[0px] font-medium text-white xl:text-[#082290] flex flex-col xl:flex-row justify-center items-start xl:items-center ">
            <li>
                <Link to='/'>แนะนำ</Link>
            </li>
            <li>
                <Link to='/'>ข้อมูลข่าวสาร</Link>
            </li>
            <li>
                <Link to='/'>ดาวน์โหลด</Link>
            </li>
            <li>
                <Link to='/'>ติดต่อ</Link>
            </li>

        </ul>
    )
}

export default Menu
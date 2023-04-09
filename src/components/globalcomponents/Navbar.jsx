import React from "react";
import "../../assets/styles/globalcomponents/Navbar.css";
import logo from "../../assets/images/logo.png";
import minilogo from "../../assets/images/aztu_s_logo.png";
const Navbar = () => {
  return (
    <div className='bg-[#0E205B] flex justify-center'>
      <div className='container fixed z-50 bg-[#0E205B]'>
        <div className='flex justify-between items-center'>
          <div className="ml-10">
            <img src={minilogo} />
          </div>
          <ul className="flex text-white text-2xl space-x-5 my-5 mr-5">
            <li className="cursor-pointer hover:border-b hover:relative hover:top-[-1px]">Haqqımızda</li>
            <li className="cursor-pointer hover:border-b hover:relative hover:top-[-1px]">Təhsil</li>
            <li className="cursor-pointer hover:border-b hover:relative hover:top-[-1px]">Tədqiqat</li>
            <li className="cursor-pointer hover:border-b hover:relative hover:top-[-1px]">Beynəlxalq əlaqələr</li>
            <li className="cursor-pointer hover:border-b hover:relative hover:top-[-1px]">Əlaqə</li>
            <li className="cursor-pointer hover:border-b hover:relative hover:top-[-1px]">Daxil ol</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

import React, { useContext } from "react";
import { Context } from "../../Context";
import { Link } from "react-router-dom";
import "../../assets/styles/globalcomponents/Navbar.css";
import logo from "../../assets/images/logo.png";
import minilogo from "../../assets/images/aztu_s_logo.png";
const Navbar = () => {
  const { token, setToken } = useContext(Context);
  const handleClick = () => {
    setToken("");
    sessionStorage.removeItem("token");
  };
  return (
    <div className='bg-[#0E205B] w-full fixed z-50 flex justify-center'>
      <div className='container bg-[#0E205B]'>
        <div className='flex justify-between items-center'>
          <div className='ml-10'>
            <Link to='/'>
              {" "}
              <img src={minilogo} />
            </Link>
          </div>
          <ul className='flex text-white text-2xl space-x-5 my-5 mr-5'>
            <li className='cursor-pointer hover:border-b hover:relative hover:top-[-1px]'>
              Haqqımızda
            </li>
            <li className='cursor-pointer hover:border-b hover:relative hover:top-[-1px]'>
              Əlaqə
            </li>
            {token && (
              <li className='cursor-pointer hover:border-b hover:relative hover:top-[-1px]'>
                <Link to="/library">Kitabxana</Link>
              </li>
            )}
            {token ? (
              <li
                onClick={handleClick}
                className='cursor-pointer hover:border-b hover:relative hover:top-[-1px]'
              >
                Hesabdan çıxış
              </li>
            ) : (
              <Link
                to='login'
                className='cursor-pointer hover:border-b hover:relative hover:top-[-1px]'
              >
                Daxil ol
              </Link>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

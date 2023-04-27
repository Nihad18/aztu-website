import React from 'react'
import { Outlet } from 'react-router';
import Navbar from "./components/globalcomponents/Navbar"
import Footer from './components/globalcomponents/Footer';
const Layout = () => {
    return (
      <div>
        <Navbar />
        <div>
          <Outlet />
        </div>
        <Footer/>
      </div>
    );
  };
  
  export default Layout;
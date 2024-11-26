import React from 'react';
import {Link} from 'react-router-dom';
import { FiMenu } from "react-icons/fi";
import {AiFillCloseCircle} from 'react-icons/ai';
import Footer from '../Components/Footer.jsx';

const HomeLayout = ({ children }) => {

  const changeWidth =()=>{
    const drawerSide = document.getElementsByClassName('drawer-side');
    drawerSide[0].style.width = 'auto';
  }

  const hideDrawer =()=>{
    const element = document.getElementsByClassName('drawer-toggle');
    element[0].checked = false;

    // changeWidth();
  }

  return (
    <div className='min-h-[90vh] bg-gray-700'>
      <div className="drawer absolute left-0 z-50 w-fit">
        <input type="checkbox" id='my-drawer' className="drawer-toggle" />

        <div className="drawer-content">
          <label htmlFor="my-drawer" className='cursor-pointer relative'>
            <FiMenu onClick= {changeWidth} size={"32px"} className="font-bold text-white m-4"/>
          </label>
        </div>

        <div className="drawer-side w-0">
          <label htmlFor="my-drawer" className='drawer-overlay'>

          </label>

          <ul className="menu p-4 w-48 sm:w-80 text-white bg-gray-700 relative">
              <li className='w-fit right-2 absolute z-50'>
                <button onClick={hideDrawer}>
                  <AiFillCloseCircle size={24}/>
                </button>
              </li>

              <li>
                <Link to = "/">HOME</Link>
              </li>

              <li>
                <Link to = "/courses">COURSES</Link>
              </li>

              <li>
                <Link to = "/contact">CONTACT US</Link>
              </li>

              <li>
                <Link to = "/about">ABOUT US</Link>
              </li>
          </ul>

        </div>
      </div>

      {children}

      <Footer/>
    </div>
  )
}

export default HomeLayout

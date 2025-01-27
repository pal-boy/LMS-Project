import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { FiMenu } from "react-icons/fi";
import {AiFillCloseCircle} from 'react-icons/ai';
import Footer from '../Components/Footer.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/slices/AuthSlice.js';

const HomeLayout = ({ children }) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // for checking if user is logged in or not
  const isLoggedIn = useSelector((state)=>state?.auth?.isLoggedIn);

  // for accessing to what content acc to role
  const role = useSelector((state)=>state?.auth?.role);
  // console.log("role", role);

  const changeWidth =()=>{
    const drawerSide = document.getElementsByClassName('drawer-side');
    drawerSide[0].style.width = 'auto';
  }

  const hideDrawer =()=>{
    const element = document.getElementsByClassName('drawer-toggle');
    element[0].checked = false;

    // changeWidth();
  };

  const handleLogout = async(e)=>{
    e.preventDefault();
    const res = await dispatch(logout());
    if(res?.payload?.success){
      navigate('/');
    }
  }

  return (
    <div className='min-h-[10vh] bg-gray-700'>
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

          <ul className="menu p-4 h-[90vh] w-48 sm:w-80 text-white bg-gray-700 relative">
              <li className='w-fit right-2 absolute z-50'>
                <button onClick={hideDrawer}>
                  <AiFillCloseCircle size={24}/>
                </button>
              </li>

              <li>
                <Link to = "/">HOME</Link>
              </li>
              {isLoggedIn && role==='ADMIN' && (
                <li>
                  <Link to = '/admin/dashboard'>Admin Dashboard</Link>
                </li>
              )}
              {isLoggedIn && role==='ADMIN' && (
                <li>
                  <Link to = '/course/create'>Create Course</Link>
                </li>
              )}

              <li>
                <Link to = "/courses">COURSES</Link>
              </li>

              <li>
                <Link to = "/contact">CONTACT US</Link>
              </li>

              <li>
                <Link to = "/about">ABOUT US</Link>
              </li>

              {!isLoggedIn && (
                <li className="absolute top-[40rem] w-[90%]">
                  <div className="w-full flex items-center justify-center">
                    <button className='btn-primary border border-red-400 hover:bg-red-400 px-4 py-1 font-semibold rounded-md w-full  transition-all ease-in-out duration-300'>
                      <Link to="/login">Login</Link>
                    </button>

                    <button className='btn-secondary border border-red-400 hover:bg-red-400 px-4 py-1 font-semibold rounded-md w-full transition-all ease-in-out duration-300'>
                      <Link to="/signup">Signup</Link>
                    </button>
                  </div>
                </li>
              )}

              {isLoggedIn && (
                <li className="absolute top-[40rem] w-[90%]">
                  <div className="w-full flex items-center justify-center">
                    <button className='btn-primary border border-red-400 hover:bg-red-400 px-4 py-1 font-semibold rounded-md w-full  transition-all ease-in-out duration-300'>
                      <Link to="/user/profile">Profile</Link>
                    </button>

                    <button className='btn-secondary border border-red-400 hover:bg-red-400 px-4 py-1 font-semibold rounded-md w-full transition-all ease-in-out duration-300'>
                      <Link onClick={handleLogout}>Logout</Link>
                    </button>
                  </div>
                </li>
              )}

          </ul>

        </div>
      </div>

      {children}

      <Footer/>
    </div>
  )
}

export default HomeLayout

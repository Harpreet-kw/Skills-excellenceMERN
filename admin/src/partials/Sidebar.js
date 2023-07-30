import React, { useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
// import registerImage from "../images/register.png";
// import logo from '../images/lawZoneW.jpg'
import './index.less'

function Sidebar({
  sidebarOpen,
  setSidebarOpen
}) {

  const location = useLocation();
  const { pathname } = location;
  const page = pathname.split('/')[1];

  const trigger = useRef(null);
  const sidebar = useRef(null);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (!sidebarOpen || sidebar.current.contains(target) || trigger.current.contains(target)) return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  return (
    <div className="lg:w-64">
      {/* Sidebar backdrop (mobile only) */}
      <div className={`fixed inset-0 bg-white shadow-lg bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} aria-hidden="true"></div>

      {/* Sidebar */}
      <div
        id="sidebar"
        ref={sidebar}
        className={`absolute z-40 border-r-2 border-gray-200 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 transform h-screen overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 flex-shrink-0 bg-white shadow-lg p-4 transition-transform duration-200 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-64'}`}
      >

        {/* Sidebar header */}
        <div className="flex justify-between pr-3 mb-4 lg:justify-center sm:px-2">
          
          {/* Logo */}
          <NavLink exact to="/" className="block">
            <div className="flex justify-between">
              <div className='h-[60px] border-b-2'>
               {/* <img style={{ height: "150px"}} src={logo} type="image" alt='...' /> */}
               <h2 className='text-2xl font-bold'>Skill Excellence</h2>
              </div>
            </div>
          </NavLink>
          {/* Close button */}
          <button
            ref={trigger}
            className="h-10 -mr-8 text-gray-500 bg-gray-200 rounded-full shadow-lg lg:hidden hover:text-gray-400"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            aria-expanded={sidebarOpen}
          >
            <span className="sr-only">Close sidebar</span>
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
            </svg>
          </button>
        </div>

        {/* Links */}
        <div>
          <h3 className="pl-3 text-xs font-semibold text-gray-500 uppercase">Pages</h3>
          <ul className="mt-3">
            
              {/* Dashboard */}
                <li className={`px-3 py-3 rounded-sm last:mb-0 ${page === '' || page === 'landing'  ? 'bg-blue-500' : 'hover:bg-gray-200'}`}>
                  <NavLink exact to="/" className={`block text-gray-200 hover:text-white transition duration-150 ${page === '' || page === 'landing' && 'bg-blue-500 hover:text-gray-200'}`}>
                    <div className="flex flex-grow">
                      <svg className="flex-shrink-0 w-6 h-6 mr-3" viewBox="0 0 24 24">
                        <path className={`fill-current text-gray-400 ${page === '' && 'text-indigo-500'}`} d="M12 0C5.383 0 0 5.383 0 12s5.383 12 12 12 12-5.383 12-12S18.617 0 12 0z" />
                        <path className={`fill-current text-gray-600 ${page === '' && 'text-indigo-600'}`} d="M12 3c-4.963 0-9 4.037-9 9s4.037 9 9 9 9-4.037 9-9-4.037-9-9-9z" />
                        <path className={`fill-current text-gray-400 ${page === '' && 'text-indigo-200'}`} d="M12 15c-1.654 0-3-1.346-3-3 0-.462.113-.894.3-1.285L6 6l4.714 3.301A2.973 2.973 0 0112 9c1.654 0 3 1.346 3 3s-1.346 3-3 3z" />
                      </svg>
                      <span className="text-lg font-medium text-black">Dashboard</span>
                    </div>
                  </NavLink>
                </li>

              {/* Students list */}
              <li className={`px-3 py-3 rounded-sm last:mb-0 ${page === 'events' ? 'bg-blue-500' : 'hover:bg-gray-200'}`}>
                  <NavLink exact to="/events" className={`block text-gray-200 hover:text-white transition duration-150 ${page === 'events' && 'hover:text-gray-200'}`}>
                    <div className="flex flex-grow">
                      <svg className="flex-shrink-0 w-6 h-6 mr-3" viewBox="0 0 24 24">
                        <path className={`fill-current text-gray-400 ${page === 'events' && 'text-indigo-300'}`} d="M7 0l6 7H8v10H6V7H1z" />
                        <path className={`fill-current text-gray-600 ${page === 'events' && 'text-indigo-500'}`} d="M18 7v10h5l-6 7-6-7h5V7z" />
                      </svg>
                      <span className="text-lg font-medium text-black">Events</span>
                    </div>
                  </NavLink>
              </li>

              {/* fees */}
              <li className={`px-3 py-3 rounded-sm last:mb-0 ${page === 'jobs' ? 'bg-blue-500' : 'hover:bg-gray-200'}`}>
                  <NavLink exact to="/jobs" className={`block text-gray-200 hover:text-white transition duration-150 ${page === 'jobs' && 'hover:text-gray-200'}`}>
                    <div className="flex flex-grow">
                      <img alt="" style={{height: '25px'}} src="https://img.icons8.com/dotty/80/000000/stack.png"/>
                      <span className="ml-3 text-lg font-medium text-black mt-2">jobs</span>
                    </div>
                  </NavLink>
              </li>
              {/* Courses */}
              <li className={`px-3 py-3 rounded-sm last:mb-0 ${page === 'courses' ? 'bg-blue-500' : 'hover:bg-gray-200'}`}>
                  <NavLink exact to="/courses" className={`block text-gray-200 hover:text-white transition duration-150 ${page === 'courses' && 'hover:text-gray-200'}`}>
                    <div className="flex flex-grow">
                      <img alt="" style={{height: '25px'}} src="https://img.icons8.com/external-others-phat-plus/64/external-courses-online-courses-outline-others-phat-plus-31.png"/>
                      <span className="ml-3 text-lg font-medium text-black">Courses</span>
                    </div>
                  </NavLink>
              </li>
              
              <li className={`px-3 py-3 rounded-sm last:mb-0 ${page === 'services' ? 'bg-blue-500' : 'hover:bg-gray-200'}`}>
                  <NavLink exact to="/services" className={`block text-gray-200 hover:text-white transition duration-150 ${page === 'services' && 'hover:text-gray-200'}`}>
                    <div className="flex flex-grow">
                      <img alt="" style={{height: '25px'}} src="https://img.icons8.com/ios/50/service--v1.png"/>
                      <span className="ml-3 text-lg font-medium text-black">Services</span>
                    </div>
                  </NavLink>
              </li>
              
              <li className={`px-3 py-3 rounded-sm last:mb-0 ${page === 'users' ? 'bg-blue-500' : 'hover:bg-gray-200'}`}>
                  <NavLink exact to="/users" className={`block text-gray-200 hover:text-white transition duration-150 ${page === 'users' && 'hover:text-gray-200'}`}>
                    <div className="flex flex-grow">
                      <img alt="" style={{height: '25px'}} src="https://img.icons8.com/ios-glyphs/30/group.png"/>
                      <span className="ml-3 text-lg font-medium text-black">Users</span>
                    </div>
                  </NavLink>
              </li>

              {/* <li className={`px-3 py-3 rounded-sm last:mb-0 ${page === 'videos' ? 'bg-blue-500' : 'hover:bg-gray-200'}`}>
                  <NavLink exact to="/videos" className={`block text-gray-200 hover:text-white transition duration-150 ${page === 'videos' && 'hover:text-gray-200'}`}>
                    <div className="flex flex-grow">
                      <img alt="" style={{height: '25px'}} src="https://img.icons8.com/ios-glyphs/30/group.png"/>
                      <span className="ml-3 text-lg font-medium text-black">Videos</span>
                    </div>
                  </NavLink>
              </li> */}
          </ul>
        </div>

      </div>
    </div>
  );
}

export default Sidebar;
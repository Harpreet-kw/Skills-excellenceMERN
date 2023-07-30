import React from 'react';
// import SearchModal from './header/SearchModal';
// import Notifications from './header/Notifications';
// import Help from './header/Help';
import UserMenu from './header/UserMenu';
// import logo from '../images/lawZoneW.jpg'

function Header({
  sidebarOpen,
  setSidebarOpen
}) {
  return (
    <header className="sticky top-0 z-30 bg-white border-b border-gray-200">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 -mb-px">

          {/* Header: Left side */}
          <div className="flex">

            {/* Hamburger button */}
            <button
              className="text-gray-500 hover:text-gray-600 lg:hidden"
              aria-controls="sidebar"
              aria-expanded={sidebarOpen}
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <span className="sr-only">Open sidebar</span>
              {/* <img style={{ height: "50px"}} src={'logo'} type="image" alt='...' /> */}
              <h2 className='text-3xl'>SKILL Excellence</h2>
            </button>

          </div>

          {/* Header: Right side */}
          <div className="flex items-center">

            {/* <SearchModal /> */}
            {/* <Notifications /> */}
            {/* <Help /> */}
            {/*  Divider */}
            <hr className="w-px h-6 mx-3 bg-gray-200" />
            <UserMenu />

          </div>

        </div>
      </div>
    </header>
  );
}

export default Header;
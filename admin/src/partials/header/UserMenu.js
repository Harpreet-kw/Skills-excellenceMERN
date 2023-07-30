import React, { useState, useRef, useEffect } from 'react';
import Transition from '../../utils/Transition';

import { useLocation, useNavigate } from 'react-router-dom';

function UserMenu() {
  const history = useLocation()
  const navigate = useNavigate()
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const trigger = useRef(null);
  const dropdown = useRef(null);

  const logoutHandle =()=>{
    setDropdownOpen(!dropdownOpen);
    sessionStorage.removeItem('login')
    navigate('/login')
    // history.reload()
  }

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!dropdownOpen || dropdown?.current?.contains(target) || trigger?.current?.contains(target)) return;
      setDropdownOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  return (
    <div className="relative inline-flex">
      <button
        ref={trigger}
        className="inline-flex items-center justify-center group"
        aria-haspopup="true"
        onClick={() => setDropdownOpen(!dropdownOpen)}
        aria-expanded={dropdownOpen}
      >
        {/* <img className="flex-shrink-0 w-3 h-3 ml-1 text-gray-400 fill-current" src="https://www.linkpicture.com/q/logo_23.jpeg" type="image" alt='...' /> */}
        {/* <img className="w-8 h-8 rounded-full" src={logo} width="32" height="32" alt="User" /> */}
        <h2 className=''>Skills Excellence</h2>
        <div className="flex items-center truncate">
          <span className="ml-2 text-sm font-medium truncate group-hover:text-gray-800">Admin</span>
          <svg className="flex-shrink-0 w-3 h-3 ml-1 text-gray-400 fill-current" viewBox="0 0 12 12">
            <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
          </svg>
        </div>
      </button>

      <Transition
        className="origin-top-right z-10 absolute top-full right-0 min-w-44 bg-white border border-gray-200 py-1.5 rounded shadow-lg overflow-hidden mt-1"
        show={dropdownOpen}
        enter="transition ease-out duration-200 transform"
        enterStart="opacity-0 -translate-y-2"
        enterEnd="opacity-100 translate-y-0"
        leave="transition ease-out duration-200"
        leaveStart="opacity-100"
        leaveEnd="opacity-0"
      >
        <div
          ref={dropdown}
          onFocus={() => setDropdownOpen(true)} 
          onBlur={() => setDropdownOpen(false)}
        >
          <div className="pt-0.5 pb-2 px-3 mb-1 border-b border-gray-200">
            <div className="font-medium text-gray-800">Skill Excellence</div>
            <div className="text-xs italic text-gray-500">Admin</div>
          </div>
          <ul>
            <li>
              <div
                className="flex items-center px-3 py-1 text-sm font-medium text-indigo-500 cursor-pointer hover:text-indigo-600"
                // to="/"
                onClick={() => logoutHandle()}
              >
                Sign Out
              </div>
            </li>
          </ul>
        </div>
      </Transition>
    </div>
  )
}

export default UserMenu;
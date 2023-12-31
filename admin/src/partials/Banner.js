/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';

function Banner() {

  const [bannerOpen, setBannerOpen] = useState(false);

  return (
    <>
      {bannerOpen && (
        <div className="fixed bottom-0 right-0 w-full md:bottom-8 md:right-12 md:w-auto z-60">
          <div className="flex justify-between p-3 text-sm bg-gray-800 shadow-lg text-gray-50 md:rounded-xl rounded-xl">
            <div> <a className="hover:underline" href="#"  rel="noreferrer">Chat with us!</a></div>
            <button className="ml-5 text-gray-500 hover:text-gray-400" onClick={() => setBannerOpen(false)}>
              <span className="sr-only">Close</span>
              <svg className="flex-shrink-0 w-4 h-4 fill-current" viewBox="0 0 16 16">
                <path d="M12.72 3.293a1 1 0 00-1.415 0L8.012 6.586 4.72 3.293a1 1 0 00-1.414 1.414L6.598 8l-3.293 3.293a1 1 0 101.414 1.414l3.293-3.293 3.293 3.293a1 1 0 001.414-1.414L9.426 8l3.293-3.293a1 1 0 000-1.414z" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Banner;
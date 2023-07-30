import React from "react";

const PageHead = ({ title, subTitle, breadcrumbs, children, bgNone, button }) => {

  return (
    <div>
      <>
        <div className="absolute bg-gray-200 w-full h-full">
          {/* Page title starts */}
          <div className="my-6 lg:my-12 px-6 mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between pb-4 border-b border-gray-300">
            <div>
              <h4 className="text-2xl font-bold leading-tight text-gray-800">{title}</h4>
              {/* <ul className="flex flex-col md:flex-row items-start md:items-center text-gray-600 text-sm mt-3">
                <li className="flex items-center mr-3 mt-3 md:mt-0">
                  <span className="mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-paperclip" width={16} height={16} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z" />
                      <path d="M15 7l-6.5 6.5a1.5 1.5 0 0 0 3 3l6.5 -6.5a3 3 0 0 0 -6 -6l-6.5 6.5a4.5 4.5 0 0 0 9 9 l6.5 -6.5" />
                    </svg>
                  </span>
                  <span>{subTitle}</span>
                </li>
                <li className="flex items-center mr-3 mt-3 md:mt-0">
                  <span className="mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-trending-up" width={16} height={16} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z" />
                      <polyline points="3 17 9 11 13 15 21 7" />
                      <polyline points="14 7 21 7 21 14" />
                    </svg>
                  </span>
                  <span> Home</span>
                </li>
                <li className="flex items-center mt-3 md:mt-0">
                  <span className="mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-plane-departure" width={16} height={16} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z" />
                      <path d="M15 12h5a2 2 0 0 1 0 4h-15l-3 -6h3l2 2h3l-2 -7h3z" transform="rotate(-15 12 12) translate(0 -1)" />
                      <line x1={3} y1={21} x2={21} y2={21} />
                    </svg>
                  </span>
                </li>
              </ul> */}
            </div>
            <div className="mt-6 lg:mt-0">
              {button}
            </div>
          </div>
          {/* Page title ends */}
          <div className="container mx-auto px-6">
            {/* Remove class [ h-64 ] when adding a card block */}
            {/* Remove class [ border-dashed border-2 border-gray-300 ] to remove dotted border */}
            <div className="w-full h-64 rounded border-dashed border-2 border-gray-300">
              {/* Place your content here */}
              {children}
            </div>
          </div>
        </div>
      </>
    </div>
  );
};

export default PageHead;
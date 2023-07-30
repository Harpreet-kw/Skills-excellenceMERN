import React, { useState } from "react";
import Header from "../../partials/Header";
import Sidebar from "../../partials/Sidebar";

function AppContainer({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div>
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Content area */}
        <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          {/*  Site header */}
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          {children}
        </div>
      </div>
    </div>
  );
}

export default AppContainer;

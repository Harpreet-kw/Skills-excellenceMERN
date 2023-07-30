import React from "react";

import WelcomeBanner from "../partials/dashboard/WelcomeBanner";
import Banner from "../partials/Banner";
import AppContainer from "../Components/AppContainer";

function Dashboard() {
  return (
    <AppContainer>
      <main>
        <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
          {/* Welcome banner */}
          <WelcomeBanner />
          {/* Dashboard actions */}
          <div className="sm:flex sm:justify-between sm:items-center mb-8">

            {/* Right: Actions */}
            <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
              {/* Filter button */}
              
            </div>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-12 gap-6">
            {/* Cards goes here */}
            {/* <DashBoardData /> */}
          </div>
        </div>
      </main>
      <Banner />
    </AppContainer>
  );
}

export default Dashboard;
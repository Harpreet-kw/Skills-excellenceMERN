import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Landing from "./pages/Landing";
import { UserContextProvider } from "./UserContext";
import CreateJob from "./pages/CreateJob";
import JobPage from "./pages/JobPage";
import EditJob from "./pages/EditJob";
import DeleteJob from "./pages/DeleteJob";
import AppContainer from './Components/AppContainer';
import { useEffect, useState } from "react";
import WelcomeBanner from "./partials/dashboard/WelcomeBanner";
import Events from "./Components/Events/Events";
import CreateEvent from "./Components/CreateEvent/CreateEvent";
import PrivateRoutes from "./Components/PrivateRoutes/PrivateRoutes";
import Jobs from "./Components/Jobs/Jobs";
import Courses from "./Components/Courses/Courses";
import Services from "./Components/Services/Services";
import Users from "./Components/Users/Users";
import Videos from "./Components/Videos/Videos";
import CoursesDetails from "./Components/CoursesDetails/CoursesDetails";

const RenderDashBoard = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const [isLogin, setIslogin] = useState(false)
  
  useEffect(()=>{
    let loginDetails = sessionStorage.getItem("login");
    let login = JSON.parse(loginDetails)
    if(login?.username !== undefined) {
      setIslogin(true)
    } else {
      setIslogin(false)
      navigate('/login')
    }
  }, [])
  
  console.log("location 000000", location)

  if (isLogin) {
    return <AppContainer>
      <div className="m-5">
        <WelcomeBanner  />
      </div>
    </AppContainer>
  } else {
    return navigate('/login')
  }
}

function App() {

  const [isLogin, setIslogin] = useState(false)

  useEffect(()=>{
    let loginDetails = sessionStorage.getItem("login");
    let login = JSON.parse(loginDetails)
    if(login?.username !== "" || login?.username !== undefined) {
      setIslogin(true)
    } else {
      setIslogin(false)
    }
  }, [])

  console.log("isLogin******************", isLogin)

  return (
    <UserContextProvider>
      <Routes>
        {/* <Route index element={<IndexPage />} /> */}
        <Route path="/" element={<RenderDashBoard />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/landing" element={
          <AppContainer>
            <Landing />
          </AppContainer>
        } />
        <Route path="/events" element={
          <AppContainer>
            <PrivateRoutes isLogin={isLogin}>
              <Events />
            </PrivateRoutes>
          </AppContainer>
        } />
        <Route path="/create-event" element={
          <AppContainer>
            {/* <CreateJob /> */}
            <PrivateRoutes isLogin={isLogin}>
              <CreateEvent  />  
            </PrivateRoutes>
          </AppContainer>
        } />
        <Route path="/job/:id" element={
          <AppContainer>
            <JobPage />
          </AppContainer>
        } />
        <Route path="/edit/:id" element={
          <AppContainer>
            <EditJob />
          </AppContainer>
        } />
        <Route path="/delete/:id" element={
          <AppContainer>
            <DeleteJob />
          </AppContainer>
        } />
         <Route path="/jobs" element={
          <AppContainer>
            <PrivateRoutes isLogin={isLogin}>
              <Jobs />  
            </PrivateRoutes>
          </AppContainer>
        } />
         <Route path="/create-job" element={
          <AppContainer>
            <PrivateRoutes isLogin={isLogin}>
              <CreateJob />  
            </PrivateRoutes>
          </AppContainer>
        } />
         <Route path="/courses" element={
          <AppContainer>
            <PrivateRoutes isLogin={isLogin}>
              <Courses />  
            </PrivateRoutes>
          </AppContainer>
        } />
         <Route path="/course/:courseId" element={
          <AppContainer>
            <PrivateRoutes isLogin={isLogin}>
              <CoursesDetails />  
            </PrivateRoutes>
          </AppContainer>
        } />
         <Route path="/services" element={
          <AppContainer>
            <PrivateRoutes isLogin={isLogin}>
              <Services />  
            </PrivateRoutes>
          </AppContainer>
        } />
         <Route path="/users" element={
          <AppContainer>
            <PrivateRoutes isLogin={isLogin}>
              <Users />  
            </PrivateRoutes>
          </AppContainer>
        } />

         <Route path="/videos" element={
          <AppContainer>
            <PrivateRoutes isLogin={isLogin}>
              <Videos />  
            </PrivateRoutes>
          </AppContainer>
        } />
      </Routes>
    </UserContextProvider>
  );
}

export default App;

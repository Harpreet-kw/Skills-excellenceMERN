import './App.css';
import Post from "./Post";
import Header from "./Header";
import {Route, Routes} from "react-router-dom";
import Layout from "./Layout";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import {UserContextProvider} from "./UserContext";
import CreateJob from "./pages/CreateJob";
import JobPage from "./pages/JobPage";
import EditJob from "./pages/EditJob";
import ViewJobs from './pages/ViewJobs';
import ViewServices from './pages/ViewServices';
import ViewCourses from './pages/ViewCourses';
import ViewEvents from './pages/ViewEvents';
import Profile from './pages/Profile';
import CourseDetails from './pages/CourseDetails';

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/create" element={<CreateJob />} />
          <Route path="/post/:id" element={<JobPage />} />
          <Route path="/edit/:id" element={<EditJob />} />

          <Route path="/view-jobs" element={<ViewJobs />} />
          <Route path="/services" element={<ViewServices />} />
          <Route path="/courses" element={<ViewCourses />} />
          <Route path="/course/:courseId" element={<CourseDetails />} />
          <Route path="/events" element={<ViewEvents />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;

import Job from "../Job";
import {useEffect, useState} from "react";
import WelcomeBanner from "../partials/dashboard/WelcomeBanner";
import { apiUrl } from "../utils/settings";

export default function IndexPage() {
  const [jobs,setJobs] = useState([]);
  useEffect(() => {
    fetch(`${apiUrl}/job`).then(response => {
      response.json().then(jobs => {
        setJobs(jobs);
      });
    });
  }, []);
  return (
    <>
      <div class="content-wrapper p-4">
        <WelcomeBanner  />
        <div style={{minHeight: '500px',height: 'auto',marginBottom: '100px'}}>
          <h1 className="text-left text-lg font-bold mb-4">Current Available Jobs</h1>
          {jobs.length > 0 && jobs.map(job => (
            <Job {...job} />
          ))}
        </div>
      </div>
    </>
  );
}
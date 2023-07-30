import {useContext, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {formatISO9075} from "date-fns";
import {UserContext} from "../UserContext";
import {Link} from 'react-router-dom';
import { apiUrl } from "../utils/settings";

export default function JobPage() {
  const [jobInfo, setPostInfo] = useState(null);
  const {userInfo} = useContext(UserContext);
  const {id} = useParams();
  useEffect(() => {
    fetch(`${apiUrl}/job/${id}`)
      .then(response => {
        response.json().then(jobInfo => {
          setPostInfo(jobInfo);
        });
      });
  }, []);

  if (!jobInfo) return '';

  return (
    <div class="content-wrapper" style={{marginLeft: '300px'}}>
      <div className="job-page">
        <h1>{jobInfo.title}</h1>
        <time>{formatISO9075(new Date(jobInfo.createdAt))}</time>
        
        <div className="edit-row">
          <Link className="edit-btn" to={`/edit/${jobInfo._id}`}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
            </svg>
            Edit this job
          </Link>
        </div>

        <div className="edit-row">
          <Link className="edit-btn" to={`/delete/${jobInfo._id}`}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
            </svg>
            Delete this job
          </Link>
        </div>
    
        <div className="image" style={{width: '500px'}}>
          <img src={`${apiUrl}/${jobInfo.cover}`} alt=""/>
        </div>
        <div className="content" dangerouslySetInnerHTML={{__html:jobInfo.content}} />
      </div>
    </div>
  );
}
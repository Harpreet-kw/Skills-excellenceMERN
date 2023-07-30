import 'react-quill/dist/quill.snow.css';
import { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import Editor from "../Editor";
import PageHead from "../Components/Comman/PageHead/Index";
import { message } from 'antd';
import axios from 'axios'
import { apiUrl } from '../utils/settings';

export default function CreateJob() {
  const navigate = useNavigate()
  const location = useLocation()
  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState();
  const [redirect, setRedirect] = useState(false);

  console.warn("location?.state?.job?._id *****",files, location?.state?.job?._id)

  async function createNewPost(ev) {
    const data = new FormData();
    data.set('title', title);
    data.set('company', company);
    data.set('summary', summary);
    data.set('content', content);
    data.set('file', files?.length > 0 ? files?.[0] : "");
    // data.set('id', location?.state?.job?._id);
    ev.preventDefault();

    if(
      title !== "" ||
      company !== "" ||
      summary !== ""
      // files !== 0
    ) {
      if(location?.state?.job?._id !== undefined) {
        console.log("yes this one working ********", files)
        data.set("id", location?.state?.job?._id)
        // data.set("file", files?.length > 0 ? files[0] : "")

        // let payload = {
        //   title: title,
        //   company: company,
        //   summary: summary,
        //   content: content,
        //   id: location?.state?.job?._id,
        //   file: files?.length > 0 ? files[0] : files
        // }

        const response = await fetch(`${apiUrl}/job/updateJob`, {
          method: 'POST',
          body: data,
          credentials: 'include',
        });
        if (response.ok) {
          navigate("/jobs")
          setRedirect(true);
        } else {
          message.error('Something went wrong!!');
        }

        // let config = {
        //   method: 'post',
        //   maxBodyLength: Infinity,
        //   url: `${apiUrl}/job/updateJob`,
        //   headers: { 
        //     'Content-Type': 'application/json'
        //   },
        //   data : data
        // };
        
        // axios.request(config)
        // .then((response) => {
        //   console.log("**** Updated ***************", response.data);
        //   message.success('Updated successfully!!');
        //   navigate("/jobs")
        //   setRedirect(true);
        // })
        // .catch((error) => {
        //   console.log(error);
        //   message.error('Something went wrong!!');
        // });
        // const response = await fetch(`http://localhost:4000/job/updateJob`, {
        //   method: 'POST',
        //   body: payload,
        //   credentials: 'include',
        // });
        // if (response.ok) {
        //   setRedirect(true);
        // } else {
        //   message.error('Something went wrong!!');
        // }
      } else {
        const response = await fetch(`${apiUrl}/job`, {
          method: 'POST',
          body: data,
          credentials: 'include',
        });
        if (response.ok) {
          setRedirect(true);
        } else {
          message.error('Something went wrong!!');
        }
      }
    } else {
      message.error('Pease fill the form correctly!!');
    }
  }
  useEffect(()=> {
    console.log("location **********", location)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  if(location?.state?.job?._id) {
    setTitle(location?.state?.job?.title);
    setCompany(location?.state?.job?.company);
    setSummary(location?.state?.job?.summary);
    setContent(location?.state?.job?.content);
    // setFiles(location?.state?.job?.cover);
  }
  }, [location])

  if (redirect) {
    return <Navigate to={'/jobs'} />
  }


  return (
    <PageHead
      title={location?.state?.job?._id !== undefined ? "Update Job" : "Create Job"}
      breadcrumbs={[
        { path: "/", breadcrumbName: "Home" },
        {
          path: "/",
          breadcrumbName: "Jobs",
        },
      ]}
      bgNone={true}
      isCreate={true}
      subTitle="Added all the Events here"
      button={
        <>
          {/* <button onClick={() => window.history.back()} className="mx-2 my-2 bg-white transition duration-150 ease-in-out focus:outline-none hover:bg-gray-100 rounded text-indigo-700 px-6 py-2 text-sm">Back</button> */}
          <button onClick={() => navigate('/jobs')} className="transition duration-150 ease-in-out hover:bg-blue-600 focus:outline-none border bg-blue-500 rounded text-white px-8 py-2 text-sm">Jobs</button>
        </>
      }
    >
      <form className='p-4 bg-white rounded-md shadow-md' onSubmit={createNewPost}>
        <br />
        <div className="flex flex-col md:mr-16 mb-4 w-full">
          <label htmlFor="email" className="text-gray-800 text-sm font-bold leading-tight tracking-normal mb-2">
            Title
          </label>
          <input
            id="title"
            defaultValue={title}
            onChange={ev => setTitle(ev.target.value)}
            className="text-gray-600 focus:border focus:border-indigo-700  bg-white font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border shadow"
            placeholder="Title"
          />
        </div>

        <div className="flex flex-col md:mr-16 mb-4 w-full">
          <label htmlFor="email" className="text-gray-800 text-sm font-bold leading-tight tracking-normal mb-2">
            Company Name
          </label>
          <input
            id="company"
            defaultValue={company}
            onChange={ev => setCompany(ev.target.value)}
            className="text-gray-600 focus:border focus:border-indigo-700  bg-white font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border shadow"
            placeholder="Company"
          />
        </div>

        <div className="flex flex-col md:mr-16 mb-6 w-full">
          <label htmlFor="email" className="text-gray-800 text-sm font-bold leading-tight tracking-normal mb-2">
            Summary
          </label>
          <input
            id="summary"
            defaultValue={summary}
            onChange={ev => setSummary(ev.target.value)}
            className="text-gray-600 focus:border focus:border-indigo-700  bg-white font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border shadow"
            placeholder="Summary"
          />
        </div>

        <div className="flex flex-col md:mr-16 mb-6 ">
          <label htmlFor="email" className="text-gray-800 text-sm font-bold leading-tight tracking-normal mb-2">
            Upload cover
          </label>
          {/* {location?.state?.job?.cover ? */}
           { location?.state?.job?.cover && <img src={`${apiUrl}/${location?.state?.job?.cover}`} className='h-20 w-20' alt='Cover' /> }
            {/* : */}
            <input type="file"
              onChange={ev => setFiles(ev.target.files)} />
          {/* } */}
        </div>

        <div className="flex flex-col md:mr-16 mb-4 w-full">
          <label htmlFor="email" className="text-gray-800 text-sm font-bold leading-tight tracking-normal mb-2">
            Content
          </label>
          <div className='bg-white'>
            <Editor value={content} onChange={setContent} />
          </div>
        </div>

        <div className='text-right'>
          <button className="transition duration-150 ease-in-out hover:bg-blue-600 focus:outline-none border bg-blue-500 rounded text-white px-8 py-3 text-lg">
           {location?.state?.job?._id !== undefined ? "Update Job" : "Create Job"} 
          </button>
        </div>
        {/* <button style={{ marginTop: '5px' }}>Create Job</button> */}
      </form>
    </PageHead>
  );
}
import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import PageHead from '../Comman/PageHead/Index'
import axios from 'axios'
import { apiUrl } from '../../utils/settings'

const CoursesDetails = () => {
    const location = useLocation()
    const navigate = useNavigate()
    console.warn("Details -----", location)

    const [selectedFiles, setSelectedFiles] = useState([]);
    const [videoUrls, setVideoUrls] = useState([]);

    const handleFileChange = (e) => {
        setSelectedFiles([...selectedFiles, ...e.target.files]);
        // Create an array of video URLs from the selected files
        const urls = [];
        for (let i = 0; i < e.target.files.length; i++) {
            const url = URL.createObjectURL(e.target.files[i]);
            urls.push(url);
        }
        setVideoUrls(urls);
    };

    console.log("Files changed", selectedFiles)

    const handleUpload = () => {
        const formData = new FormData();
        for (let i = 0; i < selectedFiles.length; i++) {
            formData.append('videos', selectedFiles[i]);
        }
        formData.append("id", location?.state?._id)

        if (location?.state?._id) {
            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${apiUrl}/courses/update/videos`,
                data: formData
            };

            axios.request(config)
                .then((response) => {
                    console.log("Res **************", response.data);
                    navigate('/courses')
                })
                .catch((error) => {
                    console.log("Error ************", error);
                });
        } 
    };

    const handleDelete = (index) => {
        // Create copies of the state arrays to avoid directly modifying state
        const newSelectedFiles = [...selectedFiles];
        const newVideoUrls = [...videoUrls];
    
        // Remove the selected video and its corresponding URL from the arrays
        newSelectedFiles.splice(index, 1);
        newVideoUrls.splice(index, 1);
    
        // Update the state with the modified arrays
        setSelectedFiles(newSelectedFiles);
        setVideoUrls(newVideoUrls);
      };

    return (
        <PageHead
            title="Course Details"
            breadcrumbs={[
                { path: "/", breadcrumbName: "Home" },
                {
                    path: "/",
                    breadcrumbName: "Course Details",
                },
            ]}
            bgNone={true}
            isCreate={false}
        >

            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col mb-2" >
                <div className="-mx-3 md:flex mb-6">
                    <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="grid-first-name">
                            Title
                        </label>
                        <div disabled defaultValue={location?.state?.title} className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3" id="grid-first-name" type="text" placeholder="">{location?.state?.title}</div>
                        {/* <p className="text-red text-xs italic">Please fill out this field.</p> */}
                    </div>
                    <div className="md:w-1/2 px-3">
                        <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="grid-last-name">
                            Subtitle
                        </label>
                        <div disabled defaultValue={location?.state?.subtitle} className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4" id="grid-last-name" type="text" placeholder="">{location?.state?.subtitle}</div>
                    </div>
                </div>

                <div className="md:flex mb-2">
                    <input type="file" multiple onChange={handleFileChange} />
                </div>
                <div className="md:flex mb-2">
                    {selectedFiles?.map((file, index) => {
                        return (
                            <div className='mx-4 my-2'>
                                <div className='cursor-pointer text-red-400 text-right' onClick={()=> handleDelete(index)}>Delete</div>
                                <video key={index} width="320" height="240" controls>
                                    <source src={file} type={`video/${selectedFiles[index].type}`} />
                                    Your browser does not support the video tag.
                                </video>
                            </div>
                        )
                    })}
                </div>

                <div className="md:flex my-4">
                    {location?.state?.videoPath?.map((item, index)=> {
                        return (
                            <iframe
                                key={index}
                                title="video-player"
                                width="400"
                                height="200"
                                style={{marginRight: '20px'}}
                                src={`${apiUrl}/${item}`}
                                frameBorder="0"
                                allowFullScreen
                            ></iframe>
                        )
                    })}
                </div>
                <div className='my-3 text-right'>
                    <button onClick={()=> navigate('/courses')} type="button" data-te-ripple-init data-te-ripple-color="light" className="inline-block rounded bg-white border border-2 mr-4 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-blue-500 shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600  ">
                        Cancel
                    </button>

                    <button onClick={handleUpload} type="button" data-te-ripple-init data-te-ripple-color="light" className="inline-block rounded bg-blue-500 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 ">
                        Upload
                    </button>
                </div>
            </div>
        </PageHead>
    )
}

export default CoursesDetails
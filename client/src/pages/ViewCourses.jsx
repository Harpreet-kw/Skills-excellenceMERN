/* eslint-disable jsx-a11y/iframe-has-title */
import React from 'react'
import { useEffect } from 'react';
import axios from 'axios'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './courses.css'

const ViewCourses = () => {
    const navigate = useNavigate();
    const [list, setList] = useState([])
    const fetchData = async (name) => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `http://localhost:4000/courses/videos`,
            headers: {
                'Content-Type': 'application/json'
            }
        };

        axios.request(config)
            .then((response) => {
                console.log("Res **************", response.data);
                setList(response?.data)
            })
            .catch((error) => {
                console.log("Error ************", error);
            });
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div className='m-5' style={{marginTop: '200px', marginBottom: '50px'}}>
            <div className="container mt-2">
                <div className="row">
                    {list?.map((item, index) => {
                        return (
                            <div className="col-md-4 col-sm-6 item m-4">
                                <div className="card item-card card-block" style={{padding: '20px'}}>
                                    <div className='mx-3 my-4' 
                                         onClick={() => {
                                            navigate(`/course/${item?._id}`, {state: item})
                                        }}
                                    >
                                        <video controls={false} style={{ width: '350px', height: '200px' }}>
                                            <source src={`http://localhost:4000/${item?.videoPath[0]}`} type="video/mp4" />
                                            Your browser does not support the video tag.
                                        </video>
                                    </div>

                                    <h4 className="card-title text-left px-5 py-2">{item?.title}</h4>
                                    <p className="card-text px-5 py-1">{item?.title}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

        </div>
    )
}

export default ViewCourses
/* eslint-disable jsx-a11y/iframe-has-title */
import React from 'react'
import { useEffect } from 'react';
import axios from 'axios'
import { useState } from 'react';
import './courses.css'

const ViewEvents = () => {
    const [list, setList] = useState([])
    const fetchData = async (name) => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `http://localhost:4000/events`,
            headers: {
                'Content-Type': 'application/json'
            }
        };

        axios.request(config)
            .then((response) => {
                console.log("Res **************", response.data);
                setList(response?.data?.data)
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
                                <div className="card item-card card-block p-5" style={{padding: '10px'}}>
                                    {/* <img src={`http://localhost:400/${item?.cover}`} alt="Job images" /> */}
                                    {/* <iframe className="embed-responsive-item m-5" src={item?.videoPath} allowFullScreen /> */}
                                    {/* <h5 className="item-card-title mt-3 mb-3">Sierra Web Development</h5> */}
                                    <h4 className="card-title text-left px-5 py-2">Name : {item?.title}</h4>
                                    <div className="">Details : {item?.description}</div>
                                    <div className="">Date : {item?.date}</div>
                                    <div className="">Location : {item?.location}</div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

        </div>
    )
}

export default ViewEvents
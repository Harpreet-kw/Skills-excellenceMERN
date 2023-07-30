/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Modal, message, Input } from 'antd'
import React, { useEffect, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { EditFilled, DeleteFilled } from '@ant-design/icons'
import AppContainer from '../AppContainer'
import PageHead from '../Comman/PageHead/Index'
import { apiUrl } from '../../utils/settings';

const Events = () => {
    const navigate = useNavigate()
    const [eventsList, setEventsList] = useState([])

    const fetchEvents = async (name)=> {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${apiUrl}/events`,
            headers: { 
              'Content-Type': 'application/json'
            }
          };
          
          axios.request(config)
          .then((response) => {
            console.log("Res **************", response.data);
            setEventsList(response?.data?.data)
          })
          .catch((error) => {
            console.log("Error ************",error);
          });
    }

    useEffect(()=>{
       fetchEvents()
    }, [])



    const handleDelete =(id)=> {
        let config = {
            method: 'delete',
            maxBodyLength: Infinity,
            url: `${apiUrl}/events/${id}`,
            headers: { }
          };
          
          axios.request(config)
          .then((response) => {
            console.log("**********Delete***********", response.data);
            message.success('Deleted successfully!!');
            fetchEvents()
          })
          .catch((error) => {
            console.log(error);
            message.error('Something went wrong!!');
          });
      }


      const customFooter =(id)=> {
        console.warn("deleting ----", id)
        return (
        <div className="text-right mt-4">
          <Button
            style={{ marginRight: 8, background: 'green', borderColor: 'green', color: 'white' }}
            onClick={() => {
                handleDelete(id)
                Modal.destroyAll();
            }}
          >
            Confirm
          </Button>
          <Button
            style={{ background: 'red', borderColor: 'red', color: 'white' }}
            onClick={() => {
              // Handle your custom action here
              Modal.destroyAll();
            }}
          >
            Cancel
          </Button>
        </div>
      )
    };
    const handleDeleteConfirm = (id) => {
        Modal.confirm({
            title: 'Confirm',
            content: 'Are you sure you want to delete this item?',
            okButtonProps: {
                style: { display: 'none' }, // Hide the default OK button
              },
              cancelButtonProps: {
                style: { display: 'none' }, // Hide the default Cancel button
              },
              footer: customFooter(id),            
        });
    }


      const handleSearch = (value) => {
        // Perform search logic with the provided value
        console.log("searching ***************", value);
        fetchEvents(value)
      };
    

    return (
            <PageHead
                title="Events"
                breadcrumbs={[
                    { path: "/", breadcrumbName: "Home" },
                    {
                        path: "/",
                        breadcrumbName: "Events",
                    },
                ]}
                bgNone={true}
                isCreate={false}
                button={
                    <>
                        {/* <button onClick={()=>window.history.back()} className="mx-2 my-2 bg-white transition duration-150 ease-in-out focus:outline-none hover:bg-gray-100 rounded text-indigo-700 px-6 py-2 text-sm">Back</button> */}
                        <button onClick={()=> navigate('/create-event')} className="transition duration-150 ease-in-out hover:bg-indigo-600 focus:outline-none border bg-blue-500 rounded text-white px-8 py-2 text-lg">Add Event</button>
        
                    </>
                }
                subTitle="Get all the added users here"
            >
                <div className="relative overflow-hidden rounded-sm">
                    <section className="">
                        <div className="w-full mb-12">
                            <div className="relative flex flex-col w-full min-w-0 mb-6 text-black break-words rounded shadow-lg bg-white">
                                <div className="block w-full overflow-x-auto ">
                                    <table className="items-center w-full bg-transparent border-collapse">
                                        <thead>
                                            <tr>
                                                <th className="px-6 py-3 text-lg font-semibold text-left text-gray-300 uppercase align-middle bg-blue-500 border border-l-0 border-r-0 border-blue-700 border-solid whitespace-nowrap">Name</th>
                                                <th className="px-6 py-3 text-lg font-semibold text-left text-gray-300 uppercase align-middle bg-blue-500 border border-l-0 border-r-0 border-blue-700 border-solid whitespace-nowrap">Description</th>
                                                <th className="px-6 py-3 text-lg font-semibold text-left text-gray-300 uppercase align-middle bg-blue-500 border border-l-0 border-r-0 border-blue-700 border-solid whitespace-nowrap">Date</th>
                                                <th className="px-6 py-3 text-lg font-semibold text-left text-gray-300 uppercase align-middle bg-blue-500 border border-l-0 border-r-0 border-blue-700 border-solid whitespace-nowrap">Organizer</th>
                                                <th className="px-6 py-3 text-lg font-semibold text-left text-gray-300 uppercase align-middle bg-blue-500 border border-l-0 border-r-0 border-blue-700 border-solid whitespace-nowrap">Attendee</th>
                                                <th className="px-6 py-3 text-lg font-semibold text-left text-gray-300 uppercase align-middle bg-blue-500 border border-l-0 border-r-0 border-blue-700 border-solid whitespace-nowrap">Location</th>
                                                {/* <th className="px-6 py-3 text-lg font-semibold text-left text-gray-300 uppercase align-middle bg-blue-500 border border-l-0 border-r-0 border-blue-700 border-solid whitespace-nowrap">Amount</th>
                                                <th className="px-6 py-3 text-lg font-semibold text-left text-gray-300 uppercase align-middle bg-blue-500 border border-l-0 border-r-0 border-blue-700 border-solid whitespace-nowrap">R/N</th> */}
                                                <th className="px-6 py-3 text-lg font-semibold text-left text-gray-300 uppercase align-middle bg-blue-500 border border-l-0 border-r-0 border-blue-700 border-solid whitespace-nowrap">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {eventsList?.map((event, index) => {
                                                return (
                                                    <tr key={event?._id}>
                                                        <th className="flex items-center p-4 px-6 text-lg text-left align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">
                                                            <span className="ml-3 font-bold text-black"> {event?.title} </span>
                                                        </th>
                                                        <td className="p-4 px-6 text-lg align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap" title={event?.description}>{event?.description?.length > 25 ? event?.description?.slice(0, 25) +'...' : event?.description}</td>
                                                        <td className="p-4 px-6 text-lg align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">
                                                            {event.date}</td>
                                                        <td className="p-4 px-6 text-lg align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">
                                                            <div className="flex">
                                                                <div>
                                                                    {event.organizer}
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="p-4 px-6 text-lg align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">
                                                            <div className="flex items-center">
                                                                <span className="mr-2">{event?.attendees?.map((item, index)=> <span key={index}>{item}</span>)}</span>
                                                            </div>
                                                        </td>
                                                        <td className="p-4 px-6 text-lg align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">
                                                            <div className="flex items-center">
                                                                <span className="mr-2">{event.location}</span>
                                                            </div>
                                                        </td>
                                                        
                                                        <td className="p-4 px-6 text-lg align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">
                                                            <div className="flex items-center cursor-pointer">
                                                                <span className="mr-2">
                                                                    <span
                                                                        onClick={() => {
                                                                            navigate('/create-event', { state: { event: event } })
                                                                        }}
                                                                        className='cursor-pointer'
                                                                    >
                                                                        <EditFilled style={{fontSize: "20px"}} />
                                                                    </span>
                                                                </span>
                                                                <span className="mr-2" onClick={()=> handleDeleteConfirm(event?._id)}>
                                                                    <DeleteFilled style={{ color: 'red', fontSize: "20px" }} />
                                                                </span>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )
                                            })}
                                            
                                        </tbody>
                                    </table>
                                    {eventsList?.length === 0 ?
                                    <div className='text-center p-5'>
                                        No Event found
                                    </div>
                                    : ""
                                }
                                </div>
                            </div>
                        </div>
                    </section>

                </div>
            </PageHead>
    )
}

export default Events
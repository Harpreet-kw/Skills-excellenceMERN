import React from 'react'
import { Form, Input, Button, DatePicker, message } from 'antd';
import axios from 'axios';
import PageHead from '../Comman/PageHead/Index'
import { useLocation, useNavigate } from 'react-router-dom';
import moment from 'moment';
import { apiUrl } from '../../utils/settings';
import TextArea from 'antd/es/input/TextArea';

const CreateEvent = () => {
    const navigate = useNavigate()
    const location = useLocation()

    console.warn("******Location********", location, location?.state?.event?._id !== undefined, location?.state?.event?._id !== null)

    const onFinish = (values) => {
        console.log('Success:::::::::::::::::::::::', values);
        if(location?.state?.event?._id !== undefined) {
            let updatePayload = {
                ...values,
                DOJoin: moment(values?.DOJoin).format('LL'),
                DOValid: moment(values?.DOValid).format('LL'),
            }
            let config = {
                method: 'put',
                maxBodyLength: Infinity,
                url: `${apiUrl}/events/${location?.state?.event?._id}`,
                headers: { 
                  'Content-Type': 'application/json'
                },
                data : updatePayload
              };
              
              axios.request(config)
              .then((response) => {
                console.log("**** Updated ***************", response.data);
                message.success('Updated successfully!!');
                navigate("/events")
              })
              .catch((error) => {
                console.log(error);
                message.error('Something went wrong!!');
              });
        } else {
            let addPayload = {
                ...values,
                DOJoin: moment(values?.DOJoin).format('LL'),
                DOValid: moment(values?.DOValid).format('LL'),
            }
            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${apiUrl}/events`,
                headers: { 
                  'Content-Type': 'application/json'
                },
                data : addPayload
              };
              
              axios.request(config)
              .then((response) => {
                console.log("Added *****************",response.data);
                message.success('Added successfully!!');
                navigate("/events")
              })
              .catch((error) => {
                console.log(error);
                message.error('Something went wrong!!');
              });
        }
      };
    
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };


    return (
        <>
            <PageHead
                title={location?.state?.event?._id !== undefined ? "Update Event" :"Create Event"}
                breadcrumbs={[
                    { path: "/", breadcrumbName: "Home" },
                    {
                        path: "/",
                        breadcrumbName: "Events",
                    },
                ]}
                bgNone={true}
                isCreate={true}
                subTitle="Added all the Events here"
                button={
                    <>
                        {/* <button onClick={() => window.history.back()} className="mx-2 my-2 bg-white transition duration-150 ease-in-out focus:outline-none hover:bg-gray-100 rounded text-indigo-700 px-6 py-2 text-sm">Back</button> */}
                        <button onClick={() => navigate('/events')} className="transition duration-150 ease-in-out hover:bg-blue-600 focus:outline-none border bg-blue-500 rounded text-white px-8 py-2 text-sm">Events</button>
                    </>
                }
            >
                <div className="p-4 bg-white rounded-md shadow-md">
                    <Form
                        name="basic"
                        initialValues={{ 
                            remember: true,
                            title: location?.state?.event?.title,
                            description: location?.state?.event?.description,
                            date: moment(location?.state?.event?.date) || "",
                            location: location?.state?.event?.location,
                            attendees: location?.state?.event?.attendees,
                            organizer: location?.state?.event?.organizer
                          }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        layout="vertical"
                        hideRequiredMark
                        autoComplete="off"
                    >
                        <div className="flex">
                            <div className='w-full pr-4'>
                                <Form.Item
                                    label="Title"
                                    name="title"
                                    rules={[{ required: true, message: 'Please enter title!' }]}
                                >
                                    <Input size='large' placeholder='Title here' />
                                </Form.Item>
                            </div>
                            <div className='w-full'>
                                <Form.Item
                                    label="Description"
                                    name="description"
                                    rules={[{ required: true, message: 'Please input description!' }]}
                                >
                                    <TextArea size='large' placeholder='Name here' />
                                </Form.Item>
                            </div>
                        </div>
                        <div className="flex">
                            <div className='w-full pr-4'>
                                <Form.Item
                                    label="Event Location"
                                    name="location"
                                    rules={[{ required: true, message: 'Please input event location!' }]}
                                >
                                    <Input size='large' placeholder='Event location here' />
                                </Form.Item>
                            </div>
                            <div className='w-full'>
                                <Form.Item
                                    label="Date"
                                    name="date"
                                    rules={[{ required: true, type:"date", message: 'Please input date!' }]}
                                >
                                    <DatePicker size='large' with="" style={{ width: "100%"}} />
                                </Form.Item>
                            </div>
                        </div>
                        <div className="flex">
                            <div className='w-full pr-4'>
                                <Form.Item
                                    label="Organizer"
                                    name="organizer"
                                    rules={[{ required: true, message: 'Please input organizer!' }]}
                                >
                                    <Input size='large' placeholder='Organizer here' />
                                </Form.Item>
                            </div>
                            <div className='w-full'>
                                <Form.Item
                                    label="attendees"
                                    name="attendees"
                                    rules={[{ required: true, message: 'Please input attendees!' }]}
                                >
                                    <Input size='large' placeholder='Attendees here' />
                                </Form.Item>
                            </div>
                        </div>

                        <Form.Item>
                            <div className='float-right'>
                                <Button type="primary" size='large' style={{ color: "white", background: "mediumblue"}} htmlType="submit">
                                   {
                                   location?.state?.event?._id !== undefined ? "Update" : "Submit"} 
                                </Button>
                            </div>
                        </Form.Item>
                    </Form>
                </div>
            </PageHead>
        </>
    )
}

export default CreateEvent
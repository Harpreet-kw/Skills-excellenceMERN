import React, { useState } from 'react'
import { Form, Input, Button, DatePicker, message } from 'antd';
import axios from 'axios';
import PageHead from '../Comman/PageHead/Index'
import { useLocation, useNavigate } from 'react-router-dom';
import moment from 'moment';
import { apiUrl } from '../../utils/settings';
import Editor from '../../Editor';

const CreateJob = () => {
    const navigate = useNavigate()
    const location = useLocation()

    const [title, setTitle] = useState('');
    const [company, setCompany] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [files, setFiles] = useState('');
    const [redirect, setRedirect] = useState(false);

    async function createNewPost(ev) {
        const data = new FormData();
        data.set('title', title);
        data.set('company', company);
        data.set('summary', summary);
        data.set('content', content);
        data.set('file', files[0]);
        ev.preventDefault();
        const response = await fetch(`${apiUrl}/job`, {
            method: 'POST',
            body: data,
            credentials: 'include',
        });
        if (response.ok) {
            setRedirect(true);
        }
    }

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
                url: `${apiUrl}/jobs/${location?.state?.job?._id}`,
                headers: { 
                  'Content-Type': 'application/json'
                },
                data : updatePayload
              };
              
              axios.request(config)
              .then((response) => {
                console.log("**** Updated ***************", response.data);
                message.success('Updated successfully!!');
                navigate("/jobs")
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
                url: `${apiUrl}/jobs`,
                headers: { 
                  'Content-Type': 'application/json'
                },
                data : addPayload
              };
              
              axios.request(config)
              .then((response) => {
                console.log("Added *****************",response.data);
                message.success('Added successfully!!');
                navigate("/jobs")
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
                title="Create Job"
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
                        <button onClick={() => window.history.back()} className="mx-2 my-2 bg-white transition duration-150 ease-in-out focus:outline-none hover:bg-gray-100 rounded text-indigo-700 px-6 py-2 text-sm">Back</button>
                        <button onClick={() => navigate('/jobs')} className="transition duration-150 ease-in-out hover:bg-blue-600 focus:outline-none border bg-blue-500 rounded text-white px-8 py-2 text-sm">Jobs</button>
                    </>
                }
            >
                <div className="p-4 bg-white rounded-md shadow-md">

                    <form style={{ width: '600px', margin: 'auto', marginTop: '120px', marginBottom: '100px' }} onSubmit={createNewPost}>
                        <h2 style={{ textAlign: 'center' }}>Create Job</h2>
                        <br />
                        <input type="title"
                            placeholder={'Title'}
                            value={title}
                            onChange={ev => setTitle(ev.target.value)} />
                        <input type="company"
                            placeholder={'Company Name'}
                            value={company}
                            onChange={ev => setCompany(ev.target.value)} />
                        <input type="summary"
                            placeholder={'Summary'}
                            value={summary}
                            onChange={ev => setSummary(ev.target.value)} />
                        <input type="file"
                            onChange={ev => setFiles(ev.target.files)} />
                        <Editor value={content} onChange={setContent} />
                        <button style={{ marginTop: '5px' }}>Create Job</button>
                    </form>


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
                                    label="Summery"
                                    name="summery"
                                    rules={[{ required: true, message: 'Please input summery!' }]}
                                >
                                    <Input size='large' placeholder='Summery here' />
                                </Form.Item>
                            </div>
                        </div>
                        <div className="flex">
                            <div className='w-full pr-4'>
                                <Form.Item
                                    label="Content"
                                    name="location"
                                    rules={[{ required: true, message: 'Please input Content!' }]}
                                >
                                    <Input size='large' placeholder='Content here' />
                                </Form.Item>
                            </div>
                            <div className='w-full'>
                                <Form.Item
                                    label="Company"
                                    name="company"
                                    rules={[{ required: true, message: 'Please input company!' }]}
                                >
                                    <Input size='large' with="" placeholder='Enter company here' style={{ width: "100%"}} />
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

export default CreateJob
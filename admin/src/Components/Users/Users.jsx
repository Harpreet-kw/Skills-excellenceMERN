/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Modal, message, Input, Form, Upload } from 'antd'
import React, { useEffect, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { EditFilled, DeleteFilled, UploadOutlined } from '@ant-design/icons'
import AppContainer from '../AppContainer'
import PageHead from '../Comman/PageHead/Index'
import { apiUrl } from '../../utils/settings';

const Users = () => {
    const navigate = useNavigate()
    const [eventsList, setEventsList] = useState([])
    const [selected, setSelected] = useState();
    // /update/videos

    const fetchEvents = async (name) => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${apiUrl}/getUser`,
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
                console.log("Error ************", error);
            });
    }

    useEffect(() => {
        fetchEvents()
    }, [])



    const handleDelete = (id) => {
        let config = {
            method: 'delete',
            maxBodyLength: Infinity,
            url: `${apiUrl}/services/${id}`,
            headers: {}
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

    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);

    const showModal = () => {
        setOpen(true);
        setSelected({})
    };

    const handleOk = () => {
        setConfirmLoading(true);
        setTimeout(() => {
            setOpen(false);
            setConfirmLoading(false);
        }, 2000);
    };

    const handleCancel = () => {
        console.log('Clicked cancel button');
        setOpen(false);
    };

    const createCourse = async (data) => {
        let pData = new FormData()
        pData.append("title", data?.title)
        pData.append("description", data?.description)
        // pData.append("video", fileList?.[0])

        if (selected?._id) {
            let payload = {
                title: data?.title,
                description: data?.description,
                id: selected?._id
                // video: fileList?.[0]
            }

            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${apiUrl}/services/update`,
                data: payload
            };

            axios.request(config)
                .then((response) => {
                    console.log("Res **************", response.data);
                    fetchEvents()
                    setOpen(false)
                })
                .catch((error) => {
                    console.log("Error ************", error);
                });
        } else {
            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${apiUrl}/services`,
                data: pData
            };

            axios.request(config)
                .then((response) => {
                    console.log("Res **************", response.data);
                    fetchEvents()
                    setOpen(false)
                })
                .catch((error) => {
                    console.log("Error ************", error);
                });
        }
    }

        

    const onFinish = (values) => {
        console.log('Success:', values);
        createCourse(values)
      };
      
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };

    return (
        <PageHead
            title="Users"
            breadcrumbs={[
                { path: "/", breadcrumbName: "Home" },
                {
                    path: "/",
                    breadcrumbName: "Users",
                },
            ]}
            bgNone={true}
            isCreate={false}
            button={
                <>
                    {/* <button onClick={() => window.history.back()} className="mx-2 my-2 bg-white transition duration-150 ease-in-out focus:outline-none hover:bg-gray-100 rounded text-indigo-700 px-6 py-2 text-sm">Back</button> */}
                    {/* <button onClick={showModal} className="transition duration-150 ease-in-out hover:bg-indigo-600 focus:outline-none border bg-blue-500 rounded text-white px-8 py-2 text-lg">Create Services</button> */}

                </>
            }
            subTitle="Get all the added courses here"
        >

            <Modal
                title="Video"
                open={open}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                footer={false}
            >
                <Form
                    name="basic"
                    initialValues={{ 
                        title: selected?.title,
                        description: selected?.description,
                        video: selected?.videoPath
                     }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    layout='vertical'
                    requiredMark={false}
                >
                    <Form.Item
                        label="Title"
                        name="title"
                        rules={[{ required: true, message: 'Please input title!' }]}
                    >
                        <Input size='large' placeholder='Title' />
                    </Form.Item>

                    <Form.Item
                        label="Description"
                        name="description"
                        rules={[{ required: false, message: 'Please input description!' }]}
                    >
                        <Input size='large' placeholder='Description' />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <div className='text-right'>
                            <Button style={{color: 'blue'}} type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </div>
                    </Form.Item>
                </Form>

            </Modal>
            <div className="relative overflow-hidden rounded-sm">
                <section className="">
                    <div className="w-full mb-12">
                        <div className="relative flex flex-col w-full min-w-0 mb-6 text-black break-words rounded shadow-lg bg-white">
                            <div className="block w-full overflow-x-auto ">
                                <table className="items-center w-full bg-transparent border-collapse">
                                    <thead>
                                        <tr>
                                            <th className="px-6 py-3 text-lg font-semibold text-left text-gray-300 uppercase align-middle bg-blue-500 border border-l-0 border-r-0 border-blue-700 border-solid whitespace-nowrap">Name</th>
                                            <th className="px-6 py-3 text-lg font-semibold text-left text-gray-300 uppercase align-middle bg-blue-500 border border-l-0 border-r-0 border-blue-700 border-solid whitespace-nowrap">Email</th>
                                            <th className="px-6 py-3 text-lg font-semibold text-left text-gray-300 uppercase align-middle bg-blue-500 border border-l-0 border-r-0 border-blue-700 border-solid whitespace-nowrap">Phone</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {eventsList?.map((event, index) => {
                                            return (
                                                <tr key={event?._id}>
                                                    <th className="flex items-center p-4 px-6 text-lg text-left align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">
                                                        <span className="ml-3 font-bold text-black"> {event?.name} </span>
                                                    </th>
                                                    <td className="p-4 px-6 text-lg align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">{event?.email}</td>
                                                    <td className="p-4 px-6 text-lg align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">{event?.phone}</td>
                                                    {/* <td className="p-4 px-6 text-lg align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">{event?.description}</td> */}

                                                    {/* <td className="p-4 px-6 text-lg align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">
                                                        <div className="flex items-center cursor-pointer">
                                                            <span className="mr-2">
                                                                <span
                                                                    onClick={() => {
                                                                        setOpen(true);
                                                                        setSelected(event)
                                                                    }}
                                                                    className='cursor-pointer'
                                                                >
                                                                    <EditFilled />
                                                                </span>
                                                            </span>
                                                            <span className="mr-2" onClick={() => handleDeleteConfirm(event?._id)}>
                                                                <DeleteFilled style={{ color: 'red' }} />
                                                            </span>
                                                        </div>
                                                    </td> */}
                                                </tr>
                                            )
                                        })}

                                    </tbody>
                                </table>
                                {eventsList?.length === 0 ?
                                    <div className='text-center p-5'>
                                        No Users found
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

export default Users
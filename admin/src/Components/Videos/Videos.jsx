/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Modal, message, Input, Form, Upload, Select } from 'antd'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { EditFilled, DeleteFilled, UploadOutlined } from '@ant-design/icons'
import AppContainer from '../AppContainer'
import PageHead from '../Comman/PageHead/Index'
import { apiUrl } from '../../utils/settings';

const Videos = () => {
    const navigate = useNavigate()
    const [eventsList, setEventsList] = useState([])
    const [courseList, setCourseList] = useState([])
    const [selectedCourse, setSelectedCourse] = useState()
    const [selected, setSelected] = useState();
    // /update/videos

    const [fileList, setFileList] = useState([]);
    const [uploading, setUploading] = useState(false);

    // const handleUpload = () => {
    //     const formData = new FormData();
    //     fileList.forEach((file) => {
    //         formData.append('files[]', file);
    //     });
    //     setUploading(true);
    //     // You can use any AJAX library you like
    //     fetch('https://www.mocky.io/v2/5cc8019d300000980a055e76', {
    //         method: 'POST',
    //         body: formData,
    //     })
    //         .then((res) => res.json())
    //         .then(() => {
    //             setFileList([]);
    //             message.success('upload successfully.');
    //         })
    //         .catch(() => {
    //             message.error('upload failed.');
    //         })
    //         .finally(() => {
    //             setUploading(false);
    //         });
    // };

    const props = {
        maxCount: 4,
        multiple: true,
        onRemove: (file) => {
            const index = fileList.indexOf(file);
            const newFileList = fileList.slice();
            newFileList.splice(index, 1);
            setFileList(newFileList);
        },
        beforeUpload: (file) => {
            console.log("file *************", file)
            setFileList([...fileList, file]);
            // handleUpload()
            return false;
        },
        fileList,
    };

    const fetchEvents = async (name) => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${apiUrl}/courses/videos`,
            headers: {
                'Content-Type': 'application/json'
            }
        };

        axios.request(config)
            .then((response) => {
                console.log("Res **************", response.data);
                let videoL = response?.data?.map((item)=> {
                    return {
                        ...item,
                        value: item?._id,
                        label: item?.title
                    }
                })
                setCourseList(videoL)
                setEventsList(response?.data)
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
            url: `${apiUrl}/courses/videos/${id}`,
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

    console.warn("fileList **************", fileList)

    const createCourse = async (data) => {
        if(selectedCourse) {

            let pData = new FormData()
            // pData.append("title", data?.title)
            // pData.append("subtitle", data?.subtitle ?? "")
            pData.append("video", fileList?.[0])
            pData.append("id", selectedCourse)
    
            let payload = {
                // title: data?.title,
                // subtitle: data?.subtitle,
                video:  fileList?.[0],
                id: selectedCourse
            }
            if (selectedCourse) {
    
                let config = {
                    method: 'post',
                    maxBodyLength: Infinity,
                    url: `${apiUrl}/courses/update/videos`,
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
            } else {
                let config = {
                    method: 'post',
                    maxBodyLength: Infinity,
                    url: `${apiUrl}/courses/videos`,
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
        } else {
            message.error("Please select course to proceed !!")
        }
    }

        

    const onFinish = (values) => {
        console.log('Success:', values);
        createCourse(values)
      };
      
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };


      const onChange = (value) => {
        console.log(`selected ${value}`);
        setSelectedCourse(value)
      };
      
      const onSearch = (value) => {
        console.log('search:', value);
      };

    return (
        <PageHead
            title="Videos"
            breadcrumbs={[
                { path: "/", breadcrumbName: "Home" },
                {
                    path: "/",
                    breadcrumbName: "Videos",
                },
            ]}
            bgNone={true}
            isCreate={false}
            button={
                <>
                  <button onClick={showModal} className="transition duration-150 ease-in-out hover:bg-indigo-600 focus:outline-none border bg-blue-500 rounded text-white px-8 py-2 text-lg">Upload videos</button>
                </>
            }
            subTitle="Get all the added courses here"
        >

            <Modal
                title={<span className='text-2xl font-bold mb-5'>Add Video</span>}
                open={open}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                footer={false}
            >
                <div className='my-5'>
                    <Form
                        name="basic"
                        initialValues={{ 
                            title: selected?.title,
                            subtitle: selected?.subtitle,
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
                            <Select
                                showSearch
                                placeholder="Select a person"
                                optionFilterProp="children"
                                onChange={onChange}
                                onSearch={onSearch}
                                filterOption={(input, option) =>
                                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                }
                                options={courseList}
                            />
                        </Form.Item>

                        {/* <Form.Item
                            label="Description"
                            name="subtitle"
                            rules={[{ required: false, message: 'Please input description!' }]}
                        >
                            <Input size='large' placeholder='Description' />
                        </Form.Item> */}
                        <Form.Item
                            label="Video"
                            name="video"
                            rules={[{ required: false, message: 'Please select file!' }]}
                        >
                            <Upload {...props}>
                                <Button icon={<UploadOutlined />}>Select File</Button>
                            </Upload>
                        </Form.Item>

                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                            <div className='text-right'>
                                <Button style={{color: 'blue'}} type="primary" htmlType="submit">
                                    Submit
                                </Button>
                            </div>
                        </Form.Item>
                    </Form>
                </div>

            </Modal>
            <div className="relative overflow-hidden rounded-sm">
                <section className="">
                    <div className="w-full mb-12">
                        <div className="relative flex flex-col w-full min-w-0 mb-6 text-black break-words rounded shadow-lg bg-white">
                            <div className="block w-full overflow-x-auto ">
                                <table className="items-center w-full bg-transparent border-collapse">
                                    <thead>
                                        <tr>
                                            {/* <th className="px-6 py-3 text-lg font-semibold text-left text-gray-300 uppercase align-middle bg-blue-500 border border-l-0 border-r-0 border-blue-700 border-solid whitespace-nowrap">Name</th> */}
                                            {/* <th className="px-6 py-3 text-lg font-semibold text-left text-gray-300 uppercase align-middle bg-blue-500 border border-l-0 border-r-0 border-blue-700 border-solid whitespace-nowrap">Description</th> */}
                                            <th className="px-6 py-3 text-lg font-semibold text-left text-gray-300 uppercase align-middle bg-blue-500 border border-l-0 border-r-0 border-blue-700 border-solid whitespace-nowrap">Video</th>
                                            {/* <th className="px-6 py-3 text-lg font-semibold text-left text-gray-300 uppercase align-middle bg-blue-500 border border-l-0 border-r-0 border-blue-700 border-solid whitespace-nowrap">Organizer</th>
                                                <th className="px-6 py-3 text-lg font-semibold text-left text-gray-300 uppercase align-middle bg-blue-500 border border-l-0 border-r-0 border-blue-700 border-solid whitespace-nowrap">Attendee</th> */}
                                            {/* <th className="px-6 py-3 text-lg font-semibold text-left text-gray-300 uppercase align-middle bg-blue-500 border border-l-0 border-r-0 border-blue-700 border-solid whitespace-nowrap">Location</th> */}
                                            {/* <th className="px-6 py-3 text-lg font-semibold text-left text-gray-300 uppercase align-middle bg-blue-500 border border-l-0 border-r-0 border-blue-700 border-solid whitespace-nowrap">Amount</th>
                                                <th className="px-6 py-3 text-lg font-semibold text-left text-gray-300 uppercase align-middle bg-blue-500 border border-l-0 border-r-0 border-blue-700 border-solid whitespace-nowrap">R/N</th> */}
                                            <th className="px-6 py-3 text-lg font-semibold text-left text-gray-300 uppercase align-middle bg-blue-500 border border-l-0 border-r-0 border-blue-700 border-solid whitespace-nowrap">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {eventsList?.map((event, index) => {
                                            return (
                                                <tr key={event?._id}>
                                                    {/* <th className="flex items-center p-4 px-6 text-lg text-left align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">
                                                        <span className="ml-3 font-bold text-black"> {event?.title} </span>
                                                    </th> */}
                                                    {/* <td className="p-4 px-6 text-lg align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">{event?.subtitle}</td> */}

                                                    <td className="p-4 px-6 text-lg align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <span className="mr-2 text-blue">
                                                                <a style={{ color: 'blue' }} href={`${apiUrl}/${event.videoPath}`} target='_blank' rel="noreferrer">{event?.title ?? "--"}</a>
                                                            </span>
                                                        </div>
                                                    </td>

                                                    <td className="p-4 px-6 text-lg align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">
                                                        <div className="flex items-center cursor-pointer">
                                                            <span className="mr-2">
                                                                <span
                                                                    onClick={() => {
                                                                        setOpen(true);
                                                                        setSelected(event)
                                                                    }}
                                                                    className='cursor-pointer'
                                                                >
                                                                    <EditFilled style={{fontSize: "20px"}}  />
                                                                </span>
                                                            </span>
                                                            {/* <span className="mr-2" onClick={() => handleDeleteConfirm(event?._id)}>
                                                                <DeleteFilled style={{ color: 'red', fontSize: "20px" }} />
                                                            </span> */}
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        })}

                                    </tbody>
                                </table>
                                {eventsList?.length === 0 ?
                                    <div className='text-center p-5'>
                                        No Courses found
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

export default Videos
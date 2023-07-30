import React from 'react'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import ReactDOMServer from 'react-dom/server';
import { Button, Modal } from 'antd';
import Certificate from './Certificate/Certificate';

import { Page, View, Document, StyleSheet } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

const CourseDetails = () => {

    const location = useLocation()
    // const navigate = useNavigate()
    console.warn("Details -----", location)

    const [open, setOpen] = useState(false);
    const [currentData, setCurrentData] = useState(false);
    const [certificateMOdal, setCertificateModal] = useState(false);

    const showModal = () => {
        setOpen(true);
    };

    const handleOk = () => {
        setTimeout(() => {
            setOpen(false);
        }, 2000);
    };

    const handleCancel = () => {
        console.log('Clicked cancel button');
        setCurrentData('')
        setOpen(false);
    };

    const handleDownload = () => {
        const jsxString = ReactDOMServer.renderToStaticMarkup(
          <Certificate courseData={currentData} />
        );
        const blob = new Blob([jsxString], { type: 'pdf;' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'certificate.pdf';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      };

    const downloadCertificate = () => {
        console.log("Download certificate ........!!!")
        setCertificateModal(true)
        // handleDownload()
    };

  return (
    <div style={{marginTop: '200px'}}>
        <div className="" style={{padding: '50px'}} >
                <div className="d-flex">
                    <div className="">
                        <label className="" htmlFor="grid-first-name">
                            Title
                        </label>
                        <input disabled defaultValue={location?.state?.title} className="" id="grid-first-name" type="text" placeholder="" />
                        {/* <p className="text-red text-xs italic">Please fill out this field.</p> */}
                    </div>
                    <div className="md:w-1/2 px-3">
                        <label className="" htmlFor="grid-last-name">
                            Subtitle
                        </label>
                        <input disabled defaultValue={location?.state?.subtitle} className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4" id="grid-last-name" type="text" placeholder="" />
                    </div>
                </div>

                <div className="md:flex my-4">
                    {location?.state?.videoPath?.map((item, index)=> {
                        return (
                            <div key={index} style={{display: 'flex', justifyContent: 'space-between', width: '20%', padding: '10px 0px'}}>
                               <div>Video {index+1}</div>
                               <div style={{ cursor: 'pointer'}} onClick={()=> {
                                showModal()
                                setCurrentData(item)
                               }}>Play</div>
                            </div>
                        )
                    })}
                </div>
                <div className='my-3 text-right' style={{width: '250px', marginTop: '100px'}}>
                    <button onClick={downloadCertificate} type="button" data-te-ripple-init data-te-ripple-color="light" className="inline-block rounded bg-blue-500 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 ">
                        Download Certificate
                    </button>
                </div>
            </div>

          <div style={{marginTop: '300px'}}>
              <Modal
                  title={<span className='text-2xl font-bold mb-5'>Add Course</span>}
                  open={open}
                  onOk={handleOk}
                  onCancel={handleCancel}
                  footer={false}
                  style={{ zIndex: '6666' }}
              >
                  <div className='my-5'>
                      <video controls autoplay loop muted playsinline style={{ width: '470px', height: '300px' }}>
                          <source src={`http://localhost:4000/${currentData}`} type="video/mp4" />
                          Your browser does not support the video tag.
                      </video>

                      <div className='text-right'>
                          <Button style={{ color: 'blue' }} onClick={handleCancel} type="primary" htmlType="submit">
                              Close
                          </Button>
                      </div>
                  </div>
              </Modal >

              <Modal
                  title={<span className='text-2xl font-bold mb-5'>Certificate of completion</span>}
                  open={certificateMOdal}
                  width={850}
                  height={600}
                  onOk={()=>setCertificateModal(false)}
                  onCancel={()=> setCertificateModal(false)}
                  footer={false}
                  style={{ zIndex: '6666', marginTop: '200px', width: '800px', height: '600px' }}
              >
                  <div className='my-5'>
                      <Document>
                          <Page size="A4" style={styles.page}>
                              <View style={styles.section}>
                                  <Certificate courseData={currentData} />
                              </View>
                          </Page>
                      </Document>

                      <div className='text-right'>
                          <Button style={{ color: 'blue' }} onClick={()=> {
                            setCertificateModal(false);
                            handleDownload()
                            // window.print();
                            }} type="primary" htmlType="submit">
                              Print
                          </Button>
                          {/* <PDFDownloadLink document={<Certificate courseData={currentData} />} fileName="certificate.pdf">
                              {({ blob, url, loading, error }) =>
                                  loading ? 'Loading document...' : 'Download PDF'
                              }
                          </PDFDownloadLink> */}
                      </div>
                  </div>
              </Modal >
          </div>
    </div>
  )
}

export default CourseDetails
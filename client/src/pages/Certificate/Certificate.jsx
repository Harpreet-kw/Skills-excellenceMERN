import React from 'react'
import './certificate.css'
import { useState, useEffect } from 'react'
import moment from 'moment';


const Certificate = ({ courseData }) => {
    const [userDetails, setUserDetails] = useState()

    useEffect(()=> {
        const user = sessionStorage.getItem("user")
        const userD = JSON.parse(user)
        setUserDetails(userD)
    }, [])

  return (
    <div>
          <div className="container pm-certificate-container">
              <div className="outer-border" />
              <div className="inner-border" />
              <div className="pm-certificate-border col-xs-12">
                  <div className="row pm-certificate-header">
                      <div className="pm-certificate-title cursive col-xs-12 text-center">
                          <h2>Skills Excellence</h2>
                      </div>
                  </div>
                  <div className="row pm-certificate-body">
                      <div className="pm-certificate-block">
                          <div className="col-xs-12">
                              <div className="row">
                                  <div className="col-xs-2">{/* LEAVE EMPTY */}</div>
                                  <div className="pm-certificate-name underline margin-0 col-xs-8 text-center">
                                      <span className="pm-name-text bold">{userDetails?.username}</span>
                                  </div>
                                  <div className="col-xs-2">{/* LEAVE EMPTY */}</div>
                              </div>
                          </div>
                          <div className="col-xs-12">
                              <div className="row">
                                  <div className="col-xs-2">{/* LEAVE EMPTY */}</div>
                                  <div className="pm-earned col-xs-8 text-center">
                                      <span className="pm-earned-text padding-0 block cursive">has earned</span>
                                      {/* <span className="pm-credits-text block bold sans">PD175: 1.0 Credit Hours</span> */}
                                  </div>
                                  <div className="col-xs-2">{/* LEAVE EMPTY */}</div>
                                  <div className="col-xs-12" />
                              </div>
                          </div>
                          <div className="col-xs-12">
                              <div className="row">
                                  <div className="col-xs-2">{/* LEAVE EMPTY */}</div>
                                  <div className="pm-course-title col-xs-8 text-center">
                                      <span className="pm-earned-text block cursive">while completing the training course entitled</span>
                                  </div>
                                  <div className="col-xs-2">{/* LEAVE EMPTY */}</div>
                              </div>
                          </div>
                          <div className="col-xs-12">
                              <div className="row">
                                  <div className="col-xs-2">{/* LEAVE EMPTY */}</div>
                                  <div className="pm-course-title underline col-xs-8 text-center">
                                      <span className="pm-credits-text block bold sans">{courseData?.title}</span>
                                  </div>
                                  <div className="col-xs-2">{/* LEAVE EMPTY */}</div>
                              </div>
                          </div>
                      </div>
                      <div className="col-xs-12">
                          <div className="row">
                              <div className="pm-certificate-footer">
                                  <div className="col-xs-4 pm-certified col-xs-4 text-center">
                                      <span className="pm-credits-text block sans">Skills Excellence</span>
                                      <div>#6654774</div>
                                      <span className="pm-empty-space block underline" />
                                      {/* <span className="bold block">Crystal Benton Instructional Specialist II, Staff Development</span> */}
                                  </div>
                                  <div className="col-xs-4">
                                      {/* LEAVE EMPTY */}
                                  </div>
                                  <div className="col-xs-4 pm-certified col-xs-4 text-center">
                                      <span className="pm-credits-text block sans">Date Completed</span>
                                      <div>{moment(new Date()).format('LL')}</div>
                                      <span className="pm-empty-space block underline" />
                                      {/* <span className="bold block">DOB: </span>
                                      <span className="bold block">Social Security # (last 4 digits)</span> */}
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>

    </div>
  )
}

export default Certificate
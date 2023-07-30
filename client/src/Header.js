/* eslint-disable jsx-a11y/anchor-is-valid */
import {Link} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {UserContext} from "./UserContext";

export default function Header() {
  const {setUserInfo,userInfo} = useContext(UserContext);
  useEffect(() => {
    fetch('http://localhost:4000/profile', {
      credentials: 'include',
    }).then(response => {
      response.json().then(userInfo => {
        setUserInfo(userInfo);
      });
    });
  }, []);

  function logout() {
    fetch('http://localhost:4000/logout', {
      credentials: 'include',
      method: 'POST',
    });
    setUserInfo(null);
  }

  const username = userInfo?.username;

  return (
    <>
      <header>
      <nav style={{backgroundColor:'white'}} className="navbar navbar-default navbar-fixed-top" role="navigation">
        <div className="navigation">
          <div className="container">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target=".navbar-collapse.collapse">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <div className="navbar-brand">
                <Link to="/" className="logo">Skills Excellence</Link>
              </div>
            </div>

            <div className="navbar-collapse collapse">
              <div className="menu">
                <ul className="nav nav-tabs" role="tablist">
                  <li role="presentation"><a href="/" className="active">Home</a></li>
                  {username && (
                    <>
                    <li role="presentation"><Link to="/view-jobs">View job</Link></li>
                    <li role="presentation"><Link to="/services">View Services</Link></li>
                    <li role="presentation"><Link to="/courses">View Courses</Link></li>
                    <li role="presentation"><Link to="/events">View Events</Link></li>
                    <li role="presentation"><Link to="/profile">Profile</Link></li>
                    <li role="presentation"><a onClick={logout}>Logout ({username})</a></li>
                      {/* <Link to="/create">Add new job</Link>
                      <a onClick={logout}>Logout ({username})</a> */}
                    </>
                  )}
                  {!username && (
                    <>
                    <li role="presentation"><Link to="/login">Login</Link></li>
                    <li role="presentation"><Link to="/register">Register</Link></li>
                    </>
                  )}
          
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
    </>
    
  );
}

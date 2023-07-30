import {useContext, useEffect } from "react";
import {UserContext} from "./UserContext";
import { useLocation, useNavigate } from 'react-router-dom';
import { apiUrl } from "./utils/settings";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation()
  const {setUserInfo,userInfo} = useContext(UserContext);
  useEffect(() => {
    fetch(`${apiUrl}/profile`, {
      credentials: 'include',
    }).then(response => {
      response.json().then(userInfo => {
        setUserInfo(userInfo);
      });
    });
  }, []);

  function logout() {
    
    fetch(`${apiUrl}/admin_logout`, {
      credentials: 'include',
      method: 'POST',
    });
    // setUserInfo(null);
    sessionStorage.removeItem("login")
    location.reload()
    navigate('/')
  }

  const username = userInfo?.username;

  return (
    <>
      <div className="brand clearfix">
        <a href="/landing" style={{fontSize: '20px', paddingTop: '12px',paddingLeft: '10px', position: 'absolute', color: '#fff'}}>Skills Excellence</a>  
        <span className="menu-btn"><i className="fa fa-bars"></i></span>
        <ul className="ts-profile-nav">
          
          <li className="ts-account">
            <a href="#"><img src="img/ts-avatar.jpg" className="ts-avatar hidden-side" alt="" /> Account <i className="fa fa-angle-down hidden-side"></i></a>
            <ul>
              <li><a onClick={logout} >Logout</a></li>
            </ul>
          </li>
        </ul>
      </div>
    </>
    
  );
}

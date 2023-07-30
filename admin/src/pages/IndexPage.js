import {useContext, useState} from "react";
import {Navigate} from "react-router-dom";
import {UserContext} from "../UserContext";
import { apiUrl } from "../utils/settings";

export default function IndexPage() {

  const [username,setUsername] = useState('');
  const [password,setPassword] = useState('');
  const [redirect,setRedirect] = useState(false);
  const {setUserInfo} = useContext(UserContext);
  async function login(ev) {
    ev.preventDefault();
    const response = await fetch(`${apiUrl}/admin_login`, {
      method: 'POST',
      body: JSON.stringify({username, password}),
      headers: {'Content-Type':'application/json'},
      credentials: 'include',
    });
    if (response.ok) {
      response.json().then(userInfo => {
        setUserInfo(userInfo);
        setRedirect(true);
      });
    } else {
      alert('wrong credentials');
    }
  }

  if (redirect) {
    return <Navigate to={'/landing'} />
  }
  return (
    <>
      <div className="login-page bk-img" style={{backgroundColor:'black'}}>
        <div className="form-content">
          <div className="container">
            <div className="row">
              <div className="col-md-6 col-md-offset-3">
                <h1 className="text-center text-bold text-light mt-4x">Skills Excellence(Admin Login)</h1>
                <div className="well row pt-2x pb-3x bk-light">
                  <div className="col-md-8 col-md-offset-2">
                    <form method="post" className="login" onSubmit={login}>

                      <label for="" className="text-uppercase text-sm">Email </label>
                      <input type="text"
                        placeholder="username"
                        value={username}
                        onChange={ev => setUsername(ev.target.value)} required />

                      <label for="" className="text-uppercase text-sm">Password</label>
                      <input type="password"
                        placeholder="password"
                        value={password}
                        onChange={ev => setPassword(ev.target.value)} required inputMode="email"/>
                      <button className="btn btn-primary btn-block" name="login" type="submit">LOGIN</button>

                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
      
  );
}
import {Link} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {UserContext} from "./UserContext";

export default function Footer() {
  
  return (
    <>
      <footer>
        <div className="footer">
          <div className="container">
            <div className="social-icon">
              <div className="col-md-4">
                <ul className="social-network">
                  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https://www.purehacking.com/security-consulting/security-assurance-workshop&t=Security%20Assurance%20Workshop%20|%20Pure%20Hacking" className="fb tool-tip" title="Facebook"><i className="fa fa-facebook"></i></a></li>
                  <li><a href="https://twitter.com/intent/tweet?text=Security+Assurance+Workshop+%7C+Pure+Hacking+-+https%3A%2F%2Fwww.purehacking.com%2Fsecurity-consulting%2Fsecurity-assurance-workshop%20via%20@purehacking" className="twitter tool-tip" title="Twitter"><i className="fa fa-twitter"></i></a></li>
                  <li><a href="https://plus.google.com/share?url=https://www.purehacking.com/security-consulting/security-assurance-workshop&title=Security%20Assurance%20Workshop%20|%20Pure%20Hacking" className="gplus tool-tip" title="Google Plus"><i className="fa fa-google-plus"></i></a></li>
                  <li><a href="https://www.linkedin.com/shareArticle?mini=true&url=https://www.purehacking.com/security-consulting/security-assurance-workshop&title=Security%20Assurance%20Workshop%20|%20Pure%20Hacking" className="linkedin tool-tip" title="Linkedin"><i className="fa fa-linkedin"></i></a></li>
                </ul>
              </div>
            </div>

            <div className="col-md-4 col-md-offset-4">
              <div className="copyright">
                <strong style={{color: '#fff'}}>&copy;  2019 Skills Excellence | privacy</strong>
              </div>
            </div>
          </div>

          <div className="pull-right">
            <a href="#home" className="scrollup"><i className="fa fa-angle-up fa-3x"></i></a>
          </div>
        </div>
      </footer>
    </>
    
  );
}

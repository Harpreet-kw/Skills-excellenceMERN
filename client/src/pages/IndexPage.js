

export default function IndexPage() {

  return (
    <>
      <section id="main-slider" className="no-margin">
        <div className="carousel slide">
          <div className="carousel-inner">
            <div className="item active" style={{backgroundImage: 'url(Images/slider/bg1.jpg)'}}>
              <div className="container">
                <div className="row slide-margin">
                  <div className="col-sm-6">
                    <div className="carousel-content">
                      <h2 className="animation animated-item-1">Skills <span>Excellence</span></h2>
                      <p className="animation animated-item-2">BUILDING SMARTER AND STRONGER DIGITAL DEFENCES</p>
                      <a className="btn-slide animation animated-item-3" href="about.html">Read More</a>
                    </div>
                  </div>

                  <div className="col-sm-6 hidden-xs animation animated-item-4">
                
                  </div>

                </div>
              </div>
            </div>
            {/* <!--/.item--> */}
          </div>
          {/* <!--/.carousel-inner--> */}
        </div>
        {/* <!--/.carousel--> */}
      </section>
      {/* <!--/#main-slider--> */}

      <div className="feature">
        <div className="container">
          <div className="text-center">
            <div className="col-md-3">
              <div className="hi-icon-wrap hi-icon-effect wow fadeInDown" data-wow-duration="1000ms" data-wow-delay="300ms">
                <a href="penetration.html"><i className="fa fa-gears"></i></a>
                <h2><a href="penetration.html">JOB Search</a></h2>
                <p>Application
          <br/>Infrastructure
          <br/>Cloud and Virtualisation
          <br/>Social Networking
          <br/>VoIP
          <br/>Wireless</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="hi-icon-wrap hi-icon-effect wow fadeInDown" data-wow-duration="1000ms" data-wow-delay="600ms">
                <a href="services.html"><i className="fa fa-laptop"></i></a>
                <h2><a href="services.html">Even Notification</a></h2>
          <p>Web Application Firewall and SkillsWAF
          <br/>SIEM
          <br/>Enguard Vulnerability Management
          <br/>Account Auditor
          <br/>Support Packages</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="hi-icon-wrap hi-icon-effect wow fadeInDown" data-wow-duration="1000ms" data-wow-delay="900ms">
                <a href="governance.html"><i className="fa fa-group"></i></a>
                <h2><a href="governance.html">Cources and certification</a></h2>
                <p>ISO 27001
          <br/>Risk and Gap Assessment
          <br/>Compliance Assessments
          <br/>Security Strategy
          <br/>Security Policy
          <br/>Data Flow Analysis</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="hi-icon-wrap hi-icon-effect wow fadeInDown" data-wow-duration="1000ms" data-wow-delay="1200ms">
                <a href="security.html"><i className="fa fa-lock"></i></a>
                <h2><a href="security.html">Daily based</a></h2>
                <p>just Been Hacked?
          <br/>Forensic / Incident Response
          <br/>Configuration Analysis
          <br/>Architecture and Design Review
          <br/>Security Assurance Workshop</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="about">
        <div className="container">
          
            <strong><h2>Why Skills Excellence?</h2></strong>
            <p>At Skills Excellence our aim is to maintain and develop world leading resources to protect our clients now and in the future.</p>
            
        </div>
      </div>

      <div className="lates">
        <div className="container">
          <div className="text-center">
            <h2>TWITTER FEED</h2>
          </div>
          <div className="col-md-4 wow fadeInDown" data-wow-duration="1000ms" data-wow-delay="300ms">
            <img src="Images/4.jpg" alt="" className="img-responsive" />
            <h3>30/09/2019 - 03:46</h3>
            <p>Only 7 days until #CYBERCON, and it's not too late to register, https://t.co/zS8H3dX6t0 - come see us at Booth 58 i… <a href="https://t.co/jF3hC0bDye">https://t.co/jF3hC0bDye</a>
            </p>
          </div>

          <div className="col-md-4 wow fadeInDown" data-wow-duration="1000ms" data-wow-delay="600ms">
            <img src="Images/5.jpg" alt="" className="img-responsive" />
            <h3>10/08/2016 - 07:37</h3>
            <p>Census Site Crash <a href="https://t.co/B10ikR7Xiq">https://t.co/B10ikR7Xiq</a>
            </p>
          </div>

          <div className="col-md-4 wow fadeInDown" data-wow-duration="1000ms" data-wow-delay="900ms">
            <img src="Images/6.jpg" alt="" className="img-responsive" />
            <h3>19/07/2016 - 05:33</h3>
            <p>Three quick wins for sysadmins to vastly improve their organisation's security and reduce their attack surface: <a href="https://t.co/jqI2WgQ3Gn">https://t.co/jqI2WgQ3Gn</a>
            </p>
          </div>
        </div>
      </div>

      <section id="conatcat-info">
        <div className="container">
          <div className="row">
            <div className="col-sm-8">
              <div className="media contact-info wow fadeInDown" data-wow-duration="1000ms" data-wow-delay="600ms">
                <div className="pull-left">
                  <i className="fa fa-phone"></i>
                </div>
                <div className="media-body">
                  <h2>DOES YOUR BUSINESS NEED HELP?</h2>
                  <p>&nbsp;&nbsp;&nbsp; Call 1300 884 218</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!--/.container--> */}
      </section>
      {/* <!--/#conatcat-info--> */}
      <br/><hr/>
      <section id="contact-page">
        <div className="container">
          <div className="center">
            <h2>Drop Your Message</h2>
          </div>
          <div className="row contact-wrap">
            <div className="status alert alert-success" style={{display: 'none'}}></div>
            <div className="col-md-6 col-md-offset-3">
              <div id="sendmessage">Your message has been sent. Thank you!</div>
              <div id="errormessage"></div>
              <form action="" method="post" role="form" className="contactForm">
                <div className="form-group">
                  <input type="text" name="name" className="form-control" id="name" placeholder="Your Name" data-rule="minlen:4" data-msg="Please enter at least 4 chars" />
                  <div className="validation"></div>
                </div>
                <div className="form-group">
                  <input type="email" className="form-control" name="email" id="email" placeholder="Your Email" data-rule="email" data-msg="Please enter a valid email" />
                  <div className="validation"></div>
                </div>
                <div className="form-group">
                  <input type="text" className="form-control" name="subject" id="subject" placeholder="Subject" data-rule="minlen:4" data-msg="Please enter at least 8 chars of subject" />
                  <div className="validation"></div>
                </div>
                <div className="form-group">
                  <textarea className="form-control" name="message" rows="5" data-rule="required" data-msg="Please write something for us" placeholder="Message"></textarea>
                  <div className="validation"></div>
                </div>
                <div className="text-center"><button type="submit" name="submit" className="btn btn-primary btn-lg" required="required">Submit Message</button></div>
              </form>
            </div>
          </div>
          {/* <!--/.row--> */}
        </div>
        {/* <!--/.container--> */}
      </section>
    </>
  );
}
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  let [settingData, setSettingData] = useState({
    logo: import.meta.env.VITE_APP_LOGO,
    siteName: import.meta.env.VITE_APP_SITE_NAME,
    facebook: import.meta.env.VITE_APP_FACEBOOK,
    twitter: import.meta.env.VITE_APP_TWITTER,
    instagram: import.meta.env.VITE_APP_INSTAGRAM,
    linkedin: import.meta.env.VITE_APP_LINKEDIN,
    youtube: import.meta.env.VITE_APP_YOUTUBE
  })

  useEffect(() => {
    (async () => {
      let response = await fetch(`${import.meta.env.VITE_APP_BACKEND_SERVER}/setting`, {
        method: 'GET',
        headers: {
          'content-type': 'application/json'
        }
      })
      response = await response.json()
      setSettingData({
        ...settingData,
        siteName: response.data.siteName || settingData.siteName,
        facebook: response.data.facebook || settingData.facebook,
        twitter: response.data.twitter || settingData.twitter,
        linkedin: response.data.linkedin || settingData.linkedin,
        instagram: response.data.instagram || settingData.instagram,
        youtube: response.data.youtube || settingData.youtube
      })
    })()
  }, [])
  return (
    <footer className="footer-area footer-eleven bg-dark">
      <div className="footer-top">
        <div className="container">
          <div className="inner-content">
            <div className="row">
              <div className="col-lg-4 col-md-6 col-12">
                <div className="footer-widget f-about">
                  <div className="logo">
                    <a href="index.html">
                      <img src={settingData.logo} alt="#" className="img-fluid" />
                    </a>
                  </div>
                  <p className='text-light'>AtoZBot is a powerful Generative AI platform built with the MERN stack, designed to help users create smart AI solutions, automate tasks, and enhance productivity with modern technology. 🚀</p>
                  <p className="copyright-text text-light">
                    <span>Copyright© {new Date().getFullYear()} {settingData.siteName}</span>
                  </p>
                </div>
              </div>
              <div className="col-lg-2 col-md-6 col-12">
                <div className="footer-widget f-link">
                  <h5 className='text-light'>Quick Links</h5>
                  <ul>
                    <li><Link className='text-light' to="/">Home</Link></li>
                    <li><Link className='text-light' to="/about">About</Link></li>
                    <li><Link className='text-light' to="/service">Service</Link></li>
                    <li><Link className='text-light' to="/pricing">Pricing</Link></li>
                    <li><Link className='text-light' to="/faq">Faq</Link></li>
                    <li><Link className='text-light' to="/contactus">Contact Us</Link></li>
                    <li><Link className='text-light' to="/privacy-policy">Privacy Policy</Link></li>
                    <li><Link className='text-light' to="/tc">Term and Conditions</Link></li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-2 col-md-6 col-12">
                <div className="footer-widget f-link">
                  <h5 className='text-light'>Generate Links</h5>
                  <ul>
                    <li><Link className='text-light' to="/text">Text</Link></li>
                    <li><Link className='text-light' to="/image">Image</Link></li>
                    <li><Link className='text-light' to="/video">Video</Link></li>
                    <li><Link className='text-light' to="/music">Music</Link></li>
                    <li><Link className='text-light' to="/speech">Speech</Link></li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 col-12">
                <div className="footer-widget newsletter">
                  <h5 className='text-light'>Subscribe</h5>
                  <p className='text-light'>Subscribe to our newsletter for the latest updates</p>
                  <form action="#" method="get" target="_blank" className="newsletter-form">
                    <input name="EMAIL" placeholder="Email address" required="required" type="email" />
                    <div className="button">
                      <button className="sub-btn">
                        <i className="lni lni-envelope"></i>
                      </button>
                    </div>
                  </form>
                  <div className="mt-5">
                    <h5 className="social-title text-light mb-3">Follow Us On</h5>
                    <ul className='d-flex'>
                      <li className='me-3'><Link className='text-light fs-4' to={settingData.facebook}><i className="lni lni-facebook-filled"></i></Link></li>
                      <li className='me-3'><Link className='text-light fs-4' to={settingData.twitter}><i className="lni lni-twitter-filled"></i></Link></li>
                      <li className='me-3'><Link className='text-light fs-4' to={settingData.instagram}><i className="lni lni-instagram-filled"></i></Link></li>
                      <li className='me-3'><Link className='text-light fs-4' to={settingData.linkedin}><i className="lni lni-linkedin"></i></Link></li>
                      <li className='me-3'><Link className='text-light fs-4' to={settingData.youtube}><i className="lni lni-youtube"></i></Link></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

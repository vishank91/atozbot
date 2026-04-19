import React, { useState, useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'

export default function Navbar() {
  let navigate = useNavigate()
  let [settingData, setSettingData] = useState({
    logo: import.meta.env.VITE_APP_LOGO,
    logoWhite: import.meta.env.VITE_APP_LOGO_WHITE,
    siteName: import.meta.env.VITE_APP_SITENAME,
    facebook: import.meta.env.VITE_APP_FACEBOOK,
    twitter: import.meta.env.VITE_APP_TWITTER,
    instagram: import.meta.env.VITE_APP_INSTAGRAM,
    linkedin: import.meta.env.VITE_APP_LINKEDIN,
    youtube: import.meta.env.VITE_APP_YOUTUBE
  })
  let [showSidebar, setShowSidebar] = useState(false)

  function logout() {
    localStorage.clear()
    navigate("/login")
  }

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
    <>
      <section className="navbar-area navbar-nine">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <nav className="navbar navbar-expand-lg">
                <Link className="navbar-brand" to="/">
                  <img src={settingData.logo} alt="Logo" height={50} width={100} />
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNine"
                  aria-controls="navbarNine" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="toggler-icon"></span>
                  <span className="toggler-icon"></span>
                  <span className="toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse sub-menu-bar" id="navbarNine">
                  <ul className="navbar-nav me-auto">
                    <li className="nav-item"><NavLink className="page-scroll" to="/">Home</NavLink></li>
                    <li className="nav-item"><NavLink className="page-scroll" to="/about">About</NavLink></li>
                    <li className="nav-item"><NavLink className="page-scroll" to="/feature">Feature</NavLink></li>
                    <li className="nav-item"><NavLink className="page-scroll" to="/pricing">Pricing</NavLink></li>
                    <li className="nav-item"><NavLink className="page-scroll" to="/faq">Faq</NavLink></li>
                    <li className="nav-item"><NavLink className="page-scroll" to="/contactus">ContactUs</NavLink></li>
                    <li className="nav-item">
                      <div className="dropdown">
                        <a className="page-scroll" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                          Generation
                        </a>
                        <ul className="dropdown-menu">
                          <li><Link className="text-dark" style={{ margin: "0" }} to="/text">Text to Text</Link></li>
                          <li><Link className="text-dark" style={{ margin: "0" }} to="/image">Text to Image</Link></li>
                          <li><Link className="text-dark" style={{ margin: "0" }} to="/video">Text to Video</Link></li>
                          <li><Link className="text-dark" style={{ margin: "0" }} to="/music">Text to Music</Link></li>
                          <li><Link className="text-dark" style={{ margin: "0" }} to="/speech">Text to Speech</Link></li>
                        </ul>
                      </div>
                    </li>
                    {localStorage.getItem("login") ?
                      <li className="nav-item">
                        <div className="dropdown">
                          <a className="page-scroll" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            {localStorage.getItem("name")}
                          </a>
                          <ul className="dropdown-menu">
                            <li><Link className="text-dark" style={{ margin: "0" }} to="/profile">Profile</Link></li>
                            <li><button className="btn" style={{ margin: "0", marginLeft: -6, fontWeight: 600, fontSize: 14 }} onClick={logout}>Logout</button></li>
                          </ul>
                        </div>
                      </li> :
                      <li className="nav-item"><NavLink className="page-scroll" to="/login">Login</NavLink></li>
                    }
                  </ul>
                </div>

                <div className="navbar-btn d-none d-lg-inline-block">
                  <a className="menu-bar" to="#side-menu-left" onClick={() => setShowSidebar(true)}><i className="lni lni-menu"></i></a>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </section>

      <div className={`sidebar-left ${showSidebar ? 'open' : ''}`}>
        <div className="sidebar-close">
          <a className="close" to="#close" onClick={() => setShowSidebar(false)}><i className="lni lni-close"></i></a>
        </div>
        <div className="sidebar-content">
          <div className="sidebar-logo">
            <a to="index.html"><img src={settingData.logoWhite} height={70} alt="Logo" /></a>
          </div>
          <p className="text">AtoZBot is a powerful Generative AI platform built with the MERN stack, designed to help users create smart AI solutions, automate tasks, and enhance productivity with modern technology. 🚀</p>
          <div className="row">
            <div className="col-6">
              <div className="sidebar-menu">
                <h5 className="menu-title">Quick Links</h5>
                <ul>
                  <li><Link to="/">Home</Link></li>
                  <li><Link to="/about">About</Link></li>
                  <li><Link to="/pricing">Pricing</Link></li>
                  <li><Link to="/privacy">Privacy Policy</Link></li>
                  <li><Link to="/tc">Terms and Conditions</Link></li>
                </ul>
              </div>
            </div>
            <div className="col-6">
              <div className="sidebar-menu">
                <h5 className="menu-title">Generate Links</h5>
                <ul>
                  <li><Link to="/">Text</Link></li>
                  <li><Link to="/about">Image</Link></li>
                  <li><Link to="/pricing">Video</Link></li>
                  <li><Link to="/privacy">Music</Link></li>
                  <li><Link to="/tc">Speech</Link></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="sidebar-social align-items-center justify-content-center">
            <h5 className="social-title">Follow Us On</h5>
            <ul>
              <li><Link to={settingData.facebook}><i className="lni lni-facebook-filled"></i></Link></li>
              <li><Link to={settingData.twitter}><i className="lni lni-twitter-filled"></i></Link></li>
              <li><Link to={settingData.instagram}><i className="lni lni-instagram-filled"></i></Link></li>
              <li><Link to={settingData.linkedin}><i className="lni lni-linkedin"></i></Link></li>
              <li><Link to={settingData.youtube}><i className="lni lni-youtube"></i></Link></li>
            </ul>
          </div>
        </div>
      </div>
      <div className={`overlay-left ${showSidebar ? 'open' : ''}`}></div>
    </>
  )
}

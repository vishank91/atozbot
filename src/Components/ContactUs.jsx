import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function ContactUs() {
    let [settingData, setSettingData] = useState({
        address: import.meta.env.VITE_APP_ADDRESS,
        map1: import.meta.env.VITE_APP_MAP1,
        map2: import.meta.env.VITE_APP_MAP2,
        email: import.meta.env.VITE_APP_EMAIL,
        phone: import.meta.env.VITE_APP_PHONE,
        whatsapp: import.meta.env.VITE_APP_WHATSAPP,
        facebook: import.meta.env.VITE_APP_FACEBOOK,
        twitter: import.meta.env.VITE_APP_TWITTER,
        instagram: import.meta.env.VITE_APP_INSTAGRAM,
        linkedin: import.meta.env.VITE_APP_LINKEDIN,
        youtube: import.meta.env.VITE_APP_YOUTUBE
    })
    return (
        <>
            <section id="contact" className="contact-section">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-4">
                            <div className="contact-item-wrapper">
                                <div className="row">
                                    <div className="col-12 col-md-6 col-xl-12">
                                        <div className="contact-item">
                                            <div className="contact-icon">
                                                <i className="lni lni-map-marker"></i>
                                            </div>
                                            <div className="contact-content">
                                                <h4>Address</h4>
                                                <Link to={settingData.map1} target='_blank'>{settingData.address}</Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-6 col-xl-12">
                                        <div className="contact-item">
                                            <div className="contact-icon">
                                                <i className="lni lni-phone"></i>
                                            </div>
                                            <div className="contact-content">
                                                <h4>Contact</h4>
                                                <Link to={`tel:${settingData.phone}`} target='_blank'>{settingData.phone}</Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-6 col-xl-12">
                                        <div className="contact-item">
                                            <div className="contact-icon">
                                                <i className="lni lni-whatsapp"></i>
                                            </div>
                                            <div className="contact-content">
                                                <h4>WhataApp</h4>
                                                <Link to={`https://wa.me/${settingData.whatsapp}`} target='_blank'>{settingData.whatsapp}</Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-6 col-xl-12">
                                        <div className="contact-item">
                                            <div className="contact-icon">
                                                <i className="lni lni-envelope"></i>
                                            </div>
                                            <div className="contact-content">
                                                <h4>Eamil</h4>
                                                <Link to={`mailto:${settingData.email}`} target='_blank'>{settingData.email}</Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-6 col-xl-12">
                                        <div className="contact-item">
                                            <div className="contact-icon">
                                                <i className="lni lni-facebook"></i>
                                            </div>
                                            <div className="contact-content">
                                                <h4>Social Media</h4>
                                                <div className="">
                                                    <ul className='d-flex'>
                                                        <li className='me-3'><Link className='fs-4' to={settingData.facebook}><i className="lni lni-facebook-filled"></i></Link></li>
                                                        <li className='me-3'><Link className='fs-4' to={settingData.twitter}><i className="lni lni-twitter-filled"></i></Link></li>
                                                        <li className='me-3'><Link className='fs-4' to={settingData.instagram}><i className="lni lni-instagram-filled"></i></Link></li>
                                                        <li className='me-3'><Link className='fs-4' to={settingData.linkedin}><i className="lni lni-linkedin"></i></Link></li>
                                                        <li className='me-3'><Link className='fs-4' to={settingData.youtube}><i className="lni lni-youtube"></i></Link></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-8">
                            <div className="contact-form-wrapper">
                                <div className="row">
                                    <div className="col-xl-10 col-lg-8 mx-auto">
                                        <div className="section-title text-center">
                                            <span> Get in Touch </span>
                                            <h2>
                                                Ready to Get Started
                                            </h2>
                                            <p>
                                                At vero eos et accusamus et iusto odio dignissimos ducimus
                                                quiblanditiis praesentium
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <form action="#" className="contact-form">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <input type="text" name="name" id="name" placeholder="Name" required />
                                        </div>
                                        <div className="col-md-6">
                                            <input type="email" name="email" id="email" placeholder="Email" required />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <input type="text" name="phone" id="phone" placeholder="Phone" required />
                                        </div>
                                        <div className="col-md-6">
                                            <input type="text" name="subject" id="email" placeholder="Subject" required />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12">
                                            <textarea name="message" id="message" placeholder="Type Message" rows="5"></textarea>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="button text-center rounded-buttons">
                                                <button type="submit" className="btn primary-btn rounded-full">
                                                    Send Message
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="map-section map-style-9">
              <div className='w-100'>
                 <iframe className='w-100' height={500} src={import.meta.env.VITE_APP_MAP2} frameborder="0"></iframe>
              </div>
            </section >
        </>

    )
}

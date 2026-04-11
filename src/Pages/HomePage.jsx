import React from 'react'
import About from '../Components/About'
import Feature from '../Components/Feature'
import Pricing from '../Components/Pricing'
import ContactUs from '../Components/ContactUs'
import { Link } from 'react-router-dom'

export default function HomePage() {
  return (
    <>
      <section id="hero-area" className="header-area header-eight">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 col-md-12 col-12">
              <div className="header-content">
                <h1>Empower Your Ideas with AtoZBot AI 🚀</h1>
                <p>Build smarter applications using Generative AI with AtoZBot, powered by MERN stack for automation, creativity, and seamless user experiences.</p>
                <div className="btn-group mt-3">
                  <Link to="/text" className="me-3 text-light">Text</Link>
                  <Link to="/image" className="me-3 text-light">Image</Link>
                  <Link to="/video" className="me-3 text-light">Video</Link>
                  <Link to="/music" className="me-3 text-light">Music</Link>
                  <Link to="/speech" className="me-3 text-light">Speech</Link>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-12 col-12">
              <div className="header-image">
                <img src="/assets/images/banner.webp" alt="#" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <About />
      <Feature />
      <Pricing />
      <ContactUs />
    </>
  )
}

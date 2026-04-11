import React from 'react'

export default function About() {
    return (
        <>
            <section className="about-area about-five">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6 col-12">
                            <div className="about-image-five">
                                <img src="/assets/images/about-banner.webp" style={{height:400}} alt="about" />
                            </div>
                        </div>
                        <div className="col-lg-6 col-12">
                            <div className="about-five-content">
                                <h6 className="small-title text-lg">OUR STORY</h6>
                                <h2 className="main-title fw-bold fs-5">Empowering Innovation with AtoZBot – Transforming Ideas into Intelligent AI Solutions Using Modern MERN Stack Technology</h2>
                                <div className="about-five-tab">
                                    <nav>
                                        <div className="nav nav-tabs" id="nav-tab" role="tablist">
                                            <button className="nav-link active" id="nav-who-tab" data-bs-toggle="tab" data-bs-target="#nav-who"
                                                type="button" role="tab" aria-controls="nav-who" aria-selected="true">Who We Are</button>
                                            <button className="nav-link" id="nav-vision-tab" data-bs-toggle="tab" data-bs-target="#nav-vision"
                                                type="button" role="tab" aria-controls="nav-vision" aria-selected="false">our Vision</button>
                                            <button className="nav-link" id="nav-history-tab" data-bs-toggle="tab" data-bs-target="#nav-history"
                                                type="button" role="tab" aria-controls="nav-history" aria-selected="false">our History</button>
                                        </div>
                                    </nav>
                                    <div className="tab-content" id="nav-tabContent">
                                        <div className="tab-pane fade show active" id="nav-who" role="tabpanel" aria-labelledby="nav-who-tab">
                                            <p>AtoZBot is a next-generation Generative AI platform built with the MERN stack, designed to simplify complex tasks through intelligent automation. We help developers, creators, and businesses leverage AI for content creation, productivity, and scalable solutions, making advanced technology accessible and easy to use for everyone.</p>
                                        </div>
                                        <div className="tab-pane fade" id="nav-vision" role="tabpanel" aria-labelledby="nav-vision-tab">
                                            <p>Our vision is to make artificial intelligence accessible to everyone by providing powerful, easy-to-use tools that enhance creativity and efficiency. We aim to empower individuals and businesses to innovate faster, automate smarter, and unlock new possibilities using cutting-edge AI technology integrated with modern web development.</p>
                                        </div>
                                        <div className="tab-pane fade" id="nav-history" role="tabpanel" aria-labelledby="nav-history-tab">
                                            <p>AtoZBot started with a simple idea—to bridge the gap between AI technology and everyday users. Built using the MERN stack, the platform has evolved into a powerful solution offering automation, content generation, and intelligent workflows, continuously improving to meet the growing demands of modern digital environments.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

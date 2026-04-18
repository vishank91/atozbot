import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'


export default function PrivacyPolicyPage() {
    let [privacyPolicy, setPrivacyPolicy] = useState("")

    useEffect(() => {
        (async () => {
            let response = await fetch(`${import.meta.env.VITE_APP_BACKEND_SERVER}/setting`, {
                method: 'GET',
                headers: {
                    'content-type': 'application/json'
                }
            })
            response = await response.json()
            setPrivacyPolicy(response.data[0].privacyPolicy)
        })()
    }, [])
    return (
        <>
            <section id="services" className="services-area services-eight">
                <div className="section-title-five">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <div className="content">
                                    <h6>Features</h6>
                                    <h2 className="fw-bold">Privacy Policies</h2>
                                    <p>Learn how AtoZBot collects, uses, and protects your data while ensuring privacy, transparency, and secure AI-powered experiences 🔒</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container my-3">
                    <div dangerouslySetInnerHTML={{__html:privacyPolicy}}/>
                </div>
            </section>
        </>
    )
}

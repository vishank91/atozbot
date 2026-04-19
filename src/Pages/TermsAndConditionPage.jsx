import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'


export default function TermsAndConditionPage() {
    let [termsAndCondition, setTermsAndCondition] = useState("")

    useEffect(() => {
        (async () => {
            let response = await fetch(`${import.meta.env.VITE_APP_BACKEND_SERVER}/setting`, {
                method: 'GET',
                headers: {
                    'content-type': 'application/json'
                }
            })
            response = await response.json()
            setTermsAndCondition(response.data[0].termsAndCondition)
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
                                    <h6>Our Policies</h6>
                                    <h2 className="fw-bold">Terms and Condition</h2>
                                    <p>Understand the rules, responsibilities, and guidelines for using AtoZBot services, ensuring a safe and transparent user experience 📄</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container my-3">
                    <div dangerouslySetInnerHTML={{ __html: termsAndCondition }} />
                </div>
            </section>
        </>
    )
}

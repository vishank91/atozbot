import React, { useEffect, useState } from 'react'

export default function Feature() {
    let [data, setData] = useState([])

    useEffect(() => {
        (async () => {
            let response = await fetch(`${import.meta.env.VITE_APP_BACKEND_SERVER}/feature`, {
                method: 'GET',
                headers: {
                    'content-type': 'application/json'
                }
            })
            response = await response.json()
            setData(response.data)
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
                                    <h2 className="fw-bold">Our Best Features</h2>
                                    <p>Explore powerful AI-driven Features with AtoZBot to automate tasks, generate content, and enhance your productivity effortlessly 🚀</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        {data.map(item => {
                            return <div className="col-lg-4 col-md-6" key={item._id}>
                                <div className="single-services">
                                    <div className="service-icon m-auto">
                                        <span dangerouslySetInnerHTML={{__html:item.icon}}/>
                                    </div>
                                    <div className="service-content">
                                        <h4 className='text-center mt-3'>{item.name}</h4>
                                        <p style={{textAlign:"justify"}}>{item.shortDescription}</p>
                                    </div>
                                </div>
                            </div>
                        })}
                    </div>
                </div>
            </section>
        </>
    )
}

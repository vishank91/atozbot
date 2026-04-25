import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function Pricing() {
    let [data, setData] = useState([])

    useEffect(() => {
        (async () => {
            let response = await fetch(`${import.meta.env.VITE_APP_BACKEND_SERVER}/pricing`, {
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
        <section id="pricing" className="pricing-area pricing-fourteen">
            <div className="section-title-five">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="content">
                                <h6>Pricing</h6>
                                <h2 className="fw-bold">Pricing & Plans</h2>
                                <p>Choose the perfect AtoZBot plan that fits your needs, budget, and unlocks powerful AI features for growth 🚀</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    {data.map(item=>{
                        return <div className="card  col-lg-4 col-md-6 col-12" key={item._id}>
                        <div className="pricing-style-fourteen">
                            <div className="table-head">
                                <h6 className="title">{item.name}</h6>
                                <p style={{height:110}}>{item.shortDescription}</p>
                                <div className='d-flex justify-content-center'>
                                    <del>&#8377;{item.basePrice}</del>
                                    <span className='ms-3'>&#8377;{item.finalPrice}</span>
                                    <sup>{item.discount}% Off</sup>
                                </div>
                            </div>

                            <div className="light-rounded-buttons">
                                <Link to={`/payment/${item._id}`} className="btn primary-btn-outline">
                                    Upgrate
                                </Link>
                            </div>

                            <div className="table-content">
                                <div className='text-start' dangerouslySetInnerHTML={{__html:item.description}}/>
                            </div>
                        </div>
                    </div>
                    })}
                </div>
            </div>
        </section>
    )
}

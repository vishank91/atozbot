import React, { useEffect, useState } from 'react'
import Pricing from '../../Components/Pricing'

export default function ProfilePage() {
    let [data, setData] = useState([])

    useEffect(() => {
        (async () => {
            try {
                let response = await fetch(`${import.meta.env.VITE_APP_BACKEND_SERVER}/user/${localStorage.getItem("userid")}`, {
                    method: "GET",
                    headers: {
                        "content-type": "application/json"
                    }
                })
                response = await response.json()
                if (response.result === "Done")
                    setData(response.data)
                else {
                    alert(response.reason)
                }
            } catch (error) {
                console.log(error)
            }
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
                                    <h6>Profile</h6>
                                    <h2 className="fw-bold">Your Profile</h2>
                                    <p>Manage your AtoZBot profile to track activity, access purchased plans, update personal details, and personalize your AI experience for better productivity and seamless usage 🚀</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container">
                    <table className='table table-bordered'>
                        <tbody>
                            <tr>
                                <th>Name</th>
                                <td>{data.name}</td>
                            </tr>
                            <tr>
                                <th>Username</th>
                                <td>{data.username}</td>
                            </tr>
                            <tr>
                                <th>Email</th>
                                <td>{data.email}</td>
                            </tr>
                            <tr>
                                <th>Phone</th>
                                <td>{data.phone}</td>
                            </tr>
                            <tr>
                                <th>Role</th>
                                <td>{data.role}</td>
                            </tr>
                            <tr>
                                <th>Plan</th>
                                <td>{data.plan?data.plan?.name:"No Plan"}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <Pricing/>
            </section>
        </>
    )
}

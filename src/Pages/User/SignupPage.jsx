import React, { useState } from 'react'
import FormValidators from '../../Validations/FormValidator'
import { Link, useNavigate } from 'react-router-dom'

export default function SignupPage() {
    let [data, setData] = useState({
        name: "",
        username: "",
        email: "",
        phone: "",
        password: "",
        cpassword: ""
    })
    let [errorMessage, setErrorMessage] = useState({
        name: "Name Field is Mendatory",
        username: "User Name Field is Mendatory",
        email: "Email Address Field is Mendatory",
        phone: "Phone Number Field is Mendatory",
        password: "Password Field is Mendatory",
    })
    let [show, setShow] = useState(false)
    let navigate = useNavigate()

    function getInputData(e) {
        let { name, value } = e.target
        setData({ ...data, [name]: value })
        setErrorMessage({ ...errorMessage, [name]: FormValidators(e) })
    }

    async function postData(e) {
        e.preventDefault()
        let error = Object.values(errorMessage).find(x => x !== "")
        if (error)
            setShow(true)
        else if (data.password !== data.cpassword) {
            setShow(true)
            setErrorMessage({ ...errorMessage, password: 'Password And Confirm Password Does not Matched' })
        }
        else {
            let response = await fetch(`${import.meta.env.VITE_APP_BACKEND_SERVER}/user`, {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    "authorization": import.meta.env.VITE_APP_PUBLIC_TOKEN
                },
                body: JSON.stringify({
                    name: data.name,
                    username: data.username,
                    email: data.email,
                    phone: data.phone,
                    password: data.password,
                    status: true,
                    role:"User"
                })
            })
            response = await response.json()
            if (response.result === "Done")
                navigate("/login")
            else {
                setShow(true)
                setErrorMessage(({ ...errorMessage, ...response.reason }))
            }
        }
    }
    return (
        <>
            <section className="container p-5">
                <div className="card">
                    <div className="row">
                        <div className="col-sm-10 m-auto bg-light p-5 rounded my-5" style={{ marginTop: "100px !important" }}>
                            <h5 className="text-center mb-3">Create Your Free Account</h5>
                            <form onSubmit={postData}>
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label>Name*</label>
                                        <input type="text" name="name" onChange={getInputData} className={`form-control ${show && errorMessage.name ? 'border-danger' : 'myborder'}`} placeholder='Full Name' />
                                        {show && errorMessage.name ? <p className='text-danger'>{errorMessage.name}</p> : null}
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label>Phone*</label>
                                        <input type="text" name="phone" onChange={getInputData} className={`form-control ${show && errorMessage.phone ? 'border-danger' : 'myborder'}`} placeholder='Phone Number' />
                                        {show && errorMessage.phone ? <p className='text-danger'>{errorMessage.phone}</p> : null}
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label>User Name*</label>
                                        <input type="text" name="username" onChange={getInputData} className={`form-control ${show && errorMessage.username ? 'border-danger' : 'myborder'}`} placeholder='User Name' />
                                        {show && errorMessage.username ? <p className='text-danger'>{errorMessage.username}</p> : null}
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label>Email*</label>
                                        <input type="email" name="email" onChange={getInputData} className={`form-control ${show && errorMessage.email ? 'border-danger' : 'myborder'}`} placeholder='Email Address' />
                                        {show && errorMessage.email ? <p className='text-danger'>{errorMessage.email}</p> : null}
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label>Password*</label>
                                        <input type="password" name="password" onChange={getInputData} className={`form-control ${show && errorMessage.password ? 'border-danger' : 'myborder'}`} placeholder='Enter Password' />
                                        {show && errorMessage.password ? <p className='text-danger'>{errorMessage.password}</p> : null}
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label>Confirm Password*</label>
                                        <input type="password" name="cpassword" onChange={getInputData} className={`form-control ${show && errorMessage.password ? 'border-danger' : 'myborder'}`} placeholder='Enter Password' />
                                    </div>
                                </div>
                                <div className="col-12 text-center">
                                    <button type='submit' className="btn btn-primary w-100">Create an Account</button>
                                </div>
                                <span className="shop-account d-block">Already have an account ?<Link to="/login">Log In</Link></span>
                            </form>
                        </div>
                    </div>
                </div>
            </section >
        </>
    )
}

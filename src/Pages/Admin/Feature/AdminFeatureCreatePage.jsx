import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import Sidebar from '../../../Components/Admin/Sidebar'

import FormValidator from '../../../Validations/FormValidator'

export default function AdminFeatureCreatePage() {
  let [data, setData] = useState({
    name: "",
    icon: "",
    shortDescription: "",
    active: true
  })
  let [errorMessage, setErrorMessage] = useState({
    name: 'Name Field is Mendatory',
    icon: 'Icon Field is Mendatory',
    shortDescription: 'Short Description Field is Mendatory',
  })
  let [show, setShow] = useState(false)

  let navigate = useNavigate()

  function getInputData(e) {
    let { name, value } = e.target
    setData({
      ...data, [name]: name === "status" ? (value === "1" ? true : false) : value
    })
    setErrorMessage({ ...errorMessage, [name]: FormValidator(e) })
  }

  async function postData(e) {
    e.preventDefault()
    let error = Object.values(errorMessage).find(x => x !== "")
    if (error)
      setShow(true)
    else {
      let response = await fetch(`${import.meta.env.VITE_APP_BACKEND_SERVER}/feature`, {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({ ...data })
      })
      response = await response.json()
      if (response.result === "Done")
        navigate("/admin/feature")
      else {
        setShow(true)
        setErrorMessage({ ...response.reason })
      }
    }
  }
  return (
    <>
      <section className="breadcrum">
        <div className="container-fluid my-3">
          <div className="row">
            <div className="col-md-3">
              <Sidebar />
            </div>
            <div className="col-md-9">
              <h5 className='text-center border-2 border p-2'>Create Features <Link style={{ marginTop: -10 }} to="/admin/feature" className='float-end'><i className='fs-3 text-dark bi bi-arrow-left'></i></Link></h5>
              <form onSubmit={postData}>

                <div className="row">

                  <div className="col-md-6 mb-3">
                    <label>Name*</label>
                    <input type="text" name="name" onChange={getInputData} className={`form-control ${show && errorMessage.name ? 'border-danger' : ''}`} placeholder='Feature Name' />
                    {show && errorMessage.name ? <p className='text-danger'>{errorMessage.name}</p> : null}
                  </div>

                  <div className="col-md-6 mb-3">
                    <label>Icon*</label>
                    <input type="text" name="icon" onChange={getInputData} className={`form-control ${show && errorMessage.shortDescription ? 'border-danger' : ''}`} placeholder="Feature Icon like <i class='bi bi-list></i>'" />
                    {show && errorMessage.icon ? <p className='text-danger'>{errorMessage.icon}</p> : null}
                  </div>

                  <div className="col-12 mb-3">
                    <label>Short Description*</label>
                    <textarea name="shortDescription" onChange={getInputData} className={`form-control ${show && errorMessage.name ? 'border-danger' : ''}`} placeholder='Feature Name' />
                    {show && errorMessage.shortDescription ? <p className='text-danger'>{errorMessage.shortDescription}</p> : null}
                  </div>

                  <div className="col-md-6 mb-3">
                    <label>Status*</label>
                    <select name="status" className='form-select'>
                      <option value="1">Active</option>
                      <option value="0">Inactive</option>
                    </select>
                  </div>

                  <button type="submit" className='btn btn-primary btn-sm'>Create</button>

                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

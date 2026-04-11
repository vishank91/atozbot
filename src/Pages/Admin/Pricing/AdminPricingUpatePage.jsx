import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import Sidebar from '../../../Components/Admin/Sidebar'
import FormValidator from '../../../Validations/FormValidator'

var rte
export default function AdminPricingUpdatePage() {
  var refdiv = useRef(null)
  let { _id } = useParams()
  let [data, setData] = useState({
    name: "",
    basePrice: "",
    discount: "",
    finalPrice: "",
    shortDescription: "",
    active: true
  })
  let [errorMessage, setErrorMessage] = useState({
    name: '',
    basePrice: '',
    discount: '',
    shortDescription: '',
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
      let bp = parseInt(data.basePrice)
      let d = parseInt(data.discount)
      let fp = parseInt(bp - bp * d / 100)

      let response = await fetch(`${import.meta.env.VITE_APP_BACKEND_SERVER}/pricing/${_id}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({
          ...data,
          basePrice: bp,
          discount: d,
          finalPrice: fp,
          description: rte.getHTMLCode()
        })
      })
      response = await response.json()
      if (response.result === "Done")
        navigate("/admin/pricing")
      else {
        setShow(true)
        setErrorMessage({ ...response.reason })
      }
    }
  }

  useEffect(() => {
    (async () => {
      try {
        let response = await fetch(`${import.meta.env.VITE_APP_BACKEND_SERVER}/pricing/${_id}`, {
          method: "GET",
          headers: {
            "content-type": "application/json"
          }
        })
        response = await response.json()
        if (response.result === "Done") {
          setData({ ...response.data })
          rte = new window.RichTextEditor(refdiv.current);
          rte.setHTMLCode(response.data.description);
        }
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
      <section className="breadcrum">
        <div className="container-fluid my-3">
          <div className="row">
            <div className="col-md-3">
              <Sidebar />
            </div>
            <div className="col-md-9">
              <h5 className='text-center border-2 border p-2'>Update Pricing <Link style={{ marginTop: -10 }} to="/admin/pricing" className='float-end'><i className='fs-3 text-dark bi bi-arrow-left'></i></Link></h5>
              <form onSubmit={postData}>

                <div className="row">

                  <div className="col-12 mb-3">
                    <label>Name*</label>
                    <input type="text" name="name" value={data.name} onChange={getInputData} className={`form-control ${show && errorMessage.name ? 'border-danger' : ''}`} placeholder='Pricing Plan Name' />
                    {show && errorMessage.name ? <p className='text-danger'>{errorMessage.name}</p> : null}
                  </div>

                  <div className="col-12 mb-3">
                    <label>Short Description*</label>
                    <textarea name="shortDescription" value={data.shortDescription} onChange={getInputData} className={`form-control ${show && errorMessage.shortDescription ? 'border-danger' : ''}`} placeholder='Pricing Plan Name' />
                    {show && errorMessage.shortDescription ? <p className='text-danger'>{errorMessage.shortDescription}</p> : null}
                  </div>

                  <div className="col-md-6 mb-3">
                    <label>Base Price*</label>
                    <input type="text" name="basePrice" value={data.basePrice} onChange={getInputData} className={`form-control ${show && errorMessage.basePrice ? 'border-danger' : ''}`} placeholder="Pricing Plan Base Price" />
                    {show && errorMessage.basePrice ? <p className='text-danger'>{errorMessage.basePrice}</p> : null}
                  </div>

                  <div className="col-md-6 mb-3">
                    <label>Discount*</label>
                    <input type="text" name="discount" value={data.discount} onChange={getInputData} className={`form-control ${show && errorMessage.discount ? 'border-danger' : ''}`} placeholder="Pricing Plan Discount" />
                    {show && errorMessage.discount ? <p className='text-danger'>{errorMessage.discount}</p> : null}
                  </div>

                  <div className="col-md-12 mb-3">
                    <label>Description*</label>
                    <div ref={refdiv}></div>
                  </div>


                  <div className="col-md-6 mb-3">
                    <label>Status*</label>
                    <select name="status" value={data.status ? "1" : "0"} className='form-select'>
                      <option value="1">Active</option>
                      <option value="0">Inactive</option>
                    </select>
                  </div>

                  <button type="submit" className='btn btn-primary btn-sm'>Update</button>

                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

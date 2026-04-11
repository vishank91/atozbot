import React, { useEffect, useState } from 'react'

import Sidebar from '../../../Components/Admin/Sidebar'

export default function AdminSettingPage() {
  let [data, setData] = useState({
    siteName: '',
    map1: '',
    map2: '',
    address: '',
    email: '',
    phone: '',
    whatsapp: '',
    facebook: '',
    twitter: '',
    instagram: '',
    linkedin: '',
    youtube: '',
  })

  function getInputData(e) {
    let { name, value } = e.target
    setData({ ...data, [name]: value })
  }


  async function postData(e) {
    e.preventDefault()
    try {
      let response = await fetch(`${import.meta.env.VITE_APP_BACKEND_SERVER}/setting`, {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({ ...data })
      })
      response = await response.json()
      if (response.result === "Done")
        alert("Record Has Bee Updated")
      else {
        alert(response.reason)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    (async () => {
      try {
        let response = await fetch(`${import.meta.env.VITE_APP_BACKEND_SERVER}/setting`, {
          method: "GET",
          headers: {
            "content-type": "application/json"
          }
        })
        response = await response.json()
        if (response.result === "Done")
          setData({ ...data, ...response.data[0] })
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
              <h5 className='text-center border-2 border p-2'>Setting</h5>
              <form onSubmit={postData}>
                <div className="row">
                  <div className="col-lg-6 mb-3">
                    <label>SiteName</label>
                    <input type="text" name="siteName" value={data.siteName}  onChange={getInputData} placeholder='Site Name' className='form-control' />
                  </div>
                  <div className="col-lg-6 mb-3">
                    <label>Email</label>
                    <input type="text" name="email"  value={data.email}  onChange={getInputData} placeholder='Email Address' className='form-control' />
                  </div>
                  <div className="col-lg-6 mb-3">
                    <label>Phone Number</label>
                    <input type="text" name="phone"  value={data.phone}  onChange={getInputData} placeholder='Phone Number' className='form-control' />
                  </div>
                  <div className="col-lg-6 mb-3">
                    <label>Whatsapp Number</label>
                    <input type="text" name="whatsapp"  value={data.whatsapp}  onChange={getInputData} placeholder='Whatsapp Number' className='form-control' />
                  </div>
                  <div className="col-12 mb-3">
                    <label>Address</label>
                    <textarea type="text" name="addeess"  value={data.addeess}  onChange={getInputData} placeholder='Official Address' className='form-control' ></textarea>
                  </div>
                  <div className="col-12 mb-3">
                    <label>Map1</label>
                    <input type="url" name="map1"  value={data.map1}  onChange={getInputData} placeholder='Map1' className='form-control' />
                  </div>
                  <div className="col-12 mb-3">
                    <label>Map2</label>
                    <input type="url" name="map2"  value={data.map2}  onChange={getInputData} placeholder='Map2' className='form-control' />
                  </div>
                  <div className="col-12 mb-3">
                    <label>Facebook Profile Page Url</label>
                    <input type="url" name="facebook"  value={data.facebook}  onChange={getInputData} placeholder='facebook' className='form-control' />
                  </div>
                  <div className="col-12 mb-3">
                    <label>Twitter Profile Page Url</label>
                    <input type="url" name="twitter"  value={data.twitter}  onChange={getInputData} placeholder='twitter' className='form-control' />
                  </div>
                  <div className="col-12 mb-3">
                    <label>Linkedin Profile Page Url</label>
                    <input type="url" name="linkedin"  value={data.linkedin}  onChange={getInputData} placeholder='linkedin' className='form-control' />
                  </div>
                  <div className="col-12 mb-3">
                    <label>Instagram Profile Page Url</label>
                    <input type="url" name="instagram"  value={data.instagram}  onChange={getInputData} placeholder='instagra,' className='form-control' />
                  </div>
                  <div className="col-12 mb-3">
                    <label>Youtube Profile Page Url</label>
                    <input type="url" name="youtube"  value={data.youtube}  onChange={getInputData} placeholder='youtube' className='form-control' />
                  </div>

                  <div className="mb-3">
                    <button type="submit" className='btn btn-primary w-100'>Submit</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

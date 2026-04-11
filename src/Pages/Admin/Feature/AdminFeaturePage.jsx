import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import Sidebar from '../../../Components/Admin/Sidebar'

export default function AdminFeaturePage() {
  let [data, setData] = useState([])

  async function deleteRecord(_id) {
    if (window.confirm("Are You Sure to Delete That Record : ")) {
      try {
        let response = await fetch(`${import.meta.env.VITE_APP_BACKEND_SERVER}/feature/${_id}`, {
          method: "DELETE",
          headers: {
            "content-type": "application/json"
          }
        })
        response = await response.json()
        if (response.result === "Done") {
          setData(data.filter(x => x._id != _id))
        }
        else {
          alert(response.reason)
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  useEffect(() => {
    (async () => {
      try {
        let response = await fetch(`${import.meta.env.VITE_APP_BACKEND_SERVER}/feature`, {
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
      <section className="breadcrum">
        <div className="container-fluid my-3">
          <div className="row">
            <div className="col-md-3">
              <Sidebar />
            </div>
            <div className="col-md-9">
              <h5 className='text-center border-2 border p-2'>Features <Link style={{ marginTop: -10 }} to="/admin/feature/create" className='float-end'><i className='fs-3 text-dark bi bi-plus'></i></Link></h5>
              <div className="table-responsive">
                <table className='table table-bordered'>
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>Name</th>
                      <th>Icon</th>
                      <th>ShortDescription</th>
                      <th>Status</th>
                      <th></th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map(item => {
                      return <tr key={item._id}>
                        <td>{item._id}</td>
                        <td>{item.name}</td>
                        <td><span className='fs-1' dangerouslySetInnerHTML={{ __html: item.icon }} /></td>
                        <td>{item.shortDescription}</td>
                        <td>{item.status ? 'Active' : 'Inactive'}</td>
                        <td><Link to={`/admin/feature/update/${item._id}`} className='btn-sm btn btn-primary'><i className='fs-5 bi bi-pencil'></i></Link></td>
                        <td><button className='btn-sm btn btn-danger' onClick={() => deleteRecord(item._id)}><i className='fs-5 bi bi-x'></i></button></td>
                      </tr>
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

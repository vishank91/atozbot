import React from 'react'
import Sidebar from '../../Components/Admin/Sidebar'

export default function AdminHomePage() {
  return (
    <>
      <section className="breadcrum">
        <div className="container-fluid my-3">
          <div className="row">
            <div className="col-md-3">
              <Sidebar />
            </div>
            <div className="col-md-9">
              <h5 className='text-center p-2'>Admin Home</h5>
              <table className='table table-bordered'>
                <tbody>
                  <tr>
                    <th>Id</th>
                    <td>111</td>
                  </tr>
                  <tr>
                    <th>Name</th>
                    <td>Nitin Chauhan</td>
                  </tr>
                  <tr>
                    <th>Username</th>
                    <td>nitin</td>
                  </tr>
                  <tr>
                    <th>Email</th>
                    <td>vishankchauhan@gmail.com</td>
                  </tr>
                  <tr>
                    <th>Phone</th>
                    <td>9873848046</td>
                  </tr>
                  <tr>
                    <th>Role</th>
                    <td>Super Admin</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

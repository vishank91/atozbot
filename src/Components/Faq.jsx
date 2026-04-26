import React, { useEffect, useState } from 'react'

export default function Faq() {
  let [data, setData] = useState([])
  useEffect(() => {
    (async () => {
      let response = await fetch(`${import.meta.env.VITE_APP_BACKEND_SERVER}/faq`, {
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
    <section id="services" className="services-area services-eight">
      <div className="section-title-five">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="content">
                <h6>Faq</h6>
                <h2 className="fw-bold">Frequently Asked Questions</h2>
                <p>Find quick answers to common questions about AtoZBot features, usage, pricing, and AI capabilities in one place 🚀</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="accordion" id="accordionExample">
          {data.map((item, index) => {
            return <div className="accordion-item" key={item._id}>
              <h2 className="accordion-header">
                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${item._id}`} aria-expanded="true" aria-controls="collapseOne">
                  {item.question}
                </button>
              </h2>
              <div id={`collapse${item._id}`} className={`accordion-collapse collapse`} data-bs-parent="#accordionExample">
                <div className="accordion-body">
                  {item.answer}
                </div>
              </div>
            </div>
          })}
        </div>
      </div>
    </section>
  )
}

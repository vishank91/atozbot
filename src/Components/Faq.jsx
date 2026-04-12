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
        <div class="accordion" id="accordionExample">
          {data.map((item, index) => {
            return <div class="accordion-item" key={item._id}>
              <h2 class="accordion-header">
                <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${item._id}`} aria-expanded="true" aria-controls="collapseOne">
                  {item.question}
                </button>
              </h2>
              <div id={`collapse${item._id}`} class={`accordion-collapse collapse`} data-bs-parent="#accordionExample">
                <div class="accordion-body">
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

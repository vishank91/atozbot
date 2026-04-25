import React, { useEffect, useState } from "react";
import { useRazorpay } from "react-razorpay";
import { useParams, useNavigate } from "react-router-dom";

export default function Payment() {
    var [plan, setPlan] = useState({})
    var [user, setUser] = useState({})

    const { Razorpay } = useRazorpay();
    var navigate = useNavigate()
    var { _id } = useParams()

    useEffect(() => {
        (async () => {
            let response = await fetch(`${import.meta.env.VITE_APP_BACKEND_SERVER}/pricing/${_id}`, {
                method: 'GET',
                headers: {
                    'content-type': 'application/json'
                }
            })
            response = await response.json()
            setPlan(response.data)

            response = await fetch(`${import.meta.env.VITE_APP_BACKEND_SERVER}/user/${localStorage.getItem("userid")}`, {
                method: 'GET',
                headers: {
                    'content-type': 'application/json'
                }
            })
            response = await response.json()
            setUser(response.data)
        })()
    }, [])

    const initPayment = (data) => {
        const options = {
            key: import.meta.env.VITE_APP_RPKEYID,
            amount: data.amount,
            currency: "INR",
            order_id: data._id,
            "prefill": {
                "name": user?.name,
                "email": user?.email,
                "contact": user?.phone,
            },
            handler: async (response) => {
                try {
                    var item = {
                        razorpay_payment_id: response.razorpay_payment_id,
                        planId: plan._id,
                        userId: user._id
                    }
                    response = await fetch(`${import.meta.env.VITE_APP_BACKEND_SERVER}/user/verify`, {
                        method: "post",
                        headers: {
                            "content-type": "application/json",
                            "authorization": localStorage.getItem("token")
                        },
                        body: JSON.stringify(item)
                    });
                    response = await response.json()
                    if (response.result === "Done") {
                        navigate("/order-confirmation")
                    }
                } catch (error) {
                    console.log(error);
                }
            },
            theme: {
                color: "#0c0fbd",
            },
        };
        const rzp1 = new Razorpay(options);
        rzp1.open();
    };

    const handlePayment = async () => {
        try {
            var response = await fetch(`${import.meta.env.VITE_APP_BACKEND_SERVER}/user/order`, {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                    // authorization: localStorage.getItem("token")
                },
                body: JSON.stringify({ amount: plan.finalPrice })
            });
            response = await response.json()
            initPayment(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <section id="services" className="services-area services-eight">
                <div className="section-title-five">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <div className="content">
                                    <h6>Profile</h6>
                                    <h2 className="fw-bold">Pay Via Razorpay</h2>
                                    <p>Complete your secure payment using Razorpay to activate your AtoZBot plan instantly. Fast, reliable, and encrypted transactions with multiple payment options for a smooth checkout experience 💳🚀</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container my-5">
                    <div className="card p-5">
                        <h4 className="text-center p-2">Pay With Razorpay</h4>
                        {
                            <button onClick={handlePayment} className="btn btn-primary w-50 m-auto">
                                Pay(&#8377;{plan.finalPrice}) With Razorpay
                            </button>
                        }
                    </div>
                </div>
            </section>
        </>
    );
}

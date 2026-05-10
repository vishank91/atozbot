import React, { useState } from 'react'
import ReactMarkdown from 'react-markdown'

export default function TextToText() {
    let [input, setInput] = useState("")
    let [chat, setChat] = useState({
        user: "",
        _id: "",
        chats: []
    })

    async function postData(e) {
        e.preventDefault()
        let response = await fetch(`${import.meta.env.VITE_APP_BACKEND_SERVER}/text`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                userid: localStorage.getItem("userid"),
                input: input,
                _id: chat._id ?? ""
            })
        })
        response = await response.json()
        let data = {
            user: localStorage.getItem("userid"),
            _id: response.chat?._id,
            chats: response.chat?.chats
        }
        setChat({ ...data })
        setInput("")
    }
    return (
        <>
            <div className="container-fluid chat-section">

                <div className="row h-100">
                    <div className="d-none d-lg-block col-lg-3">
                        <button className='btn btn-primary w-100 mb-3'><i className='bi bi-pencil-square'></i> <span>New Chat</span></button>

                        <div className="btn-group w-100 mb-3">
                            <input type="search" name="search" className='form-control border-primary' placeholder='Search...' />
                            <button className='btn btn-primary'>Search</button>
                        </div>

                        <div className='card p-2'>
                            <p>Recent Chats</p>
                            <div className="chat-history">
                                <button>Chat History1</button>
                                <button>Chat History1</button>
                                <button>Chat History1</button>
                                <button>Chat History1</button>
                                <button>Chat History1</button>
                                <button>Chat History1</button>
                                <button>Chat History1</button>
                                <button>Chat History1</button>
                                <button>Chat History1</button>
                                <button>Chat History1</button>
                                <button>Chat History1</button>
                                <button>Chat History1</button>
                                <button>Chat History1</button>
                                <button>Chat History1</button>
                                <button>Chat History1</button>
                                <button>Chat History1</button>
                                <button>Chat History1</button>
                                <button>Chat History1</button>
                                <button>Chat History1</button>
                                <button>Chat History1</button>
                                <button>Chat History1</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-9 border border-3">
                        <div className="first">
                            {chat.chats?.map((item, index) => {
                                return <div key={index} className={`alert alert-primary ${item.type === "Request" ? 'right' : 'left'}`}>
                                    <ReactMarkdown>
                                        {item.data}
                                    </ReactMarkdown>
                                </div>
                            })}
                        </div>
                        <div className="second">
                            <div className="row">
                                <div className="col-xl-8 m-auto">
                                    <form onSubmit={postData}>
                                        <div className="btn-group w-100">
                                            <input type="text" name="message" onChange={(e) => setInput(e.target.value)} value={input} placeholder='Ask Anything' className='form-control border-primary' />
                                            <button className='btn btn-primary'><i className='bi bi-chat-dots fs-5'></i></button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

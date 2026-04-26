import React, { useState } from 'react'

export default function TextToText() {
    let [input, setInput] = useState("")
    let [chat, setChat] = useState([])

    function postData(e) {
        e.preventDefault()
        chat.push({ type: "Send", message: input })
        chat.push({ type: "Receive", message: "                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum distinctio, cupiditate nisi maiores ipsa eum fugiat delectus consequuntur saepe illum praesentium corporis nemo esse minima assumenda libero id sit vitae magni hic ad, repellat exercitationem? Delectus quaerat vel quas esse, neque, harum ipsum explicabo iure reiciendis nulla mollitia officia facere dolorem vitae! Veniam, culpa incidunt iste ea voluptates nulla pariatur cum aliquam voluptate architecto minima delectus corrupti blanditiis ipsam exercitationem in dolor tempore asperiores nesciunt assumenda harum alias? Aliquid tempore molestias aperiam exercitationem ut laboriosam neque magnam, corrupti aliquam doloribus debitis sint facilis architecto fuga. Quibusdam in ullam quod reprehenderit?" })
        setChat(chat)
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
                           {chat.map((item,index)=>{
                            return  <div className={`alert alert-primary ${item.type==="Send"?'right':'left'}`}>{item.message}</div>
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

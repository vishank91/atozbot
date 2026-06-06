import React, { useEffect, useState } from 'react';
import MarkdownRenderer from './MarkdownRenderer';

export default function TextToText() {
    const [show, setShow] = useState(false);
    const [data, setData] = useState([]);
    const [input, setInput] = useState('');
    const [chat, setChat] = useState({
        user: '',
        _id: '',
        chats: []
    });
    async function deleteRecord(_id) {
        try {
            let response = await fetch(
                `${import.meta.env.VITE_APP_BACKEND_SERVER}/text/${_id}`,
                {
                    method: 'DELETE',
                    headers: {
                        'content-type': 'application/json'
                    }
                }
            );

            await response.json();

            setData(prev => prev.filter(item => item._id !== _id));

            if (chat._id === _id) {
                newChat();
            }
        } catch (error) {
            console.error(error);
        }
    }

    function newChat() {
        setChat({
            user: '',
            _id: '',
            chats: []
        });
    }

    async function postData(e) {
        e.preventDefault();

        if (!input.trim()) return;

        const msg = input;

        setInput("");
        setShow(true);

        setChat(prev => ({
            ...prev,
            chats: [
                ...prev.chats,
                {
                    type: "Request",
                    data: msg
                },
                {
                    type: "Response",
                    data: ""
                }
            ]
        }));

        try {
            const response = await fetch(
                `${import.meta.env.VITE_APP_BACKEND_SERVER}/text`,
                {
                    method: "POST",
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify({
                        userid: localStorage.getItem("userid"),
                        input: msg,
                        _id: chat._id || ""
                    })
                }
            );

            const reader = response.body.getReader();
            const decoder = new TextDecoder();

            let aiResponse = "";
            let metadataProcessed = false;

            while (true) {
                const { done, value } = await reader.read();

                if (done) break;

                let chunk = decoder.decode(value, {
                    stream: true
                });

                if (!metadataProcessed) {
                    const splitIndex = chunk.indexOf("\n\n");

                    if (splitIndex !== -1) {
                        const metaText = chunk.slice(0, splitIndex);
                        const remainingText = chunk.slice(splitIndex + 2);

                        const meta = JSON.parse(metaText);

                        setChat(prev => ({
                            ...prev,
                            _id: meta._id
                        }));

                        if (meta.isNewChat) {
                            setData(prev => [
                                {
                                    _id: meta._id,
                                    title: meta.title,
                                    chats: []
                                },
                                ...prev
                            ]);
                        }

                        metadataProcessed = true;
                        aiResponse += remainingText;
                    }
                }
                else {
                    aiResponse += chunk;
                }

                setChat(prev => {
                    const chats = [...prev.chats];

                    chats[chats.length - 1] = {
                        type: "Response",
                        data: aiResponse
                    };

                    return {
                        ...prev,
                        chats
                    };
                });
            }
        }
        catch (error) {
            console.log(error);
        }
        finally {
            setShow(false);
        }
    }

    useEffect(() => {
        (async () => {
            try {
                const response = await fetch(
                    `${import.meta.env.VITE_APP_BACKEND_SERVER}/text/user/${localStorage.getItem("userid")}`,
                    {
                        method: "GET",
                        headers: {
                            "content-type": "application/json"
                        }
                    }
                );

                const result = await response.json();

                setData(result.data || []);
            }
            catch (error) {
                console.log(error);
            }
        })()
    }, [])

    return (
        <div className="container-fluid chat-section">
            <div className="row h-100">
                <div className="d-none d-lg-block col-lg-3">
                    <button
                        className="btn btn-primary w-100 mb-3"
                        onClick={newChat}
                    >
                        <i className="bi bi-pencil-square"></i>
                        <span> New Chat</span>
                    </button>

                    <div className="btn-group w-100 mb-3">
                        <input
                            type="search"
                            className="form-control border-primary"
                            placeholder="Search..."
                            list="dataList"
                            onChange={(e) => {
                                const item = data.find(
                                    x => x.title === e.target.value
                                );

                                if (item) {
                                    setChat({
                                        user: item.user || '',
                                        _id: item._id,
                                        chats: item.chats || []
                                    });
                                }
                            }}
                        />

                        <datalist id="dataList">
                            {data.map((item) => (
                                <option
                                    key={item._id}
                                    value={item.title}
                                />
                            ))}
                        </datalist>
                    </div>

                    <div className="card p-2">
                        <p>Recent Chats</p>

                        <div className="chat-history">
                            {data.map((item) => (
                                <button
                                    key={item._id}
                                    className="p-2 w-100 text-start border-0 bg-white"
                                    onClick={() =>
                                        setChat({
                                            user: item.user || '',
                                            _id: item._id,
                                            chats: item.chats || []
                                        })
                                    }
                                >
                                    {item.title}

                                    <span
                                        className="bi bi-x fs-4 float-end"
                                        style={{ cursor: 'pointer' }}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            deleteRecord(item._id);
                                        }}
                                    ></span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="col-lg-9 border border-3">
                    <div className="first">
                        {chat.chats?.map((item, index) => (
                            <div
                                key={index}
                                className={`chat-message ${item.type === 'Request'
                                    ? 'user-message'
                                    : 'bot-message'
                                    }`}
                            >
                                <MarkdownRenderer content={item.data} />
                            </div>
                        ))}

                        {/* <div ref={bottomRef}></div> */}
                    </div>

                    <div className="second">
                        <div className="row w-100">
                            <div className="col-xl-8 m-auto">
                                {show ? (
                                    <div className="typing-container">
                                        <div className="typing-dot"></div>
                                        <div className="typing-dot"></div>
                                        <div className="typing-dot"></div>
                                    </div>
                                ) : (
                                    <form onSubmit={postData}>
                                        <div className="btn-group w-100">
                                            <input
                                                type="text"
                                                name="message"
                                                value={input}
                                                onChange={(e) =>
                                                    setInput(e.target.value)
                                                }
                                                placeholder="Ask Anything"
                                                className="form-control border-primary"
                                            />

                                            <button
                                                type="submit"
                                                className="btn btn-primary"
                                            >
                                                <i className="bi bi-chat-dots fs-5"></i>
                                            </button>
                                        </div>
                                    </form>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom"

export default function TextToImage() {
    let [inputData, setInputData] = useState({
        prompt: "",
        ratio: "1:1"
    })
    let [data, setData] = useState([])

    async function handleDownload(index) {
        const imageUrl = data[index].image;

        try {
            const downloadUrl =
                `${import.meta.env.VITE_APP_BACKEND_SERVER}/image/download?url=${encodeURIComponent(imageUrl)}`;

            const response = await fetch(downloadUrl);

            if (!response.ok) {
                throw new Error("Failed to download image");
            }

            const blob = await response.blob();

            const url = URL.createObjectURL(blob);

            const link = document.createElement("a");
            link.href = url;
            link.download = `generated_image_${index + 1}.png`;

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            URL.revokeObjectURL(url);

        } catch (error) {
            console.error("Download failed:", error);
            alert("Could not download image!");
        }
    }

    async function deleteRecord(_id) {
        if (confirm("Are You Sure You Want to Delete That Record : ")) {
            try {
                let response = await fetch(
                    `${import.meta.env.VITE_APP_BACKEND_SERVER}/image/${_id}`,
                    {
                        method: 'DELETE',
                        headers: {
                            'content-type': 'application/json'
                        }
                    }
                );

                await response.json();

                setData(prev => prev.filter(item => item._id !== _id));
            } catch (error) {
                console.error(error);
            }
        }
    }

    async function postData(e) {
        e.preventDefault();
        let response = await fetch(
            `${import.meta.env.VITE_APP_BACKEND_SERVER}/image`,
            {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({ ...inputData, user: localStorage.getItem("userid") })
            },
        );
        response = await response.json();
        if (response.status === "Done") {
            setData({ ...data, ...response.data })
        }
        else {
            console.log(response)
        }
    }

    useEffect(() => {
        (async () => {
            try {
                const response = await fetch(
                    `${import.meta.env.VITE_APP_BACKEND_SERVER}/image/user/${localStorage.getItem("userid")}`,
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
        <div className="container chat-section">
            <form onSubmit={postData}>
                <div className="row my-2">
                    <div className="col-10">
                        <label>Prompt</label>
                        <textarea name="prompt" onChange={e => setInputData({ ...inputData, prompt: e.target.value })} rows={5} placeholder='Enter Your Prompt to Create an Image' className='form-control border-primary'></textarea>
                    </div>
                    <div className="col-2">
                        <div className="mb-3">
                            <label>Ratio</label>
                            <select name="ratio" onChange={e => setInputData({ ...inputData, ratio: e.target.value })} className='form-select border-primary'>
                                <option>1:1</option>
                                <option>16:9</option>
                                <option>9:16</option>
                                <option>3:2</option>
                                <option>2:3</option>
                            </select>
                        </div>
                        <button className='btn btn-primary w-100'>Submit</button>
                    </div>
                </div>
            </form>

            <div className="row my-5">
                {data.map((item, index) => {
                    return <div key={index} className="col-xl-2 col-lg-3 col-md-4 col-sm-6">
                        <div className="card border-primary border-5 p-3">
                            <Link to={item.image} target="_blank">
                                <img src={item.image} className='w-100 h-100' alt='AI Generated Image' />
                            </Link>
                            <div className="btn-group">
                                <button className='btn btn-primary' onClick={() => handleDownload(index)}><i className='bi bi-download'></i></button>
                                <button className='btn btn-danger' onClick={() => deleteRecord(item._id)}><i className='bi bi-trash'></i></button>
                            </div>
                        </div>
                    </div>
                })}
            </div>
        </div>
    );
}
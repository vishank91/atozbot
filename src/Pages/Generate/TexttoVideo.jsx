import React, { useEffect, useState } from "react";

export default function TextToVideo() {
    const BACKEND_URL = import.meta.env.VITE_APP_BACKEND_SERVER;
    const PUBLIC_SERVER_URL = import.meta.env.VITE_APP_BACKEND_PUBLIC_SERVER;
    const [inputData, setInputData] = useState({
        prompt: "",
        ratio: "16:9",
        duration: 6,
        resolution: "480p"
    });
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");


    function getVideoUrl(video) {
        if (!video) {
            return "";
        }
        if (video.startsWith("http://") || video.startsWith("https://")) {
            return video;
        }
        return `${PUBLIC_SERVER_URL}${video}`;
    }

    async function postData(e) {

        e.preventDefault();
        if (!inputData.prompt.trim()) {
            alert("Please enter a prompt");
            return;
        }
        try {
            setLoading(true);
            setMessage("Starting video generation...");

            let response = await fetch(`${BACKEND_URL}/video`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    prompt: inputData.prompt,
                    ratio: inputData.ratio,
                    duration: Number(inputData.duration),
                    resolution: inputData.resolution,
                    user: localStorage.getItem("userid")
                })
            })

            response = await response.json();
            if (response.result !== "Done") {
                throw new Error(response.message || "Video generation failed");
            }

            // MongoDB ID
            const videoId = response.data._id;

            // Add pending record to UI
            setData(prev => [
                response.data,
                ...prev
            ]);

            setInputData({
                prompt: "",
                ratio: "16:9",
                duration: 6,
                resolution: "480p"
            });

            setMessage(
                "Video generation started..."
            );

            // Start polling
            pollVideoStatus(videoId);
        }
        catch (error) {
            console.error(error);
            setMessage("");
            alert(
                error.message ||
                "Something went wrong"
            );
        }
        finally {
            setLoading(false);
        }
    }


    // -----------------------------------------
    // Poll Video Status
    // -----------------------------------------

    async function pollVideoStatus(videoId) {
        let attempts = 0;
        const maxAttempts = 120;
        const interval = setInterval(async () => {
            try {
                attempts++;
                let response = await fetch(`${BACKEND_URL}/video/status/${videoId}`);
                response = await response.json();
                if (response.result !== "Done") {
                    clearInterval(interval);
                    console.error(response);
                    setMessage("Unable to check video status");
                    return;
                }

                const videoData = response.data;
                setData(prev =>
                    prev.map(item =>
                        item._id === videoId ? videoData : item
                    )
                );

                if (videoData.status === "done") {
                    clearInterval(interval);
                    setMessage("Video generated successfully!");
                }

                if (videoData.status === "failed" || videoData.status === "expired") {
                    clearInterval(interval);
                    setMessage("Video generation failed.");
                }
                if (attempts >= maxAttempts) {
                    clearInterval(interval);
                    setMessage("Video generation is taking too long.");
                }
            }
            catch (error) {
                console.error(error);
                clearInterval(interval);
                setMessage("Error checking video status.");
            }
        }, 5000);
    }

    async function deleteVideo(id) {
        if (!confirm("Are you sure you want to delete this video?")) {
            return
        }
        try {
            let response = await fetch(`${BACKEND_URL}/video/${id}`, {
                method: "DELETE"
            }
            );
            response = await response.json();

            if (response.result === "Done") {
                setData(prev => prev.filter(item => item._id !== id));
            }
        }
        catch (error) {
            console.error(error);
        }
    }


    // -----------------------------------------
    // Get Existing Videos
    // -----------------------------------------

    useEffect(() => {
        async function getVideos() {
            try {
                let response = await fetch(`${BACKEND_URL}/video/user/${localStorage.getItem("userid")}`);
                response = await response.json();
                console.log(response)
                if (response.result === "Done") {
                    setData(response.data || []);
                }
            }
            catch (error) {
                console.error(error);
            }
        }
        getVideos();
    }, []);


    return (
        <>
            <div style={{ height: 100 }}></div>
            <div className="container">

                {/* ============================= */}
                {/* Generate Video Form */}
                {/* ============================= */}

                <form
                    onSubmit={postData}
                    className="mb-5"
                >

                    <div className="row">

                        <div className="col-md-8">

                            <label className="form-label">
                                Prompt
                            </label>

                            <textarea
                                className="form-control"
                                rows="5"
                                placeholder="Enter your video prompt..."
                                value={inputData.prompt}
                                onChange={e =>
                                    setInputData({
                                        ...inputData,
                                        prompt: e.target.value
                                    })
                                }
                            />

                        </div>


                        <div className="col-md-4">

                            {/* Ratio */}

                            <div className="mb-3">

                                <label className="form-label">
                                    Ratio
                                </label>

                                <select
                                    className="form-select"
                                    value={inputData.ratio}
                                    onChange={e =>
                                        setInputData({
                                            ...inputData,
                                            ratio: e.target.value
                                        })
                                    }
                                >

                                    <option value="16:9">
                                        16:9
                                    </option>

                                    <option value="9:16">
                                        9:16
                                    </option>

                                    <option value="1:1">
                                        1:1
                                    </option>

                                </select>

                            </div>


                            {/* Duration */}

                            <div className="mb-3">

                                <label className="form-label">
                                    Duration
                                </label>

                                <select
                                    className="form-select"
                                    value={inputData.duration}
                                    onChange={e =>
                                        setInputData({
                                            ...inputData,
                                            duration:
                                                e.target.value
                                        })
                                    }
                                >

                                    <option value="6">
                                        6 Seconds
                                    </option>

                                    <option value="10">
                                        10 Seconds
                                    </option>

                                </select>

                            </div>


                            {/* Resolution */}

                            <div className="mb-3">

                                <label className="form-label">
                                    Resolution
                                </label>

                                <select
                                    className="form-select"
                                    value={inputData.resolution}
                                    onChange={e =>
                                        setInputData({
                                            ...inputData,
                                            resolution:
                                                e.target.value
                                        })
                                    }
                                >

                                    <option value="480p">
                                        480p
                                    </option>

                                    <option value="720p">
                                        720p
                                    </option>

                                </select>

                            </div>


                            <button
                                type="submit"
                                className="btn btn-primary w-100"
                                disabled={loading}
                            >

                                {loading ? (
                                    <>
                                        <span
                                            className="spinner-border spinner-border-sm me-2"
                                        />

                                        Starting...
                                    </>
                                ) : (
                                    <>
                                        Generate Video
                                    </>
                                )}

                            </button>

                        </div>

                    </div>

                </form>


                {/* ============================= */}
                {/* Status */}
                {/* ============================= */}

                {message && (

                    <div className="alert alert-info">

                        {message}

                    </div>

                )}


                {/* ============================= */}
                {/* Videos */}
                {/* ============================= */}

                <div className="row">

                    {data.map((item) => {

                        const videoUrl =
                            getVideoUrl(item.video);


                        return (

                            <div
                                className="col-xl-4 col-lg-4 col-md-6 mb-4"
                                key={item._id}
                            >

                                <div className="card">

                                    {item.status === "done" &&
                                        item.video ? (

                                        <video
                                            src={videoUrl}
                                            controls
                                            className="w-100"
                                        />

                                    ) : (

                                        <div
                                            className="d-flex justify-content-center align-items-center"
                                            style={{
                                                height: "250px"
                                            }}
                                        >

                                            {item.status ===
                                                "pending" ? (

                                                <div className="text-center">

                                                    <div
                                                        className="spinner-border text-primary mb-3"
                                                    />

                                                    <p>
                                                        Generating video...
                                                    </p>

                                                </div>

                                            ) : (

                                                <p className="text-danger">

                                                    Generation{" "}
                                                    {item.status}

                                                </p>

                                            )}

                                        </div>

                                    )}


                                    <div className="card-body">

                                        <p>
                                            {item.prompt}
                                        </p>


                                        {item.status ===
                                            "done" && (

                                                <div className="btn-group w-100">

                                                    <a
                                                        href={
                                                            videoUrl
                                                        }
                                                        download
                                                        className="btn btn-primary"
                                                    >

                                                        <i className="bi bi-download me-1" />

                                                        Download

                                                    </a>


                                                    <button
                                                        className="btn btn-danger"
                                                        onClick={() =>
                                                            deleteVideo(
                                                                item._id
                                                            )
                                                        }
                                                    >

                                                        <i className="bi bi-trash" />

                                                    </button>

                                                </div>

                                            )}

                                    </div>

                                </div>

                            </div>

                        );

                    })}

                </div>

            </div>
        </>
    );
}
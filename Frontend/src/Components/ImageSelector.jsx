import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import PropTypes from 'prop-types';

const ImageSelector = ({onClose, onSelectImage}) => {
    const apiUrl = import.meta.env.VITE_API_URL;

    const [imageDetails, setImageDetails] = useState({
        file: null,
        filename: "",
        title: "",
    })
    const [images, setImages] = useState([])

    const handleSelectImage = (imageUrl) => {
        onSelectImage(imageUrl);
        onClose();
    };

    useEffect(() => {
        axios.get(`${apiUrl}/api/Images`)
            .then((result) => {
                if (result.status === 200) {
                    setImages(result.data);
                } else {
                    toast.success("Some Error occured", {
                        theme: "dark",
                        autoClose: 1000,
                    });
                }
            })
            .catch(err => console.log(err))
    }, [apiUrl])

    const handleImageSubmit = () => {
        if (imageDetails.file === null || imageDetails.filename === "" || imageDetails.title === "") {
            toast.error("Enter all Fields", {
                theme: "dark",
                autoClose: 1000,
            });
        } else {
            const formData = new FormData();
            formData.append("file", imageDetails.file);
            formData.append("filename", imageDetails.filename);
            formData.append("title", imageDetails.title);

            try {
                axios.post(`${apiUrl}/api/Images`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                })
                    .then((result) => {
                        if (result.status === 200) {
                            toast.success("New Image Uploaded Successfully", {
                                theme: "dark",
                                autoClose: 1000,
                            });
                            setImageDetails({
                                file: null,
                                filename: "",
                                title: "",
                            })
                        } else {
                            toast.error("Some Error occurred!!", {
                                theme: "dark",
                                autoClose: 1000,
                            });
                        }
                    })
            } catch (error) {
                console.log(error);
                toast.error("Some Error occurred!!", {
                    theme: "dark",
                    autoClose: 1000,
                });
            }
        }
    }
    return (
        <>
            <div className="card h-100" style={{ maxHeight: "80vh", overflowY: "auto" }}>
                <div className="card-header">
                    <h3 className="card-title">Choose Images</h3>
                </div>
                <ToastContainer />
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-8 col-sm-12">
                            <div className="scrollable-container p-4" style={{ maxHeight: "calc(100vh - 300px)", overflowY: "auto" }}>
                                <div className="d-flex flex-wrap">
                                    {images.map((image, index) => (
                                        <div key={index} className="col-lg-3 col-md-4 col-sm-6 mb-3" style={{ cursor: "pointer"}} onClick={() => handleSelectImage(image.url)}>
                                            <div className="bg-white d-flex flex-column border p-3">
                                                <img src={image.url} alt={image.fileName} className="img-fluid mb-2" />
                                                <span>{image.title}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 col-sm-12 mt-3 mt-md-0">
                            <form onSubmit={(e) => { e.preventDefault(); handleImageSubmit(); }}>
                                <div className="bg-light p-3">
                                    <h5>Upload Image</h5>
                                    <div className="mt-3">
                                        <input type="file" className="form-control shadow-none" onChange={(e) => setImageDetails({ ...imageDetails, file: e.target.files[0] })} />
                                    </div>
                                    <div className="mt-3">
                                        <input type="text" className="form-control shadow-none" placeholder="File name will be displayed here" value={imageDetails.filename} name="filename" onChange={(e) => setImageDetails({ ...imageDetails, filename: e.target.value })} />
                                    </div>
                                    <div className="mt-3">
                                        <input type="text" className="form-control shadow-none" placeholder="Title" name="title" value={imageDetails.title} onChange={(e) => setImageDetails({ ...imageDetails, title: e.target.value })} />
                                    </div>
                                    <div className="mt-3">
                                        <button type="submit" className="btn btn-dark">Upload</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

// Add propTypes validation
ImageSelector.propTypes = {
    onClose: PropTypes.func.isRequired, // Add onClose prop validation
    onSelectImage: PropTypes.func.isRequired,
};

export default ImageSelector;

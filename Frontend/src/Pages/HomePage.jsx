import { useEffect, useState } from "react";
import axios from 'axios'
import { Link } from 'react-router-dom'

const HomePage = () => {
    const apiUrl = import.meta.env.VITE_API_URL;

    const [blogs, setBlogs] = useState([])

    useEffect(() => {
        axios.get(`${apiUrl}/api/BlogPost`)
            .then((result) => {
                setBlogs(result.data)
            })
            .catch(err => console.log(err))
    }, [apiUrl])
    
    return (
        <>
            <div className='container'>
                <div className='my-5'>
                    <div className="row align-items-lg-stretch">
                        {
                            blogs.map((blog, index) => {
                                return (
                                    <div key={index} className="col-12 col-md-4 mb-3">
                                        <div className="card h-100">
                                            {/* Center the image */}
                                            <img className="card-img-top mx-auto p-2" src={blog.featuredImageUrl} alt="" style={{ width: "80px", height: "80px" }} />
                                            <div className="card-body text-center d-flex flex-column">
                                                <h3 className="card-title">{blog.title}</h3>
                                                <p className="card-text">{blog.description}</p>
                                                <span className="d-flex align-items-end" style={{ flex: "1" }}>
                                                    <Link className="btn btn-dark" to={`/blog-details/${blog.urlHandle}`}>Read More</Link>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }

                    </div>
                </div>
            </div>
        </>
    );
}

export default HomePage;

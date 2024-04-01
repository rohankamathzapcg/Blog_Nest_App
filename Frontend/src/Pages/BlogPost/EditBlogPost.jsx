import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom'

const EditBlogPost = () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);
    const [blogPost, setBlogPost] = useState([])

    useEffect(() => {
        axios.get(`${apiUrl}/api/BlogPost`)
            .then((result) => {
                setBlogPost(result.data)
            })
            .catch((err) => console.log(err))

        const handleResize = () => {
            setIsSmallScreen(window.innerWidth < 768);
        }
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, [apiUrl])

    return (
        <>
            <div className='mt-4 text-center'>
                <h1 className="text-black">Edit <span className="badge text-bg-secondary">Blog</span></h1>
            </div>
            <div className="mb-4 p-4 table-responsive">
                {
                    blogPost.length === 0 ? <p className="text-center">No blog records found!</p> :
                        <table className="table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th scope="col" className='text-center'>Blog Title</th>
                                    <th scope="col" className='text-center'>Blog Category</th>
                                    <th scope="col" className='text-center'>Description</th>
                                    <th scope="col" className='text-center'>Published Date</th>
                                    <th scope="col" className='text-center'>Author</th>
                                    <th scope="col" className='text-center'>Actions</th>
                                </tr>
                            </thead>
                            <tbody className="table-group-divider">
                                {
                                    blogPost.map((blog, index) => {
                                        return (
                                            <tr key={index}>
                                                <th className='text-center'>{blog.title}</th>
                                                <td className='text-center'>{blog.categories.name}</td>
                                                <td className='text-center'>{blog.description}</td>
                                                <td className='text-center'>{blog.dateCreated}</td>
                                                <td className='text-center'>{blog.author}</td>
                                                <td>
                                                    <div className={`d-flex justify-content-${isSmallScreen ? 'start' : 'center'}`}>
                                                        <Link className="btn btn-warning me-2" style={{ width: '80px' }} to={`/edit-blogs/${blog.id}`}>
                                                            Edit
                                                        </Link>
                                                        <button className="btn btn-danger" style={{ width: '80px' }} data-bs-toggle="modal" data-bs-target="#deleteRegionModal">Delete</button>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                }
            </div>
        </>
    );
}

export default EditBlogPost;

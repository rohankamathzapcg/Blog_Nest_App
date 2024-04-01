import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

const EditBlogPost = () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);
    const [blogPost, setBlogPost] = useState([])
    const [selectedId, setSelectedId] = useState();
    const navigate=useNavigate();

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


    const HandleDelete = (id) => {
        setSelectedId(id)
    }
    const handleRemove = () => {
        axios.delete(`${apiUrl}/api/BlogPost/${selectedId}`)
            .then((result) => {
                if (result.status === 200) {
                    toast.success("Blog deleted Successfully", {
                        theme: "dark",
                        autoClose: 1000,
                    });
                    setTimeout(()=>{
                        window.location.reload()
                        navigate("/edit-blogs")
                    },2000)
                } else {
                    toast.error("Something went wrong!!", {
                        theme: "dark",
                        autoClose: 1000,
                    });
                }
            })
            .catch(err => console.log(err))
    }

    return (
        <>
            <div className='mt-4 text-center'>
                <h1 className="text-black">Edit <span className="badge text-bg-secondary">Blog</span></h1>
            </div>
            <ToastContainer />

            {/* Delete Modal */}
            <div className="modal fade" id="deleteBlogModal" tabIndex={-1} aria-labelledby="deleteBlogModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="deleteBlogModalLabel">Delete Blog</h1>
                            <button type="button" className="btn-close shadow-none" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <p>Do you want to delete this specific walk details ?</p>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary shadow-none" data-bs-dismiss="modal">Close</button>
                                <button type="button" onClick={handleRemove} className="btn btn-danger shadow-none">Delete Blog</button>
                            </div>
                        </div>
                    </div>
                </div>
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
                                                        <button className="btn btn-danger" style={{ width: '80px' }} data-bs-toggle="modal" data-bs-target="#deleteBlogModal" onClick={() => HandleDelete(blog.id)}>Delete</button>
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

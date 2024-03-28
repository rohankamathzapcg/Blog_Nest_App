import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import Markdown from 'react-markdown'

const AddBlogPost = () => {
    const apiUrl = import.meta.env.VITE_API_URL;

    const [categories, setCategories] = useState([]);
    const [newblogs, setNewBlogs] = useState({
        title: "",
        description: "",
        contents: "",
        urlHandle: "",
        featuredImageUrl: "",
        categoryId: "",
        dateCreated: "",
        author: "",
        isVisible: true
    });
    const [markdownContent, setMarkdownContent] = useState("");

    useEffect(() => {
        axios.get(`${apiUrl}/api/Categories`)
            .then((result) => {
                setCategories(result.data)
            })
            .catch(err => console.log(err))
    }, [apiUrl])

    const HandleSubmitBlog = () => {
        // Convert date to UTC format
        const utcDateCreated = new Date(newblogs.dateCreated);
        utcDateCreated.setMinutes(utcDateCreated.getMinutes() - utcDateCreated.getTimezoneOffset());
        newblogs.dateCreated = utcDateCreated.toISOString();

        axios.post(`${apiUrl}/api/BlogPost`, newblogs)
            .then((result) => {

                if (result.status === 200) {
                    toast.success("New Blog Added Successfully", {
                        theme: "dark",
                        autoClose: 1000,
                    });
                    setNewBlogs({
                        title: "",
                        description: "",
                        contents: "",
                        urlHandle: "",
                        featuredImageUrl: "",
                        categoryId: "",
                        dateCreated: "",
                        author: "",
                        isVisible: true
                    });
                } else {
                    toast.error("Something went wrong!!", {
                        theme: "dark",
                        autoClose: 1000,
                    });
                }
            })
            .catch(err => console.log(err))
    }

    const handleContentChange = (e) => {
        const content = e.target.value;
        setNewBlogs({ ...newblogs, contents: content });
        setMarkdownContent(content);
    }

    const HandleCancelBlog = () => {
        setNewBlogs({
            title: "",
            description: "",
            contents: "",
            urlHandle: "",
            featuredImageUrl: "",
            categoryId: "",
            dateCreated: "",
            author: "",
            isVisible: true
        });
    }

    return (
        <>
            <div className="container shadow-lg mt-4 p-2 mb-4">
                <ToastContainer />
                <div className='row justify-content-center'>
                    <div className='col-md-6'>
                        <div className='mt-4 text-center'>
                            <h1 className="text-black">Add New Blog</h1>
                        </div>
                        <div className="mt-3 mb-3">
                            <label htmlFor="BlogTitle" className="form-label">Blog Title</label>
                            <input type="text" className="form-control shadow-none" id="BlogTitle" placeholder="Enter your blog title" value={newblogs.title} onChange={(e) => setNewBlogs({ ...newblogs, title: e.target.value })} />
                        </div>
                        <div className="mt-3 mb-3">
                            <label htmlFor="BlogUrl" className="form-label">Blog URL</label>
                            <input type="text" className="form-control shadow-none" id="BlogUrl" placeholder="Enter your blog url" value={newblogs.urlHandle} onChange={(e) => setNewBlogs({ ...newblogs, urlHandle: e.target.value })} />
                        </div>
                        <div className="mt-3 mb-3">
                            <label className="form-label">Choose Blog Category</label>
                            <select className="form-select shadow-none" aria-label="Category" value={newblogs.categoryId} onChange={(e) => setNewBlogs({ ...newblogs, categoryId: e.target.value })}>
                                <option value="">--- Select --</option>
                                {
                                    categories.map((category, index) => {
                                        return (
                                            <option key={index} value={category.id}>{category.name}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>

                        <div className="mt-3 mb-3">
                            <label htmlFor="BlogDesc" className="form-label">Short Description</label>
                            <input type="text" className="form-control shadow-none" id="BlogDesc" placeholder="Enter short description" value={newblogs.description} onChange={(e) => setNewBlogs({ ...newblogs, description: e.target.value })} />
                        </div>
                        <div className="mt-3 mb-3">
                            <label htmlFor="BlogAuthor" className="form-label">Author Name</label>
                            <input type="text" className="form-control shadow-none" id="BlogAuthor" placeholder="Enter author name" value={newblogs.author} onChange={(e) => setNewBlogs({ ...newblogs, author: e.target.value })} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="BlogContent" className="form-label">Blog Contents</label>
                            <textarea className="form-control shadow-none" id="BlogContent" rows="5" placeholder="Describe contents here..." value={newblogs.contents} onChange={handleContentChange}></textarea>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="BlogPreview" className="form-label">Blog Preview</label>
                            <div className="p-2" style={{ maxHeight: "350px", overflowY: "scroll", border: "1px solid black", borderRadius: "5px" }}>
                                <Markdown>{markdownContent}</Markdown>
                            </div>
                        </div>
                        <div className="mt-3 mb-3">
                            <label htmlFor="BlogImage" className="form-label">Featured Image URL</label>
                            <input type="text" className="form-control shadow-none" id="BlogImage" placeholder="Featured Image url" value={newblogs.featuredImageUrl} onChange={(e) => setNewBlogs({ ...newblogs, featuredImageUrl: e.target.value })} />
                            {
                                newblogs.featuredImageUrl === '' ? null : (
                                    <div>
                                        <br/>
                                        <label htmlFor="BlogImage" className="form-label">Image Preview</label><br />
                                        <div className="p-2" style={{ border: "1px solid black", borderRadius: "5px" }}>
                                            <img src={newblogs.featuredImageUrl} height={100} />
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                        <div className="mt-3 mb-3">
                            <label htmlFor="BlogDate" className="form-label">Published Date</label>
                            <input type="Date" className="form-control shadow-none" id="BlogDate" placeholder="Enter author name" value={newblogs.dateCreated} onChange={(e) => setNewBlogs({ ...newblogs, dateCreated: e.target.value })} />
                        </div>
                        <div className="form-check">
                            <input className="form-check-input shadow-none" type="checkbox" checked={newblogs.isVisible} onChange={(e) => setNewBlogs({ ...newblogs, isVisible: e.target.checked })} />
                            <label className="form-check-label" htmlFor="flexCheckDefault">
                                Is Visible?
                            </label>
                        </div>
                        <div className="mt-4 mb-4 d-flex justify-content-between">
                            <button type="button" className="btn btn-success" onClick={() => HandleSubmitBlog()}>Publish new blog</button>
                            <button type="button" className="btn btn-danger" onClick={() => HandleCancelBlog()}>Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AddBlogPost;

import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Markdown from 'react-markdown'
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import ImageSelector from "../../Components/ImageSelector";

const BlogPost = () => {

  const apiUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const { id } = useParams();
  const [imageSelectorVisible, setImageSelectorVisible] = useState(false);
  const [markdownContent, setMarkdownContent] = useState("");
  const [categories, setCategories] = useState([]);
  const [updatedblog, setUpdatedBlogs] = useState({
    title: "",
    description: "",
    contents: "",
    urlHandle: "",
    featuredImageUrl: "",
    categoryId: "",
    dateCreated: "",
    author: "",
    isVisible: true
  })
  const [selectedImageUrl, setSelectedImageUrl] = useState("");

  const handleContentChange = (e) => {
    const content = e.target.value;
    setUpdatedBlogs({ ...updatedblog, contents: content });
    setMarkdownContent(content);
  }

  useEffect(() => {
    axios.get(`${apiUrl}/api/BlogPost/${id}`)
      .then((result) => {
        setUpdatedBlogs(result.data)
      })
      .catch(err => console.log(err))
  }, [apiUrl, id])

  useEffect(() => {
    axios.get(`${apiUrl}/api/Categories`)
      .then((result) => {
        setCategories(result.data)
      })
      .catch(err => console.log(err))
  }, [apiUrl, updatedblog])

  const HandleSubmit = () => {
    axios.put(`${apiUrl}/api/BlogPost/${id}`, updatedblog)
      .then((result) => {
        if (result.status === 200) {
          toast.success("Blog updated Successfully", {
            theme: "dark",
            autoClose: 1000,
          });
          setTimeout(() => {
            navigate("/edit-blogs")

          }, 2000)
        } else {
          toast.error("Something went wrong!!", {
            theme: "dark",
            autoClose: 1000,
          });
        }
      })
      .catch(err => console.log(err))
  }

  const openImageSelector = () => {
    setImageSelectorVisible(true);
  }

  const closeImageSelector = () => {
    setImageSelectorVisible(false);
  }

  const handleSelectImage = (imageUrl) => {
    setSelectedImageUrl(imageUrl); // Set selected image URL
  };

  return (
    <>
      <div className="container shadow-lg mt-4 p-3 mb-4">
        <ToastContainer />
        <div className='row justify-content-center'>
          <div className='col-md-6'>
            <div className='mt-4 text-center'>
              <h1 className="text-black">Your <span className="badge text-bg-secondary">Blog</span></h1>
            </div>
            <div className="mt-3 mb-3">
              <label htmlFor="BlogTitle" className="form-label">Blog Title</label>
              <input type="text" className="form-control shadow-none" id="BlogTitle" placeholder="Enter your blog title" value={updatedblog.title} onChange={(e) => setUpdatedBlogs({ ...updatedblog, title: e.target.value })} />
            </div>
            <div className="mt-3 mb-3">
              <label htmlFor="BlogUrl" className="form-label">Blog URL</label>
              <input type="text" className="form-control shadow-none" id="BlogUrl" placeholder="Enter your blog url" value={updatedblog.urlHandle} onChange={(e) => setUpdatedBlogs({ ...updatedblog, urlHandle: e.target.value })} />
            </div>
            <div className="mt-3 mb-3">
              <label className="form-label">Choose Blog Category</label>
              <select className="form-select shadow-none" aria-label="Category" value={updatedblog.categoryId} onChange={(e) => setUpdatedBlogs({ ...updatedblog, categoryId: e.target.value })}>
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
              <input type="text" className="form-control shadow-none" id="BlogDesc" placeholder="Enter short description" value={updatedblog.description} onChange={(e) => setUpdatedBlogs({ ...updatedblog, description: e.target.value })} />
            </div>
            <div className="mt-3 mb-3">
              <label htmlFor="BlogAuthor" className="form-label">Author Name</label>
              <input type="text" className="form-control shadow-none" id="BlogAuthor" placeholder="Enter author name" value={updatedblog.author} onChange={(e) => setUpdatedBlogs({ ...updatedblog, author: e.target.value })} />
            </div>
            <div className="mb-3">
              <label htmlFor="BlogContent" className="form-label">Blog Contents</label>
              <textarea className="form-control shadow-none" id="BlogContent" rows="5" placeholder="Describe contents here..." value={updatedblog.contents} onChange={handleContentChange}></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="BlogPreview" className="form-label">Blog Preview</label>
              <div className="p-2" style={{ maxHeight: "350px", overflowY: "scroll", border: "1px solid black", borderRadius: "5px" }}>
                <Markdown>{markdownContent}</Markdown>
              </div>
            </div>
            <div className="mt-3 mb-3">
              <label htmlFor="BlogImage" className="form-label">Featured Image URL &nbsp;</label>
              <input type="text" className="form-control shadow-none" id="BlogImage" placeholder="Featured Image url" value={selectedImageUrl==='' ? updatedblog.featuredImageUrl : selectedImageUrl} onChange={(e) => setUpdatedBlogs({ ...updatedblog, featuredImageUrl: e.target.value })} />
              <button type='button' className='form-control btn btn-outline-secondary mt-2' onClick={openImageSelector}>Browse Here</button>
              {
                updatedblog.featuredImageUrl === '' ? null : (
                  <div>
                    <br />
                    <label htmlFor="BlogImage" className="form-label">Image Preview</label><br />
                    <div className="p-2" style={{ border: "1px solid black", borderRadius: "5px" }}>
                      <img src={updatedblog.featuredImageUrl} height={100} />
                    </div>
                  </div>
                )
              }
            </div>
            <div className="mt-3 mb-3">
              <label htmlFor="BlogDate" className="form-label">Published Date</label>
              <input type="Date" className="form-control shadow-none" id="BlogDate" placeholder="Enter author name" value={updatedblog.dateCreated ? format(new Date(updatedblog.dateCreated), 'yyyy-MM-dd') : ''} onChange={(e) => setUpdatedBlogs({ ...updatedblog, dateCreated: e.target.value })} />
            </div>
            <div className="form-check">
              <input className="form-check-input shadow-none" type="checkbox" checked={updatedblog.isVisible} onChange={(e) => setUpdatedBlogs({ ...updatedblog, isVisible: e.target.checked })} />
              <label className="form-check-label" htmlFor="flexCheckDefault">
                Is Visible?
              </label>
            </div>
            <div className="mt-4 mb-4 d-flex justify-content-between">
              <button type="button" className="btn btn-success" onClick={HandleSubmit}>Update blog</button>
              <button type="button" className="btn btn-danger" onClick={() => { navigate("/edit-blogs") }}>Cancel</button>
            </div>
          </div>
        </div>
      </div>

      {imageSelectorVisible && (
        <div className='images-container-modal' >
          <button type='button' className="btn btn-light" style={{ position: "fixed", top: "10px", right: "10px" }} onClick={closeImageSelector}>X</button>
          <ImageSelector onClose={closeImageSelector} onSelectImage={handleSelectImage} />
        </div>
      )}
    </>
  );
}

export default BlogPost;

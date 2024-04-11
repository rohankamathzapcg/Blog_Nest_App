import axios from 'axios'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Markdown from 'react-markdown'

const BlogDetail = () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const { urlHandle } = useParams();
    // const [markdownContent, setMarkdownContent] = useState("");
    const [blogDetails, setBlogDetails] = useState({
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

    useEffect(() => {
        axios.get(`${apiUrl}/api/BlogPost/${urlHandle}`)
            .then((result) => {
                setBlogDetails(result.data)
            })
            .catch(err => console.log(err))
    }, [apiUrl, urlHandle])

    return (
        <>
            <div className="container">
                <div className="py-5">
                    <div className="col-12 col-md-8 col-lg-6 mx-auto">
                        <img src={blogDetails.featuredImageUrl} alt="" title={blogDetails.title} className='img-fluid' />
                        <h1 className='mt-4'>{blogDetails.title}</h1>

                        <div className="d-flex justify-content-between mt-4">
                            <span>{blogDetails.author}</span>
                            <span>{blogDetails.dateCreated}</span>
                        </div>

                        <div className='mt-4'>
                            <span className="badge bg-secondary me-2">{blogDetails.categories?.name}</span>
                        </div>

                        <div className='mt-4 blog-content'>
                            <Markdown>{blogDetails.contents}</Markdown>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default BlogDetail;

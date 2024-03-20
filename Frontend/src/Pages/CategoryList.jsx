import { useState, useRef, useEffect } from "react";
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';

const CategoryList = () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const [categories, setCategories] = useState([])
    const [categoryValues, setCategoryValues] = useState({
        name: "",
        urlHandle: ""
    })
    const closeRef = useRef(null)

    const handleCloseBtn = () => {
        if (closeRef.current) {
            closeRef.current.click();
        }
    }

    useEffect(() => {
        axios.get(`${apiUrl}/api/Categories`)
            .then((result) => {
                setCategories(result.data)
            })
            .catch(err => console.log(err))
    }, [])

    const handleAdd = () => {
        axios.post(`${apiUrl}/api/Categories`, categoryValues)
            .then((result) => {
                if (result.status === 200) {
                    toast.success("New Category Added Successfully", {
                        theme: "dark",
                        autoClose: 1000,
                    });
                    setCategoryValues({
                        name: "",
                        urlHandle: ""
                    });
                    handleCloseBtn();
                    setTimeout(() => {
                        window.location.reload();
                    }, 3000);
                }
            })
            .catch(err => console.log(err))
    }
    return (
        <>
            <div className='mt-4 mb-4 container-fluid'>
                <ToastContainer />
                <h2 className="text-uppercase text-center mb-5">Category List</h2>
                <button type="button" className="btn btn-sm btn-lg btn-success mb-3" data-bs-toggle="modal" data-bs-target="#categoryModal">
                    Add Category
                </button>
                <div className="table-responsive">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th scope="col" className='text-center'>Category Name</th>
                                <th scope="col" className='text-center'>Category URL</th>
                                <th scope="col" className='text-center'>Actions</th>
                            </tr>
                        </thead>
                        <tbody className="table-group-divider">
                            {
                                categories.length < 0 ? <p className="text-center">No Records Found!!</p> :
                                    categories.map((category, index) => {
                                        return (
                                            <tr key={index}>
                                                <th scope="row" className='text-center'>{category.name}</th>
                                                <td className='text-center'>{category.urlHandle}</td>
                                                <td className='text-center'>
                                                    <button type="button" className="btn btn-warning" style={{ width: '80px' }} data-bs-toggle="modal" data-bs-target="#editCategoryModal">
                                                        Edit
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    })
                            }
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Add Modal */}
            <div className="modal fade" id="categoryModal" tabIndex={-1} aria-labelledby="categoryModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="categoryModalLabel">Add New Category</h1>
                            <button type="button" ref={closeRef} className="btn-close shadow-none" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="input-group mb-3">
                                <span className="input-group-text">Category</span>
                                <input type="text" className="form-control shadow-none" aria-label="Difficulty Level" value={categoryValues.name} onChange={(e) => setCategoryValues({ ...categoryValues, name: e.target.value })} />
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text">Category URL</span>
                                <input type="text" className="form-control shadow-none" aria-label="Difficulty Level" value={categoryValues.urlHandle} onChange={(e) => setCategoryValues({ ...categoryValues, urlHandle: e.target.value })} />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary shadow-none" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary shadow-none" onClick={handleAdd}>Add Category</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Edit Modal */}
            <div className="modal fade" id="editCategoryModal" tabIndex={-1} aria-labelledby="editCategoryModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="editCategoryModalLabel">Edit Category</h1>
                            <button type="button" ref={closeRef} className="btn-close shadow-none" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="input-group mb-3">
                                <span className="input-group-text">Category</span>
                                <input type="text" className="form-control shadow-none" aria-label="Difficulty Level" />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary shadow-none" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary shadow-none">Update Category</button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}

export default CategoryList;


const ImageSelector = () => {
    return (
        <>
            <div className="card h-100">
            <div className="card-header">
                <h3 className="card-title">Choose Images</h3>
            </div>
            <div className="card-body">
                <div className="row">
                    <div className="col-md-8 col-sm-12">
                        {/* Main content area */}
                    </div>
                    <div className="col-md-4 col-sm-12 mt-3 mt-md-0">
                        {/* Upload image section */}
                        <div className="bg-light p-3">
                            <h5>Upload Image</h5>
                            <form>
                                <div className="mt-3">
                                    <input type="file" className="form-control shadow-none" />
                                </div>
                                <div className="mt-3">
                                    <input type="text" className="form-control shadow-none" placeholder="File name will be displayed here" name="filename" />
                                </div>
                                <div className="mt-3">
                                    <input type="text" className="form-control shadow-none" placeholder="Title" name="title" />
                                </div>
                                <div className="mt-3">
                                    <button type="submit" className="btn btn-dark">Upload</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default ImageSelector;

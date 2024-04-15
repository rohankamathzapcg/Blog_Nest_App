import axios from "axios";
import { useState } from "react";
import { toast } from 'react-toastify';

const Register = () => {
    const apiUrl = import.meta.env.VITE_API_URL;

    const [userDetails, setUserDetails] = useState({
        email: "",
        password: ""
    })

    const handleRegister = () => {
        axios.post(`${apiUrl}/api/Auth/register`, userDetails)
            .then((result) => {
                console.log(result)
                if (result.status === 200) {
                    toast.success("Regstered Successfully", {
                        theme: "dark",
                        autoClose: 1000,
                    });
                }
                else {
                    toast.error("Enter Valid Data", {
                        theme: "dark",
                        autoClose: 1000,
                    });
                }
            })
            .catch((err) => console.log(err))
    }
    return (
        <>
            <div className="modal fade" id="exampleModal2" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">SignUp / Register</h1>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3 row">
                                <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Email</label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control shadow-none" id="staticEmail" value={userDetails.email} onChange={(e) => { setUserDetails({ ...userDetails, email: e.target.value }) }} />
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Password</label>
                                <div className="col-sm-10">
                                    <input type="password" className="form-control shadow-none" id="inputPassword" value={userDetails.pass} onChange={(e) => { setUserDetails({ ...userDetails, password: e.target.value }) }} />
                                </div>
                            </div>
                            <p className="text-center">
                                Already have an account? &nbsp;
                                <button type="button" className="btn btn-bg-transparent p-0 border-0 text-primary m-0" data-bs-toggle="modal" data-bs-target="#exampleModal">Login</button>
                            </p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={(e) => handleRegister(e)}>Register</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Register;

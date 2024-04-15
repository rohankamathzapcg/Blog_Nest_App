import { useState } from "react";
import Register from "./Register";
import axios from "axios";
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

const Login = ({ onLogin }) => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const [userData, setUserData] = useState({
        email: "",
        password: ""
    });
    const handleLogin = () => {
        const username=userData.email;
        axios.post(`${apiUrl}/api/Auth/login`,userData)
            .then((result) => {
                onLogin(username);
                if (result.status === 200) {
                    toast.success("Logged In Successfully", {
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

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">

                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">LogIn / SignIn</h1>                        </div>
                        <div className="modal-body">
                            <div className="mb-3 row">
                                <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Email</label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control shadow-none" value={userData.email} onChange={(e) => { setUserData({ ...userData, email: e.target.value }) }} />
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Password</label>
                                <div className="col-sm-10">
                                    <input type="password" className="form-control shadow-none" value={userData.password} onChange={(e) => { setUserData({ ...userData, password: e.target.value }) }} />
                                </div>
                            </div>
                            <p className="text-center">
                                Don&apos;t Have and account already? &nbsp;
                                <button type="button" className="btn btn-bg-transparent p-0 border-0 text-primary m-0" data-bs-toggle="modal" data-bs-target="#exampleModal2">Register</button>
                            </p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={(e) => { handleLogin(e) }}>Login</button>
                        </div>
                    </div>
                </div>
            </div>
            <Register />
        </>
    );
}

Login.propTypes = {
    onLogin: PropTypes.func.isRequired
  };

export default Login;

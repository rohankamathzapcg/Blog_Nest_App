import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Login from "./Login";

const Navbar = () => {
  const [isSmallScreen, setIsSmallScreen] = useState();

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, []);

  const HandleLogout=()=>{
    sessionStorage.setItem('user','')
    window.location.reload();
  }

  return (
    <>
      {/* <ToastContainer /> */}
      <nav className="navbar navbar-expand-lg p-4" style={{ backgroundColor: "#e3f2fd" }}>
        <div className="container-fluid">
          <Link className="navbar-brand fs-2" to="/">Code<span style={{ color: "red" }}>Blog.</span></Link>
          <button className="navbar-toggler shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link fs-5" aria-current="page" to="/" >Home</Link>
              </li>
              <li className="nav-item">
                <Link to="/admin/categorylist" className="nav-link fs-5" >Category List</Link>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle fs-5" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Blogs
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="nav-link text-center" to="/add-blogs" >Add Blogs</Link>
                  </li>
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <Link className="nav-link text-center" to="/edit-blogs" >Edit Blogs</Link>
                  </li>
                </ul>
              </li>

              <li>
              </li>
            </ul>
            {/* {
              isVisible ? (
                <div className="d-flex" role="search">
                  <input className="form-control me-2 shadow-none" type="search" placeholder="Search" aria-label="Search" />
                  <button className="btn btn-outline-success shadow-none me-2" type="submit">Search</button>
                </div>
              ) : null
            } */}
            <Login />

            {
              !sessionStorage.getItem('user') ? (
                <div className={isSmallScreen ? "mt-3" : ""}>
                  <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Login/Register</button>
                </div>
              ) :
                <>
                  <div className={isSmallScreen ? "mt-3 d-flex align-items-center" : "d-flex align-items-center"}>
                    <p className="me-2">{sessionStorage.getItem('user')}</p>
                    <button type="button" className="btn btn-danger" onClick={()=>HandleLogout()}>Logout</button>
                  </div>

                </>
            }
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;

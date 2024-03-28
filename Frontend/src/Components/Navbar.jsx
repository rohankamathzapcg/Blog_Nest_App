import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isSmallScreen, setIsSmallScreen] = useState();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, []);

  return (
    <>
      <nav className="navbar navbar-expand-lg p-4 sticky-top" style={{ backgroundColor: "#e3f2fd" }}>
        <div className="container-fluid">
          <Link className="navbar-brand fs-2" to="/" onClick={() => setIsVisible(true)}>Blog<span style={{ color: "red" }}>Nest.</span></Link>
          <button className="navbar-toggler shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link fs-5" aria-current="page" to="/" onClick={() => setIsVisible(true)}>Home</Link>
              </li>
              <li className="nav-item">
                <Link to="/admin/categorylist" className="nav-link fs-5" onClick={() => setIsVisible(true)}>Category List</Link>
              </li>
              <li>
                <Link className="nav-link fs-5" to="/add-blogs" onClick={() => setIsVisible(false)}>Add Blogs</Link>
              </li>
            </ul>
            {
              isVisible ? (
                <div className="d-flex" role="search">
                  <input className="form-control me-2 shadow-none" type="search" placeholder="Search" aria-label="Search" />
                  <button className="btn btn-outline-success shadow-none me-2" type="submit">Search</button>
                </div>
              ) : null
            }
            <div className={isSmallScreen ? "mt-3" : ""}>
              <a className="nav-link fs-5 ms-lg-3" aria-current="page" href="#">Login/Signup</a>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;

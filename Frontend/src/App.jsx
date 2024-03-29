import Footer from "./Components/Footer";
import Navbar from "./Components/Navbar"

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import CategoryList from "./Pages/Categories/CategoryList";
import AddBlogPost from "./Pages/BlogPost/AddBlogPost";

const App = () => {
  return (
    <>
      <BrowserRouter>

        <Navbar />

        <Routes>
          
          <Route path="/admin/categorylist" element={<CategoryList />} />
          <Route path="/add-blogs" element={<AddBlogPost />} />
        </Routes>

        <Footer />

      </BrowserRouter>


    </>
  )
}

export default App

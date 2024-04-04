import Footer from "./Components/Footer";
import Navbar from "./Components/Navbar"

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import CategoryList from "./Pages/Categories/CategoryList";
import AddBlogPost from "./Pages/BlogPost/AddBlogPost";
import EditBlogPost from "./Pages/BlogPost/EditBlogPost";
import BlogPost from "./Pages/BlogPost/BlogPosts";
import HomePage from "./Pages/HomePage";

const App = () => {
  return (
    <>
      <BrowserRouter>

        <Navbar />

        <Routes>

          <Route path='/' element={<HomePage />} />
          <Route path="/admin/categorylist" element={<CategoryList />} />
          <Route path="/add-blogs" element={<AddBlogPost />} />
          <Route path="/edit-blogs" element={<EditBlogPost />} />
          <Route path="/edit-blogs/:id" element={<BlogPost />} />

        </Routes>

        <Footer />

      </BrowserRouter>


    </>
  )
}

export default App

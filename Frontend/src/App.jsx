import Footer from "./Components/Footer";
import Navbar from "./Components/Navbar"

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import CategoryList from "./Pages/CategoryList";

const App = () => {
  return (
    <>
      <BrowserRouter>

        <Navbar />

        <Routes>
          
          <Route path="/categorylist" element={<CategoryList />} />

        </Routes>

        <Footer />

      </BrowserRouter>


    </>
  )
}

export default App

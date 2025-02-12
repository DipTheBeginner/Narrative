import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Signup } from "./pages/Signup"
import { Signin } from "./pages/Signin"
import { Blogs } from "./pages/Blogs"
import { CreateBlog } from "./pages/CreateBlog"


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/blog/getAll"  element={<Blogs/>}/>
          <Route path="/blog" element={<CreateBlog/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

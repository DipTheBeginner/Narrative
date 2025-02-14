import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Signup } from "./pages/Signup"
import { Signin } from "./pages/Signin"
import { Blogs } from "./pages/Blogs"
import { ViewBlog } from "./pages/ViewBlog"


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/blog"  element={<Blogs/>}/>
          {/* <Route path="" element={<CreateBlog/>}/> */}
          <Route path="/blog/get" element={<ViewBlog/>}/>
          {/* <CreateBlog/ */}
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

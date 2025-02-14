import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface BlogProps {
    title: string;
    content: string;
}

export const CreateBlog = () => {
    const [blog, setBlog] = useState<BlogProps>({
        title: "",
        content: "",
    });
    const navigate=useNavigate();

    async function handlePost() {
        const token = localStorage.getItem("token");

        console.log("token in create blog is=", token);

        const response = await axios.post(
            "http://localhost:3000/api/v1/post/blog",
            {

                title: blog.title,
                content: blog.content,
            },
            {
                headers:{
                    Authorization:`Bearer ${token}`
                }
            }
        );

        navigate("/blog/getAll");

        console.log("Blog posted successfully", response.data);
    }

    return (
        <div className=" w-5/12 mx-auto p-6 bg-white shadow-md rounded-lg absolute">
            <h2 className="text-xl font-semibold mb-4">Create a Blog</h2>
            <input
                type="text"
                placeholder="Enter your Blog Title"
                value={blog.title}
                onChange={(e) => setBlog({ ...blog, title: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            />
            <textarea
                placeholder="Write your content here..."
                value={blog.content}
                onChange={(e) => setBlog({ ...blog, content: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none h-32"
            ></textarea>
            <button
                onClick={handlePost}
                className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
            >
                Submit
            </button>
        </div>
    );
};

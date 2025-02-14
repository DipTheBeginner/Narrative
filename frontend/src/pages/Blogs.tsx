import { useEffect, useState } from "react";
import { BlogComponent } from "../components/BlogComponent";
import axios from "axios";
import { CreateBlog } from "./CreateBlog";

interface BlogType {
    title: string;
    content: string;
}


export const Blogs = () => {
    const [posts, setPosts] = useState<BlogType[]>([]);
    const [loading, setLoading] = useState(true);
  
    const [createPostModal, setCreatePostModal] = useState<Boolean>(false);

    async function toCreatePost() {
        setCreatePostModal(true);

    }

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                setLoading(true);
                const tokens = localStorage.getItem("token");

                if (!tokens) return;

                const response = await axios.get(
                    "http://localhost:3000/api/v1/post/blog/getAll",
                    {
                        headers: {
                            authorization: `Bearer ${tokens}`,
                        },
                    }
                );
                setPosts(response.data.blogs);
            } finally {
                setLoading(false);
            }
        };

        fetchBlog();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-pulse flex flex-col items-center">
                    <div className="h-4 w-24 bg-gray-200 rounded mb-4"></div>
                    <div className="text-gray-500">Loading posts...</div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-3xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Blog Posts</h1>
                    <div className="relative w-full">

                    <button
                        onClick={toCreatePost}
                        className=" bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg 
                        shadow-sm transition-colors duration-200 flex items-center gap-2"
                        >
                        <span className="text-lg">+</span>
                        Create Post
                    </button>
                    {createPostModal===true? (<CreateBlog/>) : null}
                        </div>
                </div>

                {posts.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">No posts yet. Create your first post!</p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {posts.map((post, index) => (
                            <BlogComponent
                                key={index}
                                title={post.title}
                                content={post.content}
                            />
                        ))}
                    </div>
                )}
            </div>
            
            
        </div>
    );
};

export default Blogs;
import { useEffect, useState } from "react";
import { BlogComponent } from "../components/BlogComponent";
import axios from "axios";

interface BlogType {
    // author: string
    title: string;
    content: string;
}

export const Blogs = () => {
    const [posts, setPosts] = useState<BlogType[]>([]);

    const [loading, setLoading] = useState(true);

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
        return <div>Loadin....</div>;
    }

    return (
        <div className="max-w-xl flex justify-center flex-col">
            {posts.map((post) => (
                <BlogComponent
                    // authorName={post.author}
                    title={post.title}
                    content={post.content}
                />
            ))}
        </div>
    );
};

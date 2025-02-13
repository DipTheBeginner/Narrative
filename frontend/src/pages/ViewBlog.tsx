import { useState } from "react";
import axios from "axios";

interface FetchBlogProps {
  blogId: string;
}

interface BlogPost {
  title: string;
  content: string;
}

export const ViewBlog = () => {
  const [fetchBlog, setFetchBlog] = useState<FetchBlogProps>({
    blogId: "",
  });
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function findBlog() {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      
      const response = await axios.get(
        `http://localhost:3000/api/v1/post/blog/get/${fetchBlog.blogId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("API Response:", response.data);
      setPost(response.data.blogExist);
    } catch (err) {
      setError("Failed to find blog post. Please check the ID and try again.");
      setPost(null);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Find Blog Post</h1>
          
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Enter post ID"
              value={fetchBlog.blogId}
              onChange={(e) => {
                setFetchBlog({
                  ...fetchBlog,
                  blogId: e.target.value,
                });
              }}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 
                         focus:ring-blue-500 focus:border-blue-500 outline-none 
                         transition-all duration-200"
            />
            <button
              onClick={findBlog}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 
                       text-white px-6 py-2 rounded-lg shadow-sm 
                       transition-colors duration-200"
            >
              {loading ? "Searching..." : "Find Post"}
            </button>
          </div>

          {error && (
            <div className="mt-4 p-4 bg-red-50 text-red-600 rounded-lg">
              {error}
            </div>
          )}
        </div>

        {loading && (
          <div className="animate-pulse bg-white rounded-lg shadow-sm p-6">
            <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              <div className="h-4 bg-gray-200 rounded w-4/6"></div>
            </div>
          </div>
        )}

{post && (
                <article className="bg-white rounded-lg shadow-sm p-6">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        {post.title}
                    </h2>
                    <div className="prose prose-lg max-w-none">
                        <p className="text-gray-600 leading-relaxed">
                            {post.content}
                        </p>
                    </div>
                </article>
            )}
      </div>
    </div>
  );
};


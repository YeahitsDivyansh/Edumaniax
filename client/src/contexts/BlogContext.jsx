import axios from "axios";
import { createContext, useContext, useState, useCallback } from "react";
const BlogContext = createContext();
export const useBlog = () => useContext(BlogContext);

export const BlogProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([]);
  const [singleBlog, setSingleBlog] = useState(null);
  const [similarBlogs, setSimilarBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const server = "https://edumaniax-api-343555083503.asia-south1.run.app";
  
  // Get all blogs
  const getAllBlogs = async () => {
    if (blogs.length > 0) return; // already fetched

    setLoading(true);
    try {
      const cached = localStorage.getItem("blogs");
      if (cached) {
        setBlogs(JSON.parse(cached));
        setLoading(false); // show cached immediately
      }

      const res = await axios.get(`${server}/blogs`);
      setBlogs(res.data);
      localStorage.setItem("blogs", JSON.stringify(res.data));
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  // Get single blog by ID + similar blogs
  const getBlogById = useCallback(async (id) => {
    setLoading(true);
    try {
      const cached = localStorage.getItem(`blog-${id}`);
      if (cached) {
        const { blog, similar } = JSON.parse(cached);
        setSingleBlog(blog);
        setSimilarBlogs(similar);
      }

      const res = await axios.get(`${server}/blogs/${id}`);
      setSingleBlog(res.data.blog);
      setSimilarBlogs(res.data.similar);
      localStorage.setItem(
        `blog-${id}`,
        JSON.stringify({
          blog: res.data.blog,
          similar: res.data.similar,
        })
      );
    } catch (error) {
      console.error("Error fetching blog:", error);
    } finally {
      setLoading(false);
    }
  }, [server]);

  // Create blog (expects FormData)
  const createBlog = async (blogData) => {
    try {
      console.log("📤 Sending blogData to server...");
      for (let pair of blogData.entries()) {
        console.log("➡️", pair[0], ":", pair[1]);
      }

      await axios.post(`${server}/blogs`, blogData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      getAllBlogs();
    } catch (error) {
      console.error(
        "❌ Error creating blog:",
        error.response?.data || error.message
      );
    }
  };

  // Delete blog
  const deleteBlog = async (id) => {
    try {
      await axios.delete(`${server}/blogs/${id}`);
      getAllBlogs();
    } catch (error) {
      console.log("Error deleting blog:", error.message);
      if (error.response) {
        console.log("Status:", error.response.status);
        console.log("Response data:", error.response.data);
      }
    }
  };

  // Post comment
  const postComment = useCallback(async (blogId, name, content) => {
    try {
      const response = await axios.post(`${server}/blogs/comment`, { blogId, name, content });
      getBlogById(blogId); // refresh comments
      return { success: true, data: response.data };
    } catch (error) {
      console.error("Error posting comment:", error);
      throw error; // Rethrow to allow component-level handling
    }
  }, [server, getBlogById]);

  // Get user comments by fetching all blogs and filtering comments
  const getUserComments = useCallback(async (name) => {
    try {
      // First get all blogs
      const blogsRes = await axios.get(`${server}/blogs`);
      const allBlogs = blogsRes.data;
      
      const userComments = [];
      
      // For each blog, get its details (which includes comments)
      for (const blog of allBlogs) {
        try {
          const blogRes = await axios.get(`${server}/blogs/${blog.id}`);
          const blogData = blogRes.data.blog;
          
          // Filter comments by user name
          if (blogData.comments && Array.isArray(blogData.comments)) {
            const userCommentsInBlog = blogData.comments.filter(
              comment => comment.name === name
            );
            
            // Add each comment with blog info
            userCommentsInBlog.forEach(comment => {
              userComments.push({
                blogId: blog.id,
                blogTitle: blog.title,
                comment: comment.content,
                date: comment.date
              });
            });
          }
        } catch (blogErr) {
          console.warn("Failed to fetch blog:", blog.id);
          // Continue with other blogs
        }
      }
      
      // Sort by date (newest first)
      userComments.sort((a, b) => new Date(b.date) - new Date(a.date));
      
      return userComments;
    } catch (err) {
      console.error("Failed to fetch user comments:", err);
      return [];
    }
  }, [server]);

  return (
    <BlogContext.Provider
      value={{
        blogs,
        singleBlog,
        similarBlogs,
        loading,
        getAllBlogs,
        getBlogById,
        createBlog,
        deleteBlog,
        postComment,
        getUserComments,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};

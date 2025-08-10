import React from "react";
import { useNavigate } from "react-router-dom";
import { useBlog } from "@/contexts/BlogContext";
import { useAuth } from "@/contexts/AuthContext";
import { formatTextWithLinks } from "@/utils/linkFormatter";

const BlogCard = ({ blog }) => {
  const navigate = useNavigate();
  const { deleteBlog } = useBlog();
  const { role } = useAuth();

  const handleDelete = (e) => {
    e.stopPropagation(); // prevent opening blog
    if (window.confirm("Are you sure you want to delete this blog?")) {
      deleteBlog(blog.id);
    }
  };

  const handleClick = (e) => {
    // Don't navigate if user clicked on a link within the title
    if (e.target.tagName === 'A') {
      e.stopPropagation();
      return;
    }
    navigate(`/blog/${blog.id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="w-full rounded-2xl shadow-md bg-white overflow-hidden hover:shadow-xl transition cursor-pointer"
    >
      {/* Top Image with Category Badge */}
      <div className="relative">
        <img
          src={blog.imageUrl}
          alt={blog.title}
          className="w-full h-48 object-cover rounded-t-2xl"
        />
        <span className="absolute top-2 left-2 bg-white text-black text-xs font-semibold px-3 py-1 rounded-full shadow">
          {blog.module}
        </span>
      </div>

      {/* Content */}
      <div className="p-5 space-y-2">
        <h2 className="text-lg font-bold text-gray-900">
          <span dangerouslySetInnerHTML={{ __html: formatTextWithLinks(blog.title) }} />
        </h2>

        <p className="text-xs text-black font-semibold">
          By <span>{blog.author || "Edumaniax"}</span> |{" "}
          {new Date(blog.createdAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </p>

        <p className="text-sm text-gray-700 line-clamp-3">
          {blog.introduction}
        </p>

        <div className="mt-2 inline-flex items-center gap-1 text-green-700 bg-green-100 rounded-full px-3 py-1 text-xs font-medium w-fit">
          <img src="/blogDesign/4-5minRead.svg" alt="read-time-icon" />
          {(blog.readTime || "4-5").replace(/mins?|minutes?/gi, "").trim() +
            " Min Read"}
        </div>

        {role === "admin" && (
          <button
            onClick={handleDelete}
            className="bg-red-600 text-white px-3 py-1 rounded mt-3 hover:bg-red-700"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default BlogCard;

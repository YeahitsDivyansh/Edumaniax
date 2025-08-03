import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useBlog } from "@/contexts/BlogContext";
import BlogCard from "@/components/BlogCard";
import { useAuth } from "@/contexts/AuthContext";
import CTA from "@/BlogDesign/CTA";

const SingleBlog = () => {
  const { user, role } = useAuth();
  const { id } = useParams();
  const { getBlogById, singleBlog, similarBlogs, loading, postComment } =
    useBlog();

  const [comment, setComment] = useState({ content: "" });

  const tocRef = useRef(null);
  const ctaRef = useRef(null);
  const [tocBottomOffset, setTocBottomOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!tocRef.current || !ctaRef.current) return;

      const tocRect = tocRef.current.getBoundingClientRect();
      const ctaRect = ctaRef.current.getBoundingClientRect();

      const padding = 20;

      if (ctaRect.top < window.innerHeight) {
        const overlap = window.innerHeight - ctaRect.top + padding;
        setTocBottomOffset(overlap);
      } else {
        setTocBottomOffset(0);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  useEffect(() => {
    getBlogById(id);
  }, [id, getBlogById]);

  if (loading || !singleBlog) return <div>Loading...</div>;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = user?.name || (role === "admin" ? "Admin" : null);
    
    // console.log("Submitting comment:", { 
    //   blogId: id, 
    //   name: name, 
    //   content: comment.content,
    //   user: user
    // });
    
    if (!name || !comment.content) {
      console.log("Missing required fields:", { name, content: comment.content });
      return;
    }
    
    try {
      // console.log("Sending comment to server...");
      await postComment(id, name, comment.content, user?.id || null);
      // console.log("Comment posted successfully:", result);
      setComment({ content: "" }); // Clear only the content field
    } catch (error) {
      console.error("Error posting comment:", error);
      // Could add user notification here
    }
  };

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 lg:px-8 flex flex-col lg:flex-row items-start gap-8 mt-6">
        {/* LEFT: Main Blog Content */}
        <div className="w-full lg:flex-[3] sm:ml-0">
          <div className="max-w-[95%] ml-0 sm:ml-0 md:-ml-5 mx-auto px-2 sm:px-4 md:px-6">
            {/* Breadcrumb */}
            <nav className="text-sm mt-8">
              <div className="bg-gray-50 border border-gray-300 text-gray-800 px-4 py-3 rounded-xl inline-flex items-center space-x-3">
                <Link
                  to="/"
                  className="flex items-center gap-1 text-gray-500 font-semibold hover:underline mr-4"
                >
                  <img
                    src="/blogDesign/homeForSs.svg"
                    alt="Home"
                    className="w-4 h-4 -mt-1"
                  />
                  <span className="-mt-1">Home</span>
                </Link>
                <img
                  src="/blogDesign/rightArrow.svg"
                  alt="Right Arrow"
                  className="w-3 h-3 ml-1"
                />
                <Link
                  to="/blogs"
                  className="text-gray-500 hover:underline -mt-1 block"
                >
                  Blogs
                </Link>
                <img
                  src="/blogDesign/rightArrow.svg"
                  alt="Right Arrow"
                  className="w-3 h-3"
                />
                <span className="font-semibold text-black flex items-center gap-1 -mt-1">
                  {singleBlog.title}
                </span>
              </div>
            </nav>

            {/* Blog Box */}
            <div className="mt-6 p-4 sm:p-6 sm:border sm:border-gray-300 sm:rounded-xl sm:shadow-sm">
              <h1 className="text-4xl md:text-4xl font-bold text-gray-900 flex items-center gap-2">
                {singleBlog.title}
              </h1>

              <div className="flex items-center gap-2 flex-wrap text-sm text-gray-600 mt-2">
                <span>By Edumaniax</span>
                <span className="text-gray-400">|</span>
                <span>
                  {new Date(singleBlog.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
                <div className="mt-1 inline-flex items-center gap-1 text-green-700 bg-green-100 rounded-full px-3 py-1 text-xs font-medium w-fit">
                  <img
                    src="/blogDesign/4-5minRead.svg"
                    alt="read-time-icon"
                    className="w-4 h-4"
                  />
                  {(singleBlog.readTime || "4-5")
                    .replace(/mins?|minutes?/gi, "")
                    .trim() + " Min Read"}
                </div>
              </div>

              <img
                src={singleBlog.imageUrl}
                alt="blog"
                className="rounded-lg mt-4 w-full"
              />

              {/* Mobile TOC */}
              <div className="bg-[#EFFFD9] border border-green-700 rounded-lg p-4 mt-8 block lg:hidden">
                <h2 className="text-xl font-bold text-black mt-2">
                  Table of Contents
                </h2>
                <ol className="mt-2 list-decimal list-inside space-y-2 text-green-900 font-medium text-sm md:text-base">
                  {Array.isArray(singleBlog.tableOfContents) &&
                    singleBlog.tableOfContents
                      .filter((item) => item.heading?.trim())
                      .map((item, idx) => (
                        <li key={idx}>
                          <a
                            href={`#point-${idx}`}
                            className="hover:underline text-green-800"
                          >
                            {item.heading}
                          </a>
                        </li>
                      ))}
                </ol>
              </div>

              {/* Blog Content */}
              <div className="mt-6 space-y-10">
                {Array.isArray(singleBlog.tableOfContents) &&
                  singleBlog.tableOfContents
                    .filter((point) => point.heading?.trim())
                    .map((point, index) => (
                      <div key={index} id={`point-${index}`} className="scroll-mt-24">
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">
                          {index + 1}. {point.heading}
                        </h2>

                        {Array.isArray(point.explanation) &&
                          point.explanation.filter((e) => e.trim()).length > 0 && (
                            <ul className="list-disc list-inside text-gray-800 pl-4 space-y-1">
                              {point.explanation
                                .filter((item) => item.trim())
                                .map((item, i) => (
                                  <li key={i}>
                                    <span className="font-medium">
                                      {String.fromCharCode(65 + i)}.
                                    </span>{" "}
                                    {item}
                                  </li>
                                ))}
                            </ul>
                          )}

                        {point.reflection?.trim() && (
                          <p className="mt-4 italic text-gray-700">
                            <strong>Reflection:</strong> {point.reflection}
                          </p>
                        )}
                      </div>
                    ))}
              </div>

              {/* Extra Blog Link */}
              <p className="mt-10  text-center text-gray-800    ">
                To explore more modules and success stories, visit the official{" "}
                <Link
                  to="/blogs"
                  className="underline"
                >
                  EduManiax Blogs
                </Link>
                .
              </p>


              {/* CTA with ref */}
              <div className="-ml-4 mt-12" ref={ctaRef}>
                <CTA />
              </div>

              <div className="flex items-center gap-3 mt-6">
                <span className="text-gray-900 text-lg font-bold whitespace-nowrap">
                  Share this blog on:
                </span>

                <a
                  href="https://www.facebook.com/sharer/sharer.php?u=https://yourblog.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 aspect-square flex items-center justify-center rounded-full bg-[#007F2D] hover:opacity-80 transition"
                >
                  <img
                    src="/blogDesign/facebook.svg"
                    alt="Facebook"
                    className="w-5 h-5"
                  />
                </a>

                <a
                  href="https://twitter.com/intent/tweet?url=https://yourblog.com&text=Check%20this%20out!"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 aspect-square flex items-center justify-center rounded-full bg-[#007F2D] hover:opacity-80 transition"
                >
                  <img
                    src="/blogDesign/twitter.svg"
                    alt="Twitter"
                    className="w-5 h-5"
                  />
                </a>

                <a
                  href="https://api.whatsapp.com/send?text=Check%20this%20out:%20https://yourblog.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 aspect-square flex items-center justify-center rounded-full bg-[#007F2D] hover:opacity-80 transition"
                >
                  <img
                    src="/blogDesign/whatsapp.svg"
                    alt="WhatsApp"
                    className="w-5 h-5"
                  />
                </a>

                <a
                  href="https://www.linkedin.com/shareArticle?mini=true&url=https://yourblog.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 aspect-square flex items-center justify-center rounded-full bg-[#007F2D] hover:opacity-80 transition"
                >
                  <img
                    src="/blogDesign/linkedin.svg"
                    alt="LinkedIn"
                    className="w-5 h-4"
                  />
                </a>
              </div>

              {/* Comments */}
              {user || role === "admin" ? (
                <form onSubmit={handleSubmit} className="mt-12">
                  <h3 className="text-lg font-semibold mb-4">
                    Leave your comment
                  </h3>
                  <div className="bg-white border rounded-lg p-4 flex items-start gap-4 shadow-sm">
                    <img
                      src="/blogDesign/avatar.svg"
                      alt="User Avatar"
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <input
                        type="text"
                        placeholder="Ask your question in comment"
                        value={comment.content}
                        onChange={(e) =>
                          setComment({ ...comment, content: e.target.value })
                        }
                        className="w-full p-3 border border-gray-300 rounded-md bg-[#F3F3F3] focus:outline-none focus:ring-2 focus:ring-green-700"
                      />
                      <div className="flex justify-end mt-3">
                        <button
                          type="submit"
                          className="bg-[#10903E] hover:bg-green-700 text-white font-medium px-5 py-2 rounded-md flex items-center gap-1 transition"
                        >
                          Post Now
                          <span>
                            <img
                              src="/blogDesign/buttonArrow.svg"
                              alt="arrow"
                            />
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              ) : (
                <p className="text-gray-600 italic mt-8">
                  Please{" "}
                  <span className="text-green-700 font-semibold italic">
                    login to comment
                  </span>{" "}
                  about the blog.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT: TOC */}
        <div
          ref={tocRef}
          className="hidden -ml-6 lg:block sticky top-[195px] self-start max-h-[calc(100vh-160px)] overflow-auto lg:flex-[1]"
          style={{ marginBottom: `${tocBottomOffset}px` }}
        >
          <div className="bg-[#EFFFD9] border border-green-700 rounded-lg p-3">
            <h2 className="text-base font-bold text-black mb-2">
              Table of Contents
            </h2>
            <ol className="list-decimal list-outside pl-5 space-y-1 text-green-900 font-medium text-sm">
              {Array.isArray(singleBlog.tableOfContents) &&
                singleBlog.tableOfContents
                  .filter((item) => item.heading?.trim())
                  .map((item, idx) => (
                    <li key={idx}>
                      <a
                        href={`#point-${idx}`}
                        className="hover:underline text-green-800"
                      >
                        {item.heading}
                      </a>
                    </li>
                  ))}
            </ol>
          </div>
        </div>
      </div>

      {/* ✅ Moved OUTSIDE of flex row */}
      {similarBlogs.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 lg:px-8 mt-10 mb-32">
          <h2 className="text-3xl font-bold mt-6">Similar Posts</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {similarBlogs.map((blog) => (
              <BlogCard key={blog._id} blog={blog} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default SingleBlog;

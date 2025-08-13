import { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";

export default function ScrollToTopButton() {
  const [showScroll, setShowScroll] = useState(false);

  // Listen to scroll
  useEffect(() => {
    const handleScroll = () => {
      setShowScroll(window.scrollY > 200); // Show after scrolling 200px
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll smoothly to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {showScroll && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-10 right-8 bg-gray-700 text-white p-4 rounded-lg shadow-md hover:bg-gray-800 transition-all cursor-pointer duration-300 z-[100]"
        >
          <FaArrowUp className="text-lg" />
        </button>
      )}
    </>
  );
}

import React, { useState, useEffect, useRef } from "react";
import { useBlog } from "@/contexts/BlogContext";
import toast from "react-hot-toast";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { formatTextForPreview } from "@/utils/linkFormatter";
const modules = [
  "Finance",
  "Communication",
  "Computers",
  "Entrepreneurship",
  "Environment",
  "Leadership",
  "Digital Marketing",
  "Law",
  "SEL",
];

const CreateBlog = () => {
  const navigate = useNavigate();
  const { createBlog } = useBlog();
  const { role } = useAuth();
  const [formData, setFormData] = useState({
    title: "",
    module: "Finance",
    metaDescription: "",
    introduction: "",
    readTime: "",
    tableOfContents: [],
  });
  const [currentTOCItem, setCurrentTOCItem] = useState({
    heading: "",
    explanation: [""],
    reflection: "",
  });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [linkData, setLinkData] = useState({
    url: "",
    text: "",
    inputIndex: null,
    explanationIndex: null
  });
  const linkInputRef = useRef(null);

  const handleAddTOC = () => {
    const { heading, explanation, reflection } = currentTOCItem;
    const hasAnyField =
      heading.trim() !== "" ||
      reflection.trim() !== "" ||
      explanation.some((e) => e.trim() !== "");

    if (hasAnyField) {
      setFormData((prev) => ({
        ...prev,
        tableOfContents: [...prev.tableOfContents, currentTOCItem],
      }));
      setCurrentTOCItem({
        heading: "",
        explanation: [""],
        reflection: "",
      });
    } else {
      toast.error("Please fill at least one TOC field before adding.");
    }
  };

  const isFormValid = () => {
    const { title, module, metaDescription, introduction, readTime } = formData;
    return (
      title &&
      module &&
      metaDescription &&
      introduction &&
      readTime &&
      file
    );
  };

  const resetForm = () => {
    setFormData({
      title: "",
      module: "Finance",
      metaDescription: "",
      introduction: "",
      readTime: "",
      tableOfContents: [],
    });

    setCurrentTOCItem({
      heading: "",
      explanation: [""],
      reflection: "",
    });

    setFile(null);
  };

  const checkForLinks = (text, index, explanationIndex = null) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const match = text.match(urlRegex);
    
    if (match) {
      const url = match[0];
      setLinkData({
        url,
        text: '',
        inputIndex: index,
        explanationIndex
      });
      setShowLinkModal(true);
      return true;
    }
    return false;
  };

  const handleLinkSubmit = () => {
    const { url, text, inputIndex, explanationIndex } = linkData;
    // Instead of HTML, store an object with link data
    const linkObj = {
      type: 'link',
      url: url,
      text: text || url
    };
    
    if (inputIndex === 'heading') {
      const newHeading = currentTOCItem.heading.replace(url, `[LINK:${JSON.stringify(linkObj)}]`);
      setCurrentTOCItem(prev => ({ ...prev, heading: newHeading }));
    } else if (inputIndex === 'reflection') {
      const newReflection = currentTOCItem.reflection.replace(url, `[LINK:${JSON.stringify(linkObj)}]`);
      setCurrentTOCItem(prev => ({ ...prev, reflection: newReflection }));
    } else if (explanationIndex !== null) {
      const newExplanations = [...currentTOCItem.explanation];
      newExplanations[explanationIndex] = newExplanations[explanationIndex].replace(url, `[LINK:${JSON.stringify(linkObj)}]`);
      setCurrentTOCItem(prev => ({ ...prev, explanation: newExplanations }));
    }
    
    setShowLinkModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid()) {
      toast.error("Please fill all fields and upload an image.");
      return;
    }

    setLoading(true);

    // Process links before submitting
    const processedFormData = { ...formData };
    
    // Process links in table of contents
    if (processedFormData.tableOfContents && processedFormData.tableOfContents.length > 0) {
      processedFormData.tableOfContents = processedFormData.tableOfContents.map(item => {
        const processedItem = { ...item };
        
        // Process heading
        if (processedItem.heading) {
          const linkRegex = /\[LINK:(.*?)\]/g;
          let match;
          while ((match = linkRegex.exec(processedItem.heading)) !== null) {
            try {
              const linkObj = JSON.parse(match[1]);
              processedItem.heading = processedItem.heading.replace(
                match[0], 
                `<a href="${linkObj.url}" target="_blank" rel="noopener noreferrer">${linkObj.text}</a>`
              );
            } catch (e) {
              console.error('Error processing link in heading:', e);
            }
          }
        }
        
        // Process explanations
        if (processedItem.explanation && processedItem.explanation.length > 0) {
          processedItem.explanation = processedItem.explanation.map(exp => {
            if (!exp) return exp;
            const linkRegex = /\[LINK:(.*?)\]/g;
            let processedExp = exp;
            let match;
            while ((match = linkRegex.exec(exp)) !== null) {
              try {
                const linkObj = JSON.parse(match[1]);
                processedExp = processedExp.replace(
                  match[0], 
                  `<a href="${linkObj.url}" target="_blank" rel="noopener noreferrer">${linkObj.text}</a>`
                );
              } catch (e) {
                console.error('Error processing link in explanation:', e);
              }
            }
            return processedExp;
          });
        }
        
        // Process reflection
        if (processedItem.reflection) {
          const linkRegex = /\[LINK:(.*?)\]/g;
          let match;
          while ((match = linkRegex.exec(processedItem.reflection)) !== null) {
            try {
              const linkObj = JSON.parse(match[1]);
              processedItem.reflection = processedItem.reflection.replace(
                match[0], 
                `<a href="${linkObj.url}" target="_blank" rel="noopener noreferrer">${linkObj.text}</a>`
              );
            } catch (e) {
              console.error('Error processing link in reflection:', e);
            }
          }
        }
        
        return processedItem;
      });
    }

    const data = new FormData();
    Object.entries(processedFormData).forEach(([key, value]) => {
      if (key === "tableOfContents") {
        data.append(key, JSON.stringify(value));
      } else {
        data.append(key, value);
      }
    });
    data.append("image", file);

    try {
      await createBlog(data);
      toast.success("Blog created successfully!");
      resetForm();
    } catch (err) {
      toast.error("Error creating blog.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (role && role !== "admin") {
      navigate("/blogs");
    }
  }, [role, navigate]);

  // Focus input field when modal opens
  useEffect(() => {
    if (showLinkModal && linkInputRef.current) {
      setTimeout(() => {
        linkInputRef.current.focus();
      }, 100);
    }
  }, [showLinkModal]);

  // Add this function to preview links in the current TOC item
  const previewCurrentTOC = () => {
    const { heading, explanation, reflection } = currentTOCItem;
    
    // Create a preview div that shows how links will appear
    if (heading.includes('[LINK:') || 
        explanation.some(e => e.includes('[LINK:')) || 
        reflection.includes('[LINK:')) {
      
      return (
        <div className="mt-3 p-3 border border-dashed border-blue-300 bg-blue-50 rounded">
          <p className="text-sm text-blue-800 mb-2">Preview:</p>
          
          {heading && (
            <div className="mb-2">
              <strong dangerouslySetInnerHTML={{ __html: formatTextForPreview(heading) }}></strong>
            </div>
          )}
          
          {explanation.some(e => e.trim() !== "") && (
            <ul className="list-decimal pl-4 mb-2">
              {explanation.filter(e => e.trim() !== "").map((e, idx) => (
                <li key={idx} dangerouslySetInnerHTML={{ __html: formatTextForPreview(e) }}></li>
              ))}
            </ul>
          )}
          
          {reflection.trim() !== "" && (
            <div>
              <em>Reflection: <span dangerouslySetInnerHTML={{ __html: formatTextForPreview(reflection) }}></span></em>
            </div>
          )}
        </div>
      );
    }
    
    return null;
  };

  if (!role || role !== "admin") return null;


  return (
    <div className="max-w-4xl mx-auto mt-10 shadow-lg p-6 rounded bg-white border border-gray-800">
      <h1 className="text-2xl font-bold mb-6">Create a New Blog</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, title: e.target.value }))
            }
            className="w-full p-3 border border-gray-800 rounded shadow-sm"
          />
        </div>

        <div>
          <label className="block font-medium">Module</label>
          <select
            value={formData.module}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, module: e.target.value }))
            }
            className="w-full p-2 border border-gray-800 rounded shadow-sm"
          >
            {modules.map((mod) => (
              <option key={mod} value={mod}>
                {mod}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-medium">Introduction</label>
          <textarea
            rows="2"
            value={formData.introduction}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, introduction: e.target.value }))
            }
            className="w-full p-2 border border-gray-800 rounded shadow-sm"
          />
        </div>

        <div>
          <label className="block font-medium">Meta Description</label>
          <textarea
            rows="2"
            value={formData.metaDescription}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                metaDescription: e.target.value,
              }))
            }
            className="w-full p-2 border border-gray-800 rounded shadow-sm"
          />
        </div>

        <div>
          <label className="block font-medium">Table of Contents</label>

          <div className="space-y-2 border p-4 rounded border-gray-300 bg-gray-50">
            <input
              type="text"
              placeholder="Heading"
              value={currentTOCItem.heading}
              onChange={(e) => {
                const newValue = e.target.value;
                setCurrentTOCItem((prev) => ({ ...prev, heading: newValue }));
                if (newValue.endsWith(" ")) {
                  checkForLinks(newValue, 'heading');
                }
              }}
              className="w-full p-2 border border-gray-800 rounded"
            />

            {currentTOCItem.explanation.map((exp, idx) => (
              <div key={idx} className="flex gap-2">
                <input
                  type="text"
                  placeholder={`Explanation ${idx + 1}`}
                  value={exp}
                  onChange={(e) => {
                    const newValue = e.target.value;
                    const updated = [...currentTOCItem.explanation];
                    updated[idx] = newValue;
                    setCurrentTOCItem((prev) => ({ ...prev, explanation: updated }));
                    if (newValue.endsWith(" ")) {
                      checkForLinks(newValue, idx, idx);
                    }
                  }}
                  className="flex-1 p-2 border border-gray-800 rounded"
                />
                <button
                  type="button"
                  onClick={() => {
                    const updated = currentTOCItem.explanation.filter((_, i) => i !== idx);
                    setCurrentTOCItem((prev) => ({ ...prev, explanation: updated }));
                  }}
                  className="text-red-600 text-sm"
                >
                  ❌
                </button>
              </div>
            ))}


            <button
              type="button"
              className="text-sm text-blue-600 underline"
              onClick={() =>
                setCurrentTOCItem((prev) => ({
                  ...prev,
                  explanation: [...prev.explanation, ""],
                }))
              }
            >
              + Add Explanation
            </button>

            <textarea
              rows="2"
              placeholder="Reflection"
              value={currentTOCItem.reflection}
              onChange={(e) => {
                const newValue = e.target.value;
                setCurrentTOCItem((prev) => ({
                  ...prev,
                  reflection: newValue,
                }));
                if (newValue.endsWith(" ")) {
                  checkForLinks(newValue, 'reflection');
                }
              }}
              className="w-full p-2 border border-gray-800 rounded"
            />

            <button
              type="button"
              onClick={handleAddTOC}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Add TOC Entry
            </button>
            
            {/* Show preview of current TOC item with formatted links */}
            {previewCurrentTOC()}
          </div>

          {/* Preview of added TOC */}
          <ul className="mt-3 list-disc pl-5 text-sm space-y-2">
            {formData.tableOfContents.map((item, i) => {
              const headingHtml = formatTextForPreview(item.heading);
              return (
                <li key={i}>
                  {headingHtml ? (
                    <strong dangerouslySetInnerHTML={{ __html: headingHtml }}></strong>
                  ) : null}
                  <ul className="list-decimal pl-4">
                    {item.explanation.filter(e => e.trim() !== "").map((e, j) => {
                      const explanationHtml = formatTextForPreview(e);
                      return (
                        <li key={j} dangerouslySetInnerHTML={{ __html: explanationHtml }}></li>
                      );
                    })}
                  </ul>
                  {item.reflection.trim() !== "" && (
                    <em className="block mt-1">
                      Reflection: <span dangerouslySetInnerHTML={{ __html: formatTextForPreview(item.reflection) }}></span>
                    </em>
                  )}
                </li>
              );
            })}
          </ul>
        </div>


        <div>
          <label className="block font-medium">Read Time (in minutes)</label>
          <input
            type="text"
            value={formData.readTime}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, readTime: e.target.value }))
            }
            className="w-full p-2 border border-gray-800 rounded shadow-sm"
          />
        </div>

        <div>
          <label className="block font-medium">Thumbnail Image</label>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            accept="image/*"
            className="w-full p-2 border border-gray-800 rounded shadow-sm"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`${loading ? "bg-gray-500 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
            } text-white px-6 py-2 rounded`}
        >
          {loading ? "Creating..." : "Submit Blog"}
        </button>
      </form>

      {/* Hyperlink Modal */}
      {showLinkModal && (
        <>
          {/* Overlay with just a backdrop blur, no dark background */}
          <div className="fixed inset-0 backdrop-blur-md bg-transparent z-40"></div>
          
          {/* Modal dialog */}
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full transition-all duration-300 ease-in-out">
              <h3 className="text-lg font-bold mb-4">Add Hyperlink</h3>
              <p className="mb-4">Do you want to add this link?</p>
              <p className="text-blue-600 underline mb-4 break-all">{linkData.url}</p>
              
              <div className="mb-4">
                <label className="block font-medium mb-1">Link Text (optional)</label>
                <input
                  ref={linkInputRef}
                  type="text"
                  value={linkData.text}
                  onChange={(e) => setLinkData(prev => ({ ...prev, text: e.target.value }))}
                  placeholder="Enter display text for the link"
                  className="w-full p-2 border border-gray-800 rounded"
                  autoFocus
                />
              </div>
              
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowLinkModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  onClick={handleLinkSubmit}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Add Link
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CreateBlog;

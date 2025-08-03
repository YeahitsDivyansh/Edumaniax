import { useEffect, useRef, useState } from "react";
import { useNavigate, NavLink, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { ChevronRight } from "lucide-react";
import { useBlog } from "@/contexts/BlogContext";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, logout, role, updateUser } = useAuth();
  const fileInputRef = useRef(null);
  const [avatar, setAvatar] = useState("/dashboardDesign/uploadPic.svg");
  const [selectedSection, setSelectedSection] = useState("profile");
  const [userComments, setUserComments] = useState([]);
  const [editingField, setEditingField] = useState(null);
  const [editValues, setEditValues] = useState({});
  const { getUserComments } = useBlog();

  useEffect(() => {
    const fetchUserComments = async () => {
      if (user?.id) {
        // Use user ID for fetching comments to avoid issues when name changes
        // console.log("Fetching comments for user ID:", user.id);
        try {
          const comments = await getUserComments(user.id, true); // true means use userId
          // console.log("Received comments:", comments);
          setUserComments(Array.isArray(comments) ? comments : []);
        } catch (error) {
          console.log("Failed to fetch user comments:", error);
          setUserComments([]);
        }
      } else if (user?.name && typeof user.name === 'string' && user.name.trim()) {
        // Fallback to name-based fetching for backward compatibility
        // console.log("Fetching comments for user name:", user.name);
        try {
          const comments = await getUserComments(user.name.trim(), false); // false means use name
          // console.log("Received comments:", comments);
          setUserComments(Array.isArray(comments) ? comments : []);
        } catch (error) {
          console.log("Failed to fetch user comments:", error);
          setUserComments([]);
        }
      } else {
        // console.log("No valid user ID or name found:", user);
        setUserComments([]);
      }
    };

    fetchUserComments();
  }, [user?.id, user?.name, getUserComments]);

  // Refresh comments when user returns to the dashboard (page focus)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        if (user?.id) {
          // Use user ID for refreshing comments
          // console.log("Refreshing comments due to page focus for user ID:", user.id);
          getUserComments(user.id, true).then((comments) => {
            // console.log("Refreshed comments:", comments);
            setUserComments(Array.isArray(comments) ? comments : []);
          }).catch((error) => {
            console.log("Failed to refresh comments:", error);
          });
        } else if (user?.name && typeof user.name === 'string' && user.name.trim()) {
          // Fallback to name-based refreshing
          // console.log("Refreshing comments due to page focus for user name:", user.name);
          getUserComments(user.name.trim(), false).then((comments) => {
            // console.log("Refreshed comments:", comments);
            setUserComments(Array.isArray(comments) ? comments : []);
          }).catch((error) => {
            console.log("Failed to refresh comments:", error);
          });
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [user?.id, user?.name, getUserComments]);

  useEffect(() => {
    if (!user && role !== "admin") {
      navigate("/login");
    }
  }, [user, role, navigate]);

  const handleLogout = () => {
    logout(navigate);
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setAvatar(imageUrl);
    }
  };

  const handleCommentClick = (blogId) => {
    try {
      navigate(`/blog/${blogId}`);
    } catch (error) {
      console.error("Navigation failed:", error);
      // Fallback: could show an error message or redirect to all blogs
      navigate('/blogs');
    }
  };

  const handleEditClick = (field) => {
    setEditingField(field);
    setEditValues({
      ...editValues,
      [field]: user[field] || ""
    });
  };

  const handleSaveClick = async (field) => {
    try {
      const value = editValues[field];
      
      // Basic validation
      if (!value || value.toString().trim() === "") {
        alert("Please enter a valid value");
        return;
      }

      // Field-specific validation
      if (field === "age") {
        const age = parseInt(value);
        if (age < 1 || age > 100) {
          alert("Please enter a valid age between 1 and 100");
          return;
        }
      }

      if (field === "phonenumber") {
        // Basic phone number validation (you can make this more sophisticated)
        if (value.length < 10) {
          alert("Please enter a valid phone number");
          return;
        }
      }

      if (field === "name") {
        if (value.trim().length < 2) {
          alert("Name must be at least 2 characters long");
          return;
        }
      }

      // Call the updateUser function from AuthContext
      const result = await updateUser(field, value);
      
      if (result.success) {
        setEditingField(null);
        setEditValues({});
        console.log("Profile updated successfully");
      } else {
        console.error("Update failed:", result.message);
        alert(result.message || "Failed to update. Please try again.");
      }
    } catch (error) {
      console.error("Failed to update field:", error);
      alert("An unexpected error occurred. Please try again.");
    }
  };

  const handleCancelClick = () => {
    setEditingField(null);
    setEditValues({});
  };

  const handleInputChange = (field, value) => {
    setEditValues({
      ...editValues,
      [field]: value
    });
  };

  const handleKeyPress = (e, field) => {
    if (e.key === 'Enter') {
      handleSaveClick(field);
    } else if (e.key === 'Escape') {
      handleCancelClick();
    }
  };

  const formatDateWithSuffix = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("en-GB", { month: "long" });
    const year = date.getFullYear();

    // Determine the suffix
    const suffix =
      day % 10 === 1 && day !== 11
        ? "st"
        : day % 10 === 2 && day !== 12
        ? "nd"
        : day % 10 === 3 && day !== 13
        ? "rd"
        : "th";

    return `${day}${suffix} ${month} ${year}`;
  };

  const iconMap = {
    Male: "/dashboardDesign/male.svg",
    Female: "/dashboardDesign/female.svg",
    Boy: "/dashboardDesign/male.svg", // maps Boy → Male icon
    Girl: "/dashboardDesign/female.svg", // maps Girl → Female icon
    Sporty: "/dashboardDesign/sporty.svg",
    Casual: "/dashboardDesign/casual.svg",
    Formal: "/dashboardDesign/formal.svg",
    Minimalist: "/dashboardDesign/minimalist.svg",
    Creative: "/dashboardDesign/creative.svg",
    Curious: "/dashboardDesign/curious.svg",
    Logical: "/dashboardDesign/logical.svg",
    Playful: "/dashboardDesign/playful.svg",
    SmartThinker: "/dashboardDesign/smartThinker.svg",
    MysterySolver: "/dashboardDesign/mysterySolver.svg",
    Talkative: "/dashboardDesign/talkative.svg",
    Fantasy: "/dashboardDesign/fantasy.svg",
  };

  return (
    <div className="flex min-h-screen font-sans">
      {/* Sidebar */}
      <aside className="w-56 bg-white shadow-lg flex flex-col py-8 px-4">
        <div>
          <Link to="/" className="flex items-center gap-2 mb-10">
            <img
              src="/dashboardDesign/homeImg.svg"
              alt="Logo"
              className="w-15 h-15"
            />
            <h1 className="text-2xl font-bold text-green-600 -mt-1">
              Edumaniax
            </h1>
          </Link>

          <nav className="flex flex-col gap-7 ml-5 text-sm font-medium">
            {/* My Profile Button */}
            <button
              className={`flex items-center gap-3 hover:text-green-700 ${
                selectedSection === "profile"
                  ? "text-green-600"
                  : "text-gray-400"
              }`}
              onClick={() => setSelectedSection("profile")}
            >
              <img
                src="/dashboardDesign/profile.svg"
                alt="Profile"
                className="w-5 h-5"
                style={{
                  filter:
                    selectedSection === "profile"
                      ? "grayscale(0%)"
                      : "grayscale(100%)",
                }}
              />
              <span className="font-bold">My Profile</span>
            </button>

            {/* My Modules Button - Only if NOT Admin */}
            {role !== "admin" && (
              <button
                className={`flex items-center gap-3 hover:text-green-700 ${
                  selectedSection === "modules"
                    ? "text-green-600"
                    : "text-gray-400"
                }`}
                onClick={() => setSelectedSection("modules")}
              >
                <img
                  src={
                    selectedSection === "modules"
                      ? "/dashboardDesign/moduleGreen.svg"
                      : "/dashboardDesign/modules.svg"
                  }
                  alt="Modules"
                  className="w-5 h-5"
                />
                <span className="font-bold">My Modules</span>
              </button>
            )}

            <button
              onClick={handleLogout}
              className="flex items-center gap-3 text-red-500 hover:text-red-600"
            >
              <img
                src="/dashboardDesign/logout.svg"
                alt="Logout"
                className="w-5 h-5"
              />
              Log Out
            </button>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-100 overflow-x-hidden">
        {/* Admin View */}
        {role === "admin" ? (
          <div className="max-w-6xl mx-auto px-6 pt-6">
            <div className="bg-[#068F36] text-5xl font-bold text-center px-10 py-4 rounded-md shadow-sm mb-8">
              <span className="text-white" style={{ opacity: 0.72 }}>
                DASHBOARD
              </span>
            </div>

            <div className="bg-white w-full max-w-6xl rounded-lg shadow-md flex flex-col items-center justify-center p-10">
              <h2 className="text-2xl font-bold text-gray-800">
                You are logged in as Admin
              </h2>
              <p className="text-gray-600 mt-2">
                You have administrative privileges.
              </p>
            </div>
          </div>
        ) : (
          <>
            {/* Conditional Rendering for Modules Section */}
            {selectedSection === "modules" && (
              <div className="flex flex-col items-center w-full px-4 py-6">
                {/* Top Heading Box */}
                <div className="bg-white w-full max-w-6xl rounded-lg shadow-sm px-6 py-4 mb-6">
                  <h2 className="text-3xl font-bold text-gray-900">
                    My Modules
                  </h2>
                </div>

                {/* Empty State Box */}
                <div className="bg-white w-full max-w-6xl rounded-lg shadow-md flex flex-col items-center justify-center p-10">
                  <img
                    src="/blogDesign/notfound.svg"
                    alt="No Modules"
                    className="w-64 h-auto mb-6"
                  />
                  <h3 className="text-xl font-bold text-gray-800 -mt-18">
                    No Modules Available
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm mt-2">
                    Upgrade your plan to learn via modules
                  </p>
                  <Link
                    to="/pricing"
                    className="bg-[#068F36] hover:bg-green-700 text-white px-5 py-2 rounded-lg inline-block text-center"
                  >
                    Upgrade Now
                  </Link>
                </div>
              </div>
            )}

            {selectedSection === "profile" && (
              <div className="max-w-6xl mx-auto px-6 pt-6">
                {/* DASHBOARD HEADER */}
                <div className="bg-[#068F36] text-5xl font-bold text-center px-10 py-4 rounded-md shadow-sm mb-8">
                  <span className="text-white" style={{ opacity: 0.72 }}>
                    DASHBOARD
                  </span>
                </div>

                {/* PROFILE + CHARACTER */}
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-8 mb-10">
                  {/* LEFT COLUMN (Profile + Comments) */}
                  <div className="flex flex-col gap-6 max-w-[480px]">
                    {/* Profile Card */}
                    <div className="bg-white rounded-xl shadow-md p-6 relative">
                      {/* Avatar */}
                      <div className="flex flex-col items-center relative -mt-12">
                        <img
                          src={avatar}
                          alt="Profile Avatar"
                          className="w-24 h-24 rounded-full"
                        />

                        {/* Hidden File Input */}
                        <input
                          type="file"
                          ref={fileInputRef}
                          accept="image/*"
                          className="hidden"
                          onChange={handleFileChange}
                        />

                        {/* Upload Button */}
                        <button
                          onClick={handleUploadClick}
                          className="absolute mt-17 ml-30 transform translate-y-1/2 bg-[#068F36] text-white text-xs px-4 py-1 rounded shadow hover:bg-green-700"
                        >
                          Upload Photo
                        </button>
                      </div>

                      {/* Profile Info */}
                      <div className="grid grid-cols-2 gap-4 text-sm mt-6">
                        {/* Left Section: Name, Class, Age */}
                        <div className="border rounded-lg p-4 flex flex-col gap-4">
                          <div className="flex justify-between items-center">
                            <div className="flex-1">
                              <p className="text-gray-500 text-xs">Your Name</p>
                              {editingField === "name" ? (
                                <div className="relative">
                                  <input
                                    type="text"
                                    value={editValues.name || ""}
                                    onChange={(e) => handleInputChange("name", e.target.value)}
                                    onKeyDown={(e) => handleKeyPress(e, "name")}
                                    className="font-semibold bg-white border border-gray-300 rounded px-2 py-1 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 w-full"
                                    autoFocus
                                    placeholder="Enter your name"
                                  />
                                  <div className="absolute right-1 top-1/2 transform -translate-y-1/2 flex gap-1">
                                    <button 
                                      onClick={() => handleSaveClick("name")}
                                      className="bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center hover:bg-green-600 text-xs"
                                      title="Save"
                                    >
                                      ✓
                                    </button>
                                    <button 
                                      onClick={handleCancelClick}
                                      className="bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center hover:bg-red-600 text-xs"
                                      title="Cancel"
                                    >
                                      ✕
                                    </button>
                                  </div>
                                </div>
                              ) : (
                                <p className="font-semibold">{user.name}</p>
                              )}
                            </div>
                            {editingField !== "name" && (
                              <button 
                                onClick={() => handleEditClick("name")}
                                className="bg-[#F0EFFA] text-gray-600 text-xs px-3 py-1 rounded-lg hover:bg-gray-200 ml-2"
                              >
                                Edit
                              </button>
                            )}
                          </div>

                          <div className="flex justify-between items-center">
                            <div className="flex-1">
                              <p className="text-gray-500 text-xs">Class</p>
                              {editingField === "userClass" ? (
                                <div className="relative">
                                  <input
                                    type="text"
                                    value={editValues.userClass || ""}
                                    onChange={(e) => handleInputChange("userClass", e.target.value)}
                                    onKeyDown={(e) => handleKeyPress(e, "userClass")}
                                    className="font-semibold bg-white border border-gray-300 rounded px-2 py-1 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 w-full"
                                    autoFocus
                                  />
                                  <div className="absolute right-1 top-1/2 transform -translate-y-1/2 flex gap-1">
                                    <button 
                                      onClick={() => handleSaveClick("userClass")}
                                      className="bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center hover:bg-green-600 text-xs"
                                      title="Save"
                                    >
                                      ✓
                                    </button>
                                    <button 
                                      onClick={handleCancelClick}
                                      className="bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center hover:bg-red-600 text-xs"
                                      title="Cancel"
                                    >
                                      ✕
                                    </button>
                                  </div>
                                </div>
                              ) : (
                                <p className="font-semibold">{user.userClass}</p>
                              )}
                            </div>
                            {editingField !== "userClass" && (
                              <button 
                                onClick={() => handleEditClick("userClass")}
                                className="bg-[#F0EFFA] text-gray-600 text-xs px-3 py-1 rounded-lg hover:bg-gray-200 ml-2"
                              >
                                Edit
                              </button>
                            )}
                          </div>

                          <div className="flex justify-between items-center">
                            <div className="flex-1">
                              <p className="text-gray-500 text-xs">Age</p>
                              {editingField === "age" ? (
                                <div className="relative">
                                  <input
                                    type="number"
                                    value={editValues.age || ""}
                                    onChange={(e) => handleInputChange("age", e.target.value)}
                                    onKeyDown={(e) => handleKeyPress(e, "age")}
                                    className="font-semibold bg-white border border-gray-300 rounded px-2 py-1 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 w-full"
                                    autoFocus
                                    min="1"
                                    max="100"
                                  />
                                  <div className="absolute right-1 top-1/2 transform -translate-y-1/2 flex gap-1">
                                    <button 
                                      onClick={() => handleSaveClick("age")}
                                      className="bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center hover:bg-green-600 text-xs"
                                      title="Save"
                                    >
                                      ✓
                                    </button>
                                    <button 
                                      onClick={handleCancelClick}
                                      className="bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center hover:bg-red-600 text-xs"
                                      title="Cancel"
                                    >
                                      ✕
                                    </button>
                                  </div>
                                </div>
                              ) : (
                                <p className="font-semibold">{user.age} Yrs.</p>
                              )}
                            </div>
                            {editingField !== "age" && (
                              <button 
                                onClick={() => handleEditClick("age")}
                                className="bg-[#F0EFFA] text-gray-600 text-xs px-3 py-1 rounded-lg hover:bg-gray-200 ml-2"
                              >
                                Edit
                              </button>
                            )}
                          </div>
                        </div>

                        {/* Right Section: Phone, Email, Account Created On */}
                        <div className="border rounded-lg p-4 flex flex-col gap-4">
                          <div className="flex justify-between items-center">
                            <div className="flex-1">
                              <p className="text-gray-500 text-xs">
                                Phone Number
                              </p>
                              {editingField === "phonenumber" ? (
                                <div className="relative">
                                  <input
                                    type="tel"
                                    value={editValues.phonenumber || ""}
                                    onChange={(e) => handleInputChange("phonenumber", e.target.value)}
                                    onKeyDown={(e) => handleKeyPress(e, "phonenumber")}
                                    className="font-semibold bg-white border border-gray-300 rounded px-2 py-1 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 w-full"
                                    autoFocus
                                    placeholder="Enter phone number"
                                  />
                                  <div className="absolute right-1 top-1/2 transform -translate-y-1/2 flex gap-1">
                                    <button 
                                      onClick={() => handleSaveClick("phonenumber")}
                                      className="bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center hover:bg-green-600 text-xs"
                                      title="Save"
                                    >
                                      ✓
                                    </button>
                                    <button 
                                      onClick={handleCancelClick}
                                      className="bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center hover:bg-red-600 text-xs"
                                      title="Cancel"
                                    >
                                      ✕
                                    </button>
                                  </div>
                                </div>
                              ) : (
                                <p className="font-semibold">
                                  {user.phonenumber}
                                </p>
                              )}
                            </div>
                            {editingField !== "phonenumber" && (
                              <button 
                                onClick={() => handleEditClick("phonenumber")}
                                className="bg-[#F0EFFA] text-gray-600 text-xs px-3 py-1 rounded-lg hover:bg-gray-200 ml-2"
                              >
                                Edit
                              </button>
                            )}
                          </div>

                          <div className="flex justify-between items-center">
                            <div className="flex-1 min-w-0">
                              <p className="text-gray-500 text-xs">Email ID</p>
                              {editingField === "email" ? (
                                <div className="relative">
                                  <input
                                    type="email"
                                    value={editValues.email || ""}
                                    onChange={(e) => handleInputChange("email", e.target.value)}
                                    onKeyDown={(e) => handleKeyPress(e, "email")}
                                    className="font-semibold bg-white border border-gray-300 rounded px-2 py-1 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 w-full"
                                    autoFocus
                                    placeholder="Enter email address"
                                  />
                                  <div className="absolute right-1 top-1/2 transform -translate-y-1/2 flex gap-1">
                                    <button 
                                      onClick={() => handleSaveClick("email")}
                                      className="bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center hover:bg-green-600 text-xs"
                                      title="Save"
                                    >
                                      ✓
                                    </button>
                                    <button 
                                      onClick={handleCancelClick}
                                      className="bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center hover:bg-red-600 text-xs"
                                      title="Cancel"
                                    >
                                      ✕
                                    </button>
                                  </div>
                                </div>
                              ) : (
                                <div className="relative group">
                                  <p className="font-semibold truncate">
                                    {user.email || "Not set"}
                                  </p>
                                  {user.email && user.email.length > 20 && (
                                    <div className="hidden group-hover:block absolute z-10 bg-gray-800 text-white text-xs rounded p-2 mt-1 whitespace-nowrap">
                                      {user.email}
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                            {editingField !== "email" && (
                              <button 
                                onClick={() => handleEditClick("email")}
                                className={`${user.email ? "bg-[#F0EFFA] text-gray-600 hover:bg-gray-200" : "bg-[#068F36] text-white hover:bg-green-700"} text-xs px-3 py-1 rounded-lg ml-2 flex-shrink-0`}
                              >
                                {user.email ? "Edit" : "Add Now"}
                              </button>
                            )}
                          </div>

                          <div>
                            <p className="text-gray-500 text-xs">
                              Account Created On
                            </p>
                            <p className="font-semibold">
                              {formatDateWithSuffix(user.createdAt)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Comments Section */}
                    <div className="bg-white rounded-xl shadow-md p-5">
                      <div className="mb-3">
                        <h4 className="text-lg font-semibold text-gray-800">
                          Comments Written
                        </h4>
                      </div>
                      <div className="max-h-64 overflow-y-auto">
                        <div className="flex flex-wrap gap-3">
                          {userComments.length === 0 ? (
                            <div className="text-sm text-gray-500">
                              <p>No comments written yet.</p>
                            </div>
                          ) : (
                            userComments.map((item, index) => (
                              <div
                                key={index}
                                onClick={() => handleCommentClick(item.blogId)}
                                className="bg-white border border-gray-200 px-4 py-3 rounded-lg shadow-sm flex-1 cursor-pointer hover:shadow-md transition"
                              >
                                <h5 className="text-sm font-semibold mb-1 text-blue-800">
                                  {item.blogTitle}
                                </h5>
                                <p className="text-sm text-gray-600 line-clamp-3">
                                  {item.comment}
                                </p>
                                <p className="text-xs text-gray-400 mt-1">
                                  {new Date(item.date).toLocaleDateString()}
                                </p>
                              </div>
                            ))
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* RIGHT COLUMN (Character Card) */}
                  <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-start w-full min-h-[430px]">
                    {/* Header */}
                    <div className="w-full -ml-3">
                      <h3 className="text-lg font-semibold text-gray-800 mb-1 text-left ml-4">
                        Your Character
                      </h3>
                      <p className="text-2xl font-bold text-gray-900 mb-4 text-left ml-4">
                        {user.characterName}
                      </p>
                    </div>

                    {/* Character Traits + Info */}
                    <div className="w-full flex flex-col lg:flex-row gap-6">
                      {/* Left Grid (Traits & Info) */}
                      <div className="grid grid-cols-2 gap-4 flex-1">
                        {/* Gender */}
                        <div className="flex items-center gap-3 border rounded-lg p-3 bg-white shadow-sm">
                          <img
                            src={iconMap[user.characterGender]}
                            alt={user.characterGender}
                            className="w-[2.2rem] h-[1.8rem] flex-shrink-0"
                          />
                          <div className="overflow-hidden">
                            <p className="text-xs text-gray-500">Gender</p>
                            <p className="font-semibold">
                              {user.characterGender}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 border rounded-lg p-3 bg-white shadow-sm">
                          <img
                            src={iconMap[user.characterStyle]}
                            alt={user.characterStyle}
                            className="w-[3.5rem] h-[3rem] flex-shrink-0"
                          />
                          <div className="overflow-hidden">
                            <p className="text-xs text-gray-500">Style</p>
                            <p className="font-semibold">
                              {user.characterStyle}
                            </p>
                          </div>
                        </div>

                        {/* Traits */}
                        {user.characterTraits.map((trait, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-3 border rounded-lg p-3 bg-white shadow-sm"
                          >
                            <img
                              src={iconMap[trait]}
                              alt={trait}
                              className="w-[3rem] h-[2.5rem] flex-shrink-0"
                            />
                            <div className="overflow-hidden">
                              <p className="text-xs text-gray-500">
                                Trait {index + 1}
                              </p>
                              <p className="font-semibold">{trait}</p>
                            </div>
                          </div>
                        ))}

                        {/* Fact Section */}
                        <div className="bg-gray-50 rounded-lg p-4 mt-6 text-left col-span-2">
                          <p className="text-xs text-gray-400 mb-1">Fact</p>
                          <p className="text-sm text-gray-700 leading-relaxed">
                            Meet <strong>“{user.characterName}”</strong> who is{" "}
                            {user.characterTraits.map((trait, index) => {
                              const percentages = [40, 30, 20, 10];
                              const isLast =
                                index === user.characterTraits.length - 1;
                              return (
                                <span key={trait}>
                                  {percentages[index]}% {trait.toLowerCase()}
                                  {!isLast ? ", " : ""}
                                </span>
                              );
                            })}
                          </p>
                        </div>

                        {/* Button */}
                        <Link
                          to="/courses"
                          className="bg-[#068F36] col-span-2 mt-4 text-white px-5 font-semibold py-2 rounded-lg hover:bg-green-700 flex justify-center items-center gap-2 w-full text-center"
                        >
                          Start Exploration Now
                          <ChevronRight className="mt-1" size={18} />
                        </Link>
                      </div>

                      {/* Right: Character Image */}
                      <div className="w-full h-[250px] lg:w-44 flex items-center justify-center mt-6 lg:mt-0">
                        <img
                          src="/dashboardDesign/boy.svg"
                          alt="Character"
                          className="object-contain w-full h-72"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default Dashboard;

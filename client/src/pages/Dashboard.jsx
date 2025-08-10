import { useEffect, useRef, useState } from "react";
import { useNavigate, NavLink, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { ChevronRight } from "lucide-react";
import { useBlog } from "@/contexts/BlogContext";
import { useAccessControl } from "../utils/accessControl";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, logout, role, updateUser } = useAuth();
  const fileInputRef = useRef(null);
  const [avatar, setAvatar] = useState("/dashboardDesign/uploadPic.svg");
  const [selectedSection, setSelectedSection] = useState("profile");
  const [userComments, setUserComments] = useState([]);
  const [editingField, setEditingField] = useState(null);
  const [editValues, setEditValues] = useState({});
  const [subscriptions, setSubscriptions] = useState([]);
  const [payments, setPayments] = useState([]);
  const [loadingSubscriptions, setLoadingSubscriptions] = useState(false);
  const [loadingPayments, setLoadingPayments] = useState(false);
  const [userSubscription, setUserSubscription] = useState(null);
  const [selectedModule, setSelectedModule] = useState(null);
  const { getUserComments } = useBlog();
  const { accessStatus, hasModuleAccess } = useAccessControl(subscriptions, selectedModule);

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

  // Fetch user subscription and payment data
  useEffect(() => {
    const fetchUserSubscriptionData = async () => {
      if (!user?.id) return;

      try {
        setLoadingSubscriptions(true);
        setLoadingPayments(true);

        // Fetch user subscriptions
        const subscriptionResponse = await fetch(
          `${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/payment/subscriptions/${user.id}`
        );
        
        if (subscriptionResponse.ok) {
          const subscriptionData = await subscriptionResponse.json();
          setSubscriptions(Array.isArray(subscriptionData) ? subscriptionData : []);
          
          // Find the highest active and valid subscription
          const activeSubscriptions = Array.isArray(subscriptionData) 
            ? subscriptionData.filter(sub => 
                sub.status === 'ACTIVE' && new Date(sub.endDate) > new Date()
              )
            : [];
          
          // Define plan hierarchy to find the highest plan
          const planHierarchy = ['STARTER', 'SOLO', 'PRO', 'INSTITUTIONAL'];
          
          let highestActiveSubscription = null;
          
          // Find the highest tier among active and valid subscriptions
          for (const plan of planHierarchy.reverse()) {
            const subscription = activeSubscriptions.find(sub => sub.planType === plan);
            if (subscription) {
              highestActiveSubscription = subscription;
              break;
            }
          }
          
          if (highestActiveSubscription) {
            // Parse notes to get selectedModule if it exists
            let selectedModuleFromSub = null;
            if (highestActiveSubscription.notes) {
              try {
                const parsedNotes = JSON.parse(highestActiveSubscription.notes);
                const rawModule = parsedNotes.selectedModule;
                
                // Map the display name to the correct module key
                const moduleMapping = {
                  // Full display names from UI
                  'Finance Management': 'finance',
                  'Digital Marketing': 'digital-marketing',
                  'Communication Skills': 'communication',
                  'Computer Science': 'computers',
                  'Entrepreneurship': 'entrepreneurship',
                  'Environmental Science': 'environment',
                  'Legal Awareness': 'law',
                  'Leadership Skills': 'leadership',
                  'Social Emotional Learning': 'sel',
                  
                  // Short names (legacy support)
                  'Leadership': 'leadership',
                  'Finance': 'finance',
                  'Communication': 'communication',
                  
                  // Course-specific names from screenshots
                  'Fundamentals of Finance': 'finance',
                  'Fundamentals of Law': 'law',
                  'Communication Mastery': 'communication',
                  'Entrepreneurship Bootcamp': 'entrepreneurship',
                  'Digital Marketing Pro': 'digital-marketing',
                  'Leadership & Adaptability': 'leadership',
                  'Environmental Sustainability': 'environment'
                };
                
                selectedModuleFromSub = moduleMapping[rawModule] || rawModule?.toLowerCase();
              } catch {
                // If notes is not JSON, treat as plain text and map it
                const moduleMapping = {
                  // Full display names from UI
                  'Finance Management': 'finance',
                  'Digital Marketing': 'digital-marketing',
                  'Communication Skills': 'communication',
                  'Computer Science': 'computers',
                  'Entrepreneurship': 'entrepreneurship',
                  'Environmental Science': 'environment',
                  'Legal Awareness': 'law',
                  'Leadership Skills': 'leadership',
                  'Social Emotional Learning': 'sel',
                  
                  // Short names (legacy support)
                  'Leadership': 'leadership',
                  'Finance': 'finance',
                  'Communication': 'communication',
                  
                  // Course-specific names from screenshots
                  'Fundamentals of Finance': 'finance',
                  'Fundamentals of Law': 'law',
                  'Communication Mastery': 'communication',
                  'Entrepreneurship Bootcamp': 'entrepreneurship',
                  'Digital Marketing Pro': 'digital-marketing',
                  'Leadership & Adaptability': 'leadership',
                  'Environmental Sustainability': 'environment'
                };
                
                selectedModuleFromSub = moduleMapping[highestActiveSubscription.notes] || highestActiveSubscription.notes?.toLowerCase();
              }
            }
            
            setSelectedModule(selectedModuleFromSub);
            setUserSubscription({
              plan: highestActiveSubscription.planType,
              status: highestActiveSubscription.status,
              startDate: highestActiveSubscription.startDate,
              endDate: highestActiveSubscription.endDate,
              selectedModule: selectedModuleFromSub
            });
          }
        } else {
          console.log('Failed to fetch subscriptions:', subscriptionResponse.statusText);
          setSubscriptions([]);
        }

        // Fetch user payments
        const paymentResponse = await fetch(
          `${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/payment/payments/${user.id}`
        );
        
        if (paymentResponse.ok) {
          const paymentData = await paymentResponse.json();
          setPayments(Array.isArray(paymentData) ? paymentData : []);
        } else {
          console.log('Failed to fetch payments:', paymentResponse.statusText);
          setPayments([]);
        }

      } catch (error) {
        console.error('Error fetching subscription/payment data:', error);
        setSubscriptions([]);
        setPayments([]);
      } finally {
        setLoadingSubscriptions(false);
        setLoadingPayments(false);
      }
    };

    fetchUserSubscriptionData();
  }, [user?.id]);

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
    if (!user && role !== "admin" && role !== "ADMIN" && role !== "SALES") {
      navigate("/login");
    }
    
    // If user is a sales team member, update the page title
    if (role === "SALES") {
      document.title = "Sales Team Dashboard | Edumaniax";
    } else if (role === "admin" || role === "ADMIN") {
      document.title = "Admin Dashboard | Edumaniax";
    } else {
      document.title = "User Dashboard | Edumaniax";
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
            {role !== "admin" && role !== "ADMIN" && role !== "SALES" && (
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
            
            {/* Sales Dashboard Link - Only for SALES role */}
            {(role === "SALES") && (
              <Link
                to="/sales/dashboard"
                className="flex items-center gap-3 text-blue-500 hover:text-blue-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <span className="font-bold">Sales Dashboard</span>
              </Link>
            )}

            {/* My Subscriptions Button - Only if NOT Admin */}
            {role !== "admin" && (
              <button
                className={`flex items-center gap-3 hover:text-green-700 ${
                  selectedSection === "subscriptions"
                    ? "text-green-600"
                    : "text-gray-400"
                }`}
                onClick={() => setSelectedSection("subscriptions")}
              >
                <img
                  src="/dashboardDesign/profile.svg"
                  alt="Subscriptions"
                  className="w-5 h-5"
                  style={{
                    filter:
                      selectedSection === "subscriptions"
                        ? "grayscale(0%)"
                        : "grayscale(100%)",
                  }}
                />
                <span className="font-bold">My Subscriptions</span>
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

                {/* Modules Grid */}
                <div className="bg-white w-full max-w-6xl rounded-lg shadow-md p-6">
                  {accessStatus?.subscription ? (
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-4">
                        Available Modules ({accessStatus.subscription.plan.toUpperCase()} Plan)
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {[
                          { key: 'finance', name: 'Finance Management' },
                          { key: 'digital-marketing', name: 'Digital Marketing' },
                          { key: 'communication', name: 'Communication Skills' },
                          { key: 'computers', name: 'Computer Science' },
                          { key: 'entrepreneurship', name: 'Entrepreneurship' },
                          { key: 'environment', name: 'Environmental Science' },
                          { key: 'law', name: 'Legal Awareness' },
                          { key: 'leadership', name: 'Leadership Skills' },
                          { key: 'sel', name: 'Social Emotional Learning' }
                        ].map((module) => {
                          const hasAccess = hasModuleAccess(module.key);
                          return (
                            <div
                              key={module.key}
                              className={`border rounded-lg p-4 transition-all duration-200 ${
                                hasAccess
                                  ? 'border-green-200 bg-green-50 hover:shadow-md cursor-pointer'
                                  : 'border-gray-200 bg-gray-50'
                              }`}
                            >
                              <div className="flex items-center justify-between mb-3">
                                <h4 className="font-semibold text-gray-800">{module.name}</h4>
                                <span
                                  className={`w-4 h-4 rounded-full ${
                                    hasAccess ? 'bg-green-500' : 'bg-gray-400'
                                  }`}
                                />
                              </div>
                              <p className={`text-sm mb-3 ${hasAccess ? 'text-green-600' : 'text-gray-500'}`}>
                                {hasAccess ? 'Ready to Learn' : 'Premium Required'}
                              </p>
                              {hasAccess && (
                                <Link
                                  to={`/courses?module=${module.toLowerCase().replace(' ', '-')}`}
                                  className="bg-[#068F36] hover:bg-green-700 text-white px-3 py-1 rounded text-sm inline-block"
                                >
                                  Start Learning
                                </Link>
                              )}
                            </div>
                          );
                        })}
                      </div>

                      {/* Special message for SOLO plan */}
                      {accessStatus.subscription.plan === 'SOLO' && accessStatus.subscription.selectedModule && (
                        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                          <h4 className="font-semibold text-blue-800 mb-2">Your Selected Module</h4>
                          <p className="text-blue-600 text-sm">
                            With your SOLO plan, you have access to: <strong>{accessStatus.subscription.selectedModule}</strong>
                          </p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center p-10">
                      <img
                        src="/blogDesign/notfound.svg"
                        alt="No Modules"
                        className="w-64 h-auto mb-6"
                      />
                      <h3 className="text-xl font-bold text-gray-800 -mt-18">
                        No Premium Modules Available
                      </h3>
                      <p className="text-gray-600 mb-4 text-sm mt-2">
                        Upgrade your plan to unlock premium learning modules
                      </p>
                      <Link
                        to="/pricing"
                        className="bg-[#068F36] hover:bg-green-700 text-white px-5 py-2 rounded-lg inline-block text-center"
                      >
                        View Pricing Plans
                      </Link>
                    </div>
                  )}
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

                {/* ROLE INFO BANNER - Only visible for ADMIN and SALES roles */}
                {(role === "admin" || role === "ADMIN" || role === "SALES") && (
                  <div className={`mb-6 p-4 rounded-lg shadow-md ${role === "admin" || role === "ADMIN" ? "bg-purple-100 border-l-4 border-purple-500" : "bg-blue-100 border-l-4 border-blue-500"}`}>
                    <div className="flex items-center">
                      <div className={`p-2 rounded-full ${role === "admin" || role === "ADMIN" ? "bg-purple-200" : "bg-blue-200"} mr-4`}>
                        {role === "admin" || role === "ADMIN" ? (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                          </svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                        )}
                      </div>
                      <div>
                        <h2 className={`text-lg font-semibold ${role === "admin" || role === "ADMIN" ? "text-purple-800" : "text-blue-800"}`}>
                          {role === "admin" || role === "ADMIN" ? "Administrator Account" : "Sales Team Account"}
                        </h2>
                        <p className={`text-sm ${role === "admin" || role === "ADMIN" ? "text-purple-600" : "text-blue-600"}`}>
                          {role === "admin" || role === "ADMIN" 
                            ? "You have administrative privileges and can access all system features."
                            : "You have sales team privileges and can access sales dashboard and related features."}
                        </p>
                      </div>
                    </div>
                    <div className="mt-3 flex justify-end">
                      <a 
                        href={role === "admin" || role === "ADMIN" ? "/" : "/sales/dashboard"} 
                        className={`text-sm px-4 py-1 rounded ${role === "admin" || role === "ADMIN" ? "bg-purple-500 hover:bg-purple-600 text-white" : "bg-blue-500 hover:bg-blue-600 text-white"}`}
                      >
                        {role === "admin" || role === "ADMIN" ? "Admin Portal" : "Sales Dashboard"}
                      </a>
                    </div>
                  </div>
                )}

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
                        {user?.characterName}
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
                        {user?.characterTraits && user.characterTraits.map((trait, index) => (
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
                            Meet <strong>“{user?.characterName}”</strong> who is{" "}
                            {user?.characterTraits && user.characterTraits.map((trait, index) => {
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

            {/* Subscriptions Section */}
            {selectedSection === "subscriptions" && (
              <div className="max-w-6xl mx-auto px-6 pt-6">
                {/* DASHBOARD HEADER */}
                <div className="bg-[#068F36] text-5xl font-bold text-center px-10 py-4 rounded-md shadow-sm mb-8">
                  <span className="text-white" style={{ opacity: 0.72 }}>
                    MY SUBSCRIPTIONS
                  </span>
                </div>

                {/* Current Plan Section */}
                <div className="bg-white rounded-xl shadow-md p-6 mb-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">Current Plan</h3>
                  {loadingSubscriptions ? (
                    <div className="flex justify-center items-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
                      <span className="ml-2 text-gray-600">Loading subscription data...</span>
                    </div>
                  ) : userSubscription ? (
                    <div className="border border-green-200 rounded-lg p-4 bg-green-50">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="text-xl font-semibold text-green-800">
                            {userSubscription.plan.toUpperCase()} PLAN
                          </h4>
                          <p className="text-gray-600 text-sm">
                            Subscribed on: {new Date(userSubscription.startDate).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            userSubscription.status === 'ACTIVE' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {userSubscription.status}
                          </span>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-500">Valid Until:</p>
                          <p className="font-semibold">
                            {new Date(userSubscription.endDate).toLocaleDateString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-500">Plan Type:</p>
                          <p className="font-semibold">{userSubscription.plan}</p>
                        </div>
                        {userSubscription.selectedModule && (
                          <div className="md:col-span-2">
                            <p className="text-gray-500">Selected Module:</p>
                            <p className="font-semibold">{userSubscription.selectedModule}</p>
                          </div>
                        )}
                      </div>
                      
                      {/* Add upgrade button for STARTER and PRO plans */}
                      {(userSubscription.plan === 'STARTER' || userSubscription.plan === 'PRO') && (
                        <div className="mt-4 pt-4 border-t border-green-200">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm text-gray-600">
                                {userSubscription.plan === 'STARTER' 
                                  ? 'Unlock premium modules and certificates' 
                                  : 'Get institutional features and live sessions'}
                              </p>
                            </div>
                            <button
                              onClick={() => navigate(`/payment?plan=${userSubscription.plan === 'STARTER' ? 'SOLO' : 'INSTITUTIONAL'}`)}
                              className="bg-gradient-to-r from-orange-500 to-red-500 text-white font-medium px-4 py-2 rounded-lg hover:from-orange-600 hover:to-red-600 transition duration-300 text-sm"
                            >
                             Upgrade to {userSubscription.plan === 'STARTER' ? 'SOLO' : 'INSTITUTIONAL'}
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="border border-gray-200 rounded-lg p-6 bg-gray-50 text-center">
                      <p className="text-gray-600 mb-4">You don't have any active subscriptions yet.</p>
                      <Link 
                        to="/courses" 
                        className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
                      >
                        Browse Plans
                      </Link>
                    </div>
                  )}
                </div>

                {/* Accessible Modules Section */}
                <div className="bg-white rounded-xl shadow-md p-6 mb-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">Accessible Modules</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[
                      { name: 'Finance Management', key: 'finance' },
                      { name: 'Digital Marketing', key: 'digital-marketing' },
                      { name: 'Communication Skills', key: 'communication' },
                      { name: 'Computer Science', key: 'computers' },
                      { name: 'Entrepreneurship', key: 'entrepreneurship' },
                      { name: 'Environmental Science', key: 'environment' },
                      { name: 'Legal Awareness', key: 'law' },
                      { name: 'Leadership Skills', key: 'leadership' },
                      { name: 'Social Emotional Learning', key: 'sel' }
                    ].map((module) => {
                      const hasAccess = hasModuleAccess(module.key);
                      return (
                        <div
                          key={module.key}
                          className={`border rounded-lg p-4 ${
                            hasAccess
                              ? 'border-green-200 bg-green-50'
                              : 'border-gray-200 bg-gray-50'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-gray-800">{module.name}</h4>
                            <span
                              className={`w-3 h-3 rounded-full ${
                                hasAccess ? 'bg-green-500' : 'bg-gray-400'
                              }`}
                            />
                          </div>
                          <p className={`text-sm ${hasAccess ? 'text-green-600' : 'text-gray-500'}`}>
                            {hasAccess ? 'Accessible' : 'Premium Required'}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Payment History Section */}
                <div className="bg-white rounded-xl shadow-md p-6 mb-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">Payment History</h3>
                  {loadingPayments ? (
                    <div className="flex justify-center items-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
                      <span className="ml-2 text-gray-600">Loading payment history...</span>
                    </div>
                  ) : payments.length > 0 ? (
                    <div className="space-y-4">
                      {payments.slice(0, 5).map((payment) => (
                        <div key={payment.id} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h4 className="font-semibold text-gray-800">
                                {payment.planType} Plan - ₹{payment.amount}
                              </h4>
                              <p className="text-sm text-gray-500">
                                {new Date(payment.createdAt).toLocaleDateString()} at {new Date(payment.createdAt).toLocaleTimeString()}
                              </p>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                              payment.status === 'COMPLETED' 
                                ? 'bg-green-100 text-green-800' 
                                : payment.status === 'PENDING'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {payment.status}
                            </span>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                            <div>
                              <p className="text-gray-500">Payment ID:</p>
                              <p className="font-mono text-xs">{payment.razorpayPaymentId || 'Pending'}</p>
                            </div>
                            <div>
                              <p className="text-gray-500">Order ID:</p>
                              <p className="font-mono text-xs">{payment.razorpayOrderId}</p>
                            </div>
                            <div>
                              <p className="text-gray-500">Currency:</p>
                              <p>{payment.currency}</p>
                            </div>
                          </div>
                          {payment.notes && (
                            <div className="mt-2 pt-2 border-t border-gray-100">
                              <p className="text-gray-500 text-sm">Selected Module:</p>
                              <p className="text-sm font-medium">
                                {(() => {
                                  try {
                                    const parsedNotes = JSON.parse(payment.notes);
                                    return parsedNotes.selectedModule || 'All Modules';
                                  } catch {
                                    return payment.notes || 'All Modules';
                                  }
                                })()}
                              </p>
                            </div>
                          )}
                        </div>
                      ))}
                      {payments.length > 5 && (
                        <div className="text-center">
                          <p className="text-gray-500 text-sm">Showing latest 5 payments</p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-600 mb-4">No payment history found.</p>
                      <Link 
                        to="/courses" 
                        className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
                      >
                        Make Your First Purchase
                      </Link>
                    </div>
                  )}
                </div>

                {/* Available Features Section */}
                <div className="bg-white rounded-xl shadow-md p-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">Available Features</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-green-700 mb-3">✅ Unlocked Features</h4>
                      <ul className="space-y-2">
                        {/* Always available features */}
                        <li className="flex items-center gap-2">
                          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                          <span className="text-sm">Basic Courses Access</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                          <span className="text-sm">Community Forum (Basic)</span>
                        </li>
                        
                        {/* SOLO Plan Features */}
                        {accessStatus?.subscription && (accessStatus.subscription.planType === 'SOLO' || accessStatus.subscription.planType === 'PRO' || accessStatus.subscription.planType === 'INSTITUTIONAL') && (
                          <>
                            <li className="flex items-center gap-2">
                              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                              <span className="text-sm">Premium Module Access ({accessStatus.subscription.planType === 'SOLO' ? '1 Module' : 'All Modules'})</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                              <span className="text-sm">Completion Certificates</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                              <span className="text-sm">Interactive Assessments</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                              <span className="text-sm">Progress Tracking</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                              <span className="text-sm">Downloadable Content</span>
                            </li>
                          </>
                        )}
                        
                        {/* PRO Plan Features */}
                        {accessStatus?.subscription && (accessStatus.subscription.planType === 'PRO' || accessStatus.subscription.planType === 'INSTITUTIONAL') && (
                          <>
                            <li className="flex items-center gap-2">
                              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                              <span className="text-sm">AI-Powered Assessments</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                              <span className="text-sm">AI Personalized Learning</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                              <span className="text-sm">Advanced Progress Tracking</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                              <span className="text-sm">Performance Analytics</span>
                            </li>
                          </>
                        )}
                        
                        {/* INSTITUTIONAL Plan Features */}
                        {accessStatus?.subscription && accessStatus.subscription.planType === 'INSTITUTIONAL' && (
                          <>
                            <li className="flex items-center gap-2">
                              <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                              <span className="text-sm">Live Expert Sessions</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                              <span className="text-sm">Bulk User Management</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                              <span className="text-sm">Priority 24/7 Support</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                              <span className="text-sm">Custom Content Creation</span>
                            </li>
                          </>
                        )}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-700 mb-3">🔒 Locked Features</h4>
                      <ul className="space-y-2">
                        {/* Features locked for non-subscribers */}
                        {!accessStatus?.subscription && (
                          <>
                            <li className="flex items-center gap-2">
                              <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                              <span className="text-sm text-gray-500">Premium Modules</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                              <span className="text-sm text-gray-500">Completion Certificates</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                              <span className="text-sm text-gray-500">AI-Powered Assessments</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                              <span className="text-sm text-gray-500">Advanced Progress Tracking</span>
                            </li>
                          </>
                        )}
                        
                        {/* Features locked for SOLO plan users */}
                        {accessStatus?.subscription && accessStatus.subscription.planType === 'SOLO' && (
                          <>
                            <li className="flex items-center gap-2">
                              <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
                              <span className="text-sm text-gray-600">All Premium Modules (Only 1 available)</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
                              <span className="text-sm text-gray-600">AI-Powered Assessments</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
                              <span className="text-sm text-gray-600">AI Personalized Learning</span>
                            </li>
                          </>
                        )}
                        
                        {/* Features locked for PRO plan users */}
                        {accessStatus?.subscription && accessStatus.subscription.planType === 'PRO' && (
                          <>
                            <li className="flex items-center gap-2">
                              <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
                              <span className="text-sm text-gray-600">Live Expert Sessions</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
                              <span className="text-sm text-gray-600">Bulk User Management</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
                              <span className="text-sm text-gray-600">Custom Content Creation</span>
                            </li>
                          </>
                        )}
                        
                        {/* Show upgrade suggestion */}
                        {accessStatus?.subscription && accessStatus.subscription.planType !== 'INSTITUTIONAL' && (
                          <li className="flex items-center gap-2 mt-4">
                            <button 
                              onClick={() => {
                                const nextPlan = accessStatus.subscription.planType === 'STARTER' ? 'SOLO' : 
                                               accessStatus.subscription.planType === 'PRO' ? 'INSTITUTIONAL' : 'PRO';
                                navigate(`/payment?plan=${nextPlan}`);
                              }}
                              className="text-sm bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full hover:from-orange-600 hover:to-red-600 transition-all"
                            >
                             Upgrade Plan
                            </button>
                          </li>
                        )}
                        
                        {!accessStatus?.subscription && (
                          <li className="flex items-center gap-2 mt-4">
                            <button 
                              onClick={() => navigate('/pricing')}
                              className="text-sm bg-gradient-to-r from-green-500 to-blue-600 text-white px-3 py-1 rounded-full hover:from-green-600 hover:to-blue-700 transition-all"
                            >
                              🚀 Get Started
                            </button>
                          </li>
                        )}
                      </ul>
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

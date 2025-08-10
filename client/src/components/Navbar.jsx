import React, { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAccessControl } from "../utils/accessControl";

const Navbar = () => {
  const { user, role, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [subscriptions, setSubscriptions] = useState([]);
  const [selectedModule, setSelectedModule] = useState(null);
  const [subscriptionsLoading, setSubscriptionsLoading] = useState(true);
  const sidebarRef = useRef(null);

  // Access control with subscription data
  const { currentPlan } = useAccessControl(subscriptions, selectedModule);

  // Fetch user subscription data
  useEffect(() => {
    const fetchUserSubscriptions = async () => {
      if (!user?.id) {
        setSubscriptionsLoading(false);
        return;
      }

      try {
        setSubscriptionsLoading(true);
        const response = await fetch(
          `${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/payment/subscriptions/${user.id}`
        );
        
        if (response.ok) {
          const subscriptionData = await response.json();
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
          
          // If we found a highest active subscription, handle module selection for SOLO plans
          if (highestActiveSubscription && highestActiveSubscription.notes) {
            // Parse notes to get selectedModule if it exists
            let selectedModuleFromSub = null;
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
            
            setSelectedModule(selectedModuleFromSub);
          }
        }
      } catch (error) {
        console.error('Error fetching subscriptions in navbar:', error);
        setSubscriptions([]);
      } finally {
        setSubscriptionsLoading(false);
      }
    };

    fetchUserSubscriptions();
  }, [user?.id]);

  // Check if user should see upgrade button (SOLO or PRO plan)
  const shouldShowUpgrade = user && 
    (currentPlan === 'SOLO' || currentPlan === 'PRO');
  
  // Show pricing if: no user OR user has STARTER or INSTITUTIONAL plan
  const shouldShowPricing = !user || 
    (currentPlan === 'STARTER' || currentPlan === 'INSTITUTIONAL');

  // Get the next upgrade plan
  const getUpgradePlan = () => {
    if (currentPlan === 'STARTER') return 'SOLO';
    if (currentPlan === 'PRO') return 'INSTITUTIONAL';
    return 'PRO';
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsSidebarOpen(false);
      }
    };

    if (isSidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarOpen]);

  const handleItemClick = () => {
    setIsSidebarOpen(false);
  };

  // Function to check if a nav item is active
  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  // Function to get nav link classes
  const getNavLinkClasses = (path) => {
    const baseClasses = "font-medium transition duration-300";
    if (isActive(path)) {
      return `${baseClasses} text-green-600`;
    }
    return `${baseClasses} text-black hover:text-green-600`;
  };

  // Don't render navbar content for authenticated users until subscriptions are loaded
  if (user && subscriptionsLoading) {
    return (
      <nav className="bg-white text-black sticky top-0 z-200 w-full rounded-bl-4xl rounded-br-4xl shadow-lg">
        <div className="w-full py-4 px-6 flex justify-between items-center max-w-7xl mx-auto">
          {/* Logo Section */}
          <div className="">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-15  h-10 relative">
                {/* 3D Cube Icon - recreating the exact green cube from Figma */}
                <img className="h-12 w-full" src="/midLogo.png" alt="logo" />
              </div>
              <span className="text-[#09BE43] mt-1 font-bold text-2xl">
                Edumaniax
              </span>
            </Link>
          </div>
          
          {/* Loading placeholder for navigation */}
          <div className="hidden md:flex items-center gap-8">
            <div className="w-16 h-6 bg-gray-200 animate-pulse rounded"></div>
            <div className="w-20 h-6 bg-gray-200 animate-pulse rounded"></div>
            <div className="w-16 h-6 bg-gray-200 animate-pulse rounded"></div>
            <div className="w-16 h-6 bg-gray-200 animate-pulse rounded"></div>
            <div className="w-12 h-6 bg-gray-200 animate-pulse rounded"></div>
          </div>
          
          {/* Loading placeholder for right side buttons */}
          <div className="hidden md:flex items-center gap-3">
            <div className="w-24 h-10 bg-gray-200 animate-pulse rounded-lg"></div>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button className="text-black">
              <Menu size={24} />
            </button>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="bg-white text-black sticky top-0 z-200 w-full rounded-bl-4xl rounded-br-4xl shadow-lg">
      <div className="w-full py-4 px-6 flex justify-between items-center max-w-7xl mx-auto">
        {/* Logo Section */}
        <div className="">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-15  h-10 relative">
              {/* 3D Cube Icon - recreating the exact green cube from Figma */}
              <img className="h-12 w-full" src="/midLogo.png" alt="logo" />
            </div>
            <span className="text-[#09BE43] mt-1 font-bold text-2xl">
              Edumaniax
            </span>
          </Link>
        </div>

        {/* <div className="absolute top-4 left-4 flex items-center gap-2 z-10">
          <Link to="/">
            <img
              src="/loginPageDesign/EduManiax_Logo.svg"
              alt="Edumaniax Logo"
              className="h-20 w-auto"
            />
          </Link>
          <h1 className="text-white text-2xl font-bold">Edumaniax</h1>
        </div> */}

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className={getNavLinkClasses("/")}>
            Home
          </Link>
          <Link to="/about" className={getNavLinkClasses("/about")}>
            About Us
          </Link>
          <Link to="/courses" className={getNavLinkClasses("/courses")}>
            Courses
          </Link>
          {shouldShowUpgrade ? (
            <button
              onClick={() => navigate(`/payment?plan=${getUpgradePlan()}`)}
              className="font-medium transition duration-300 text-black hover:text-green-600"
            >
              Upgrade Plan
            </button>
          ) : shouldShowPricing ? (
            <Link to="/pricing" className={getNavLinkClasses("/pricing")}>
              Pricing
            </Link>
          ) : null}
          <Link to="/blogs" className={getNavLinkClasses("/blogs")}>
            Blogs
          </Link>
        </div>

        {/* Right Side Buttons */}
        <div className="hidden md:flex items-center gap-3">
          {user || role === "admin" ? (
            <>
              <Link
                to="/dashboard"
                className="bg-green-600 text-white font-medium px-6 py-2 rounded-lg hover:bg-green-700 transition duration-300"
              >
                Dashboard
              </Link>
            </>
          ) : (
            <>
              {/* <Link
                to="/register"
                className="border border-green-600 text-green-600 font-medium px-6 py-2 rounded-lg hover:bg-green-50 transition duration-300"
              >
                Register
              </Link> */}
              <Link
                to="/login"
                className="bg-green-600 text-white font-medium px-6 py-2 rounded-lg hover:bg-green-700 transition duration-300"
              >
                Log In
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-black"
          >
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Sidebar */}
      {isSidebarOpen && (
        <div
          ref={sidebarRef}
          className="md:hidden fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50 flex flex-col"
        >
          <div className="px-6 py-6 flex-1">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-black">Menu</h2>
              <button onClick={handleItemClick}>
                <X size={24} className="text-black" />
              </button>
            </div>

            <hr className="mb-6" />

            {/* Navigation Links */}
            <div className="space-y-4">
              <Link
                to="/"
                onClick={handleItemClick}
                className={`block text-lg font-medium transition duration-300 ${
                  isActive("/")
                    ? "text-green-600"
                    : "text-black hover:text-green-600"
                }`}
              >
                Home
              </Link>
              <Link
                to="/about"
                onClick={handleItemClick}
                className={`block text-lg font-medium transition duration-300 ${
                  isActive("/about")
                    ? "text-green-600"
                    : "text-black hover:text-green-600"
                }`}
              >
                About Us
              </Link>
              <Link
                to="/courses"
                onClick={handleItemClick}
                className={`block text-lg font-medium transition duration-300 ${
                  isActive("/courses")
                    ? "text-green-600"
                    : "text-black hover:text-green-600"
                }`}
              >
                Courses
              </Link>
              {shouldShowUpgrade ? (
                <button
                  onClick={() => {
                    navigate(`/payment?plan=${getUpgradePlan()}`);
                    handleItemClick();
                  }}
                  className="block text-lg font-medium transition duration-300 text-black hover:text-green-600"
                >
                  Upgrade Plan
                </button>
              ) : shouldShowPricing ? (
                <Link
                  to="/pricing"
                  onClick={handleItemClick}
                  className={`block text-lg font-medium transition duration-300 ${
                    isActive("/pricing")
                      ? "text-green-600"
                      : "text-black hover:text-green-600"
                  }`}
                >
                  Pricing
                </Link>
              ) : null}
              <Link
                to="/blogs"
                onClick={handleItemClick}
                className={`block text-lg font-medium transition duration-300 ${
                  isActive("/blogs")
                    ? "text-green-600"
                    : "text-black hover:text-green-600"
                }`}
              >
                Blogs
              </Link>
            </div>
          </div>

          {/* Bottom Buttons */}
          <div className="px-6 py-6 border-t border-gray-200">
            {user || role === "admin" ? (
              <div className="space-y-3">
                <Link
                  to="/dashboard"
                  onClick={handleItemClick}
                  className="block bg-green-600 text-white text-center hover:bg-green-700 transition duration-300 px-4 py-3 rounded-lg font-medium"
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    logout(navigate);
                    handleItemClick();
                  }}
                  className="w-full border border-green-600 text-green-600 hover:bg-green-50 transition duration-300 px-4 py-3 rounded-lg font-medium"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {/* <Link
                  to="/register"
                  onClick={handleItemClick}
                  className="block border border-green-600 text-green-600 text-center hover:bg-green-50 transition duration-300 px-4 py-3 rounded-lg font-medium"
                >
                  Register
                </Link> */}
                <Link
                  to="/login"
                  onClick={handleItemClick}
                  className="block bg-green-600 text-white text-center hover:bg-green-700 transition duration-300 px-4 py-3 rounded-lg font-medium"
                >
                  Log In
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

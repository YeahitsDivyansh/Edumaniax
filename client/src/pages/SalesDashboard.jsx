import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  Search, 
  Download, 
  Plus, 
  Filter, 
  Mail, 
  Phone, 
  Calendar, 
  Clock,
  ChevronLeft, 
  ChevronRight,
  MessageSquare,
  Briefcase,
  Users,
  DollarSign,
  BarChart4,
  PieChart,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  XCircle,
  Bell
} from 'lucide-react';

const SalesDashboard = () => {
  const navigate = useNavigate();
  const { user, logout, role } = useAuth();
  const [activeTab, setActiveTab] = useState('inquiries');
  const [inquiries, setInquiries] = useState([]);
  const [analytics, setAnalytics] = useState({
    inquiryStatusCounts: [],
    revenueByPlan: [],
    unreadNotificationsCount: 0
  });
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [isEditingInquiry, setIsEditingInquiry] = useState(false);
  const [editFormData, setEditFormData] = useState({});
  const [notifications, setNotifications] = useState([]);
  const [pollingInterval, setPollingInterval] = useState(null);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  
  // Define fetch functions with useCallback first
  // Helper function to handle 401 errors
  const handleAuthError = (error, response) => {
    if (response?.status === 401 || error.message.includes('Invalid or expired token')) {
      console.log('Authentication error detected, clearing auth state and redirecting');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('role');
      logout();
      navigate('/sales');
    }
  };

  // Fetch inquiries from API
  const fetchInquiries = useCallback(async () => {
    try {
      setLoading(true);
      
      let url = `${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/special/inquiries?page=${currentPage}`;
      
      if (filterStatus) {
        url += `&status=${filterStatus}`;
      }
      
      if (searchQuery) {
        url += `&search=${encodeURIComponent(searchQuery)}`;
      }

      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        if (response.status === 401) {
          handleAuthError(new Error(data.message), response);
          return;
        }
        throw new Error(data.message || 'Failed to fetch inquiries');
      }
      
      setInquiries(data.data || []);
      setTotalPages(data.pagination?.totalPages || Math.ceil((data.count || 0) / 10));
    } catch (error) {
      console.error('Error fetching inquiries:', error);
      handleAuthError(error);
    } finally {
      setLoading(false);
    }
  }, [currentPage, filterStatus, searchQuery, logout, navigate]);
  
  // Fetch analytics data
  const fetchAnalytics = useCallback(async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/special/analytics`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        if (response.status === 401) {
          handleAuthError(new Error(data.message), response);
          return;
        }
        throw new Error(data.message || 'Failed to fetch analytics');
      }      setAnalytics({
        inquiryStatusCounts: Array.isArray(data.data?.inquiryStatusCounts) 
          ? data.data.inquiryStatusCounts 
          : [],
        revenueByPlan: Array.isArray(data.data?.revenueByPlan) 
          ? data.data.revenueByPlan 
          : []
      });
    } catch (error) {
      console.error('Error fetching analytics:', error);
    }
  }, []);
  
  // Check permissions - only ADMIN and SALES roles can access this page
  useEffect(() => {
    if (user && !['ADMIN', 'SALES'].includes(role)) {
      navigate('/dashboard');
    }
  }, [user, role, navigate]);
  
  // Poll for new notifications
  useEffect(() => {
    // Poll for notifications
    const pollNotifications = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/special/notifications?page=1&limit=10`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        
        const data = await response.json();
        
        if (!response.ok) {
          if (response.status === 401) {
            handleAuthError(new Error(data.message), response);
            return;
          }
          throw new Error(data.message || 'Failed to fetch notifications');
        }
        
        // Process new notifications
        const newNotifications = data.data || [];
        
        // Handle each notification type
        newNotifications.forEach(notification => {
          if (!notification.read) {
            // Process notification based on type
            switch (notification.type) {
              case 'NEW_INQUIRY':
                // Refresh inquiries list
                fetchInquiries();
                break;
              case 'INQUIRY_UPDATED':
                // Refresh inquiries list
                fetchInquiries();
                // Update selected inquiry if it matches
                if (selectedInquiry && selectedInquiry.id === notification.data?.id) {
                  setSelectedInquiry(notification.data);
                }
                break;
              case 'NEW_PAYMENT':
                // Refresh payments list (if implemented)
                break;
              default:
                console.log('Unknown notification type:', notification.type);
            }
          }
        });
        
        // Update notifications list
        setNotifications(newNotifications);
      } catch (error) {
        console.error('Error polling notifications:', error);
      }
    };

    // Only poll if user is ADMIN or SALES
    if (user && ['ADMIN', 'SALES'].includes(role)) {
      // Initial poll
      pollNotifications();
      
      // Set up polling interval (every 30 seconds)
      const interval = setInterval(pollNotifications, 30000);
      setPollingInterval(interval);
      
      // Clean up interval on unmount
      return () => clearInterval(interval);
    }
  }, [user, role, fetchInquiries, selectedInquiry]);
  
  // Update online status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);
  
  // Fetch initial data
  useEffect(() => {
    if (user && ['ADMIN', 'SALES'].includes(role)) {
      fetchInquiries();
      fetchAnalytics();
    }
  }, [user, role, fetchInquiries, fetchAnalytics]);
  
  // Refetch when page or filters change
  useEffect(() => {
    if (user && ['ADMIN', 'SALES'].includes(role)) {
      fetchInquiries();
    }
  }, [currentPage, filterStatus, searchQuery, fetchInquiries, user, role]);
  
  // Handle inquiry selection
  const handleInquiryClick = (inquiry) => {
    setSelectedInquiry(inquiry);
  };
  
  // Handle inquiry status update
  const updateInquiryStatus = async (id, status) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/special/inquiries/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ status })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to update inquiry');
      }
      
      // Update local state
      setInquiries(prev => 
        prev.map(inquiry => 
          inquiry.id === id ? { ...inquiry, status } : inquiry
        )
      );
      
      if (selectedInquiry && selectedInquiry.id === id) {
        setSelectedInquiry(prev => ({ ...prev, status }));
      }
      
      // Refresh analytics
      fetchAnalytics();
    } catch (error) {
      console.error('Error updating inquiry status:', error);
    }
  };
  
  // Handle pagination
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };
  
  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  // Calculate percentage for chart
  const calculatePercentage = (count, total) => {
    return total > 0 ? Math.round((count / total) * 100) : 0;
  };

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'NEW':
        return 'bg-blue-500';
      case 'CONTACTED':
        return 'bg-yellow-500';
      case 'FOLLOW_UP':
        return 'bg-purple-500';
      case 'CONVERTED':
        return 'bg-green-500';
      case 'NOT_INTERESTED':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  // Get status label
  const getStatusLabel = (status) => {
    switch (status) {
      case 'NEW':
        return 'New';
      case 'CONTACTED':
        return 'Contacted';
      case 'FOLLOW_UP':
        return 'Follow Up';
      case 'CONVERTED':
        return 'Converted';
      case 'NOT_INTERESTED':
        return 'Not Interested';
      default:
        return status;
    }
  };
  
  // Render the status badge
  const renderStatusBadge = (status) => {
    return (
      <span className={`px-2 py-1 text-xs font-medium text-white rounded-full ${getStatusColor(status)}`}>
        {getStatusLabel(status)}
      </span>
    );
  };
  
  // Render connection status indicator
  const renderConnectionStatus = () => (
    <div className="flex items-center space-x-2">
      <div className={`w-3 h-3 rounded-full ${isOnline ? 'bg-green-500' : 'bg-red-500'}`}></div>
      <span className="text-sm text-gray-600">{isOnline ? 'Connected' : 'Offline'}</span>
    </div>
  );
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900">Sales Dashboard</h1>
          <div className="flex items-center space-x-4">
            {renderConnectionStatus()}
            <div className="flex items-center space-x-3">
              <span className="text-sm font-medium">{user?.name || 'User'}</span>
              <button
                onClick={logout}
                className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Tabs */}
        <div className="mb-6 border-b border-gray-200">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            <button
              onClick={() => setActiveTab('inquiries')}
              className={`${
                activeTab === 'inquiries'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Inquiries
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`${
                activeTab === 'analytics'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Analytics
            </button>
          </nav>
        </div>

        {/* Inquiries Tab */}
        {activeTab === 'inquiries' && (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Inquiries List */}
            <div className="lg:col-span-1 bg-white shadow rounded-lg">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">Institutional Inquiries</h2>
                <div className="mt-2 flex items-center space-x-2">
                  <div className="relative flex-grow">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search inquiries..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                    <Search className="absolute right-3 top-2 h-5 w-5 text-gray-400" />
                  </div>
                  <div className="relative">
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                    >
                      <option value="">All Status</option>
                      <option value="NEW">New</option>
                      <option value="CONTACTED">Contacted</option>
                      <option value="FOLLOW_UP">Follow Up</option>
                      <option value="CONVERTED">Converted</option>
                      <option value="NOT_INTERESTED">Not Interested</option>
                    </select>
                    <Filter className="absolute right-3 top-2 h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </div>
              
              {loading ? (
                <div className="p-6 text-center text-gray-500">Loading inquiries...</div>
              ) : inquiries.length === 0 ? (
                <div className="p-6 text-center text-gray-500">No inquiries found</div>
              ) : (
                <>
                  <ul className="divide-y divide-gray-200 max-h-[600px] overflow-y-auto">
                    {inquiries.map((inquiry) => (
                      <li
                        key={inquiry.id}
                        onClick={() => handleInquiryClick(inquiry)}
                        className={`p-4 hover:bg-gray-50 cursor-pointer ${
                          selectedInquiry?.id === inquiry.id ? 'bg-blue-50' : ''
                        }`}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-sm font-medium text-gray-900">{inquiry.organizationName}</h3>
                            <p className="text-sm text-gray-500 mt-1">{inquiry.contactName}</p>
                          </div>
                          {renderStatusBadge(inquiry.status)}
                        </div>
                        <div className="mt-2 flex items-center text-xs text-gray-500">
                          <Clock className="mr-1 h-4 w-4" />
                          {formatDate(inquiry.createdAt)}
                        </div>
                      </li>
                    ))}
                  </ul>

                  {/* Pagination */}
                  <div className="px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                    <div className="flex-1 flex justify-between sm:hidden">
                      <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                          currentPage === 1
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-white text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        Previous
                      </button>
                      <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={`ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                          currentPage === totalPages
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-white text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        Next
                      </button>
                    </div>
                    <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                      <div>
                        <p className="text-sm text-gray-700">
                          Showing page <span className="font-medium">{currentPage}</span> of{' '}
                          <span className="font-medium">{totalPages}</span>
                        </p>
                      </div>
                      <div>
                        <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                          <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
                              currentPage === 1
                                ? 'text-gray-300 cursor-not-allowed'
                                : 'text-gray-500 hover:bg-gray-50'
                            }`}
                          >
                            <span className="sr-only">Previous</span>
                            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                          </button>
                          
                          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                            let pageNumber;
                            if (totalPages <= 5) {
                              pageNumber = i + 1;
                            } else if (currentPage <= 3) {
                              pageNumber = i + 1;
                            } else if (currentPage >= totalPages - 2) {
                              pageNumber = totalPages - 4 + i;
                            } else {
                              pageNumber = currentPage - 2 + i;
                            }
                            
                            return (
                              <button
                                key={pageNumber}
                                onClick={() => handlePageChange(pageNumber)}
                                className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                                  currentPage === pageNumber
                                    ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                                    : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                                }`}
                              >
                                {pageNumber}
                              </button>
                            );
                          })}
                          
                          <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
                              currentPage === totalPages
                                ? 'text-gray-300 cursor-not-allowed'
                                : 'text-gray-500 hover:bg-gray-50'
                            }`}
                          >
                            <span className="sr-only">Next</span>
                            <ChevronRight className="h-5 w-5" aria-hidden="true" />
                          </button>
                        </nav>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Inquiry Details */}
            <div className="lg:col-span-2 bg-white shadow rounded-lg">
              {selectedInquiry ? (
                <>
                  <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                    <h2 className="text-lg font-medium text-gray-900">Inquiry Details</h2>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setIsEditingInquiry(true)}
                        className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                  
                  {isEditingInquiry ? (
                    <div className="p-4">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Edit Inquiry</h3>
                      <form className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Status</label>
                          <select
                            value={editFormData.status || selectedInquiry.status}
                            onChange={(e) => setEditFormData({...editFormData, status: e.target.value})}
                            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          >
                            <option value="NEW">New</option>
                            <option value="CONTACTED">Contacted</option>
                            <option value="FOLLOW_UP">Follow Up</option>
                            <option value="CONVERTED">Converted</option>
                            <option value="NOT_INTERESTED">Not Interested</option>
                          </select>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Notes</label>
                          <textarea
                            value={editFormData.notes || selectedInquiry.notes || ''}
                            onChange={(e) => setEditFormData({...editFormData, notes: e.target.value})}
                            rows={4}
                            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          ></textarea>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Follow Up Date</label>
                          <input
                            type="date"
                            value={editFormData.followUpDate || (selectedInquiry.followUpDate ? new Date(selectedInquiry.followUpDate).toISOString().split('T')[0] : '')}
                            onChange={(e) => setEditFormData({...editFormData, followUpDate: e.target.value})}
                            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          />
                        </div>
                        
                        <div className="flex justify-end space-x-2">
                          <button
                            type="button"
                            onClick={() => {
                              setIsEditingInquiry(false);
                              setEditFormData({});
                            }}
                            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            onClick={async () => {
                              try {
                                const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/special/inquiries/${selectedInquiry.id}`, {
                                  method: 'PUT',
                                  headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                                  },
                                  body: JSON.stringify(editFormData)
                                });
                                
                                const data = await response.json();
                                
                                if (!response.ok) {
                                  throw new Error(data.message || 'Failed to update inquiry');
                                }
                                
                                // Update local state
                                setInquiries(prev => 
                                  prev.map(inquiry => 
                                    inquiry.id === selectedInquiry.id ? data.data : inquiry
                                  )
                                );
                                
                                setSelectedInquiry(data.data);
                                setIsEditingInquiry(false);
                                setEditFormData({});
                                
                                // Refresh analytics
                                fetchAnalytics();
                              } catch (error) {
                                console.error('Error updating inquiry:', error);
                              }
                            }}
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            Save Changes
                          </button>
                        </div>
                      </form>
                    </div>
                  ) : (
                    <div className="p-4">
                      <div className="mb-6">
                        <h3 className="text-sm font-medium text-gray-500">Status</h3>
                        <div className="mt-1 flex flex-wrap gap-2">
                          {renderStatusBadge(selectedInquiry.status)}
                          <button
                            onClick={() => updateInquiryStatus(selectedInquiry.id, 'NEW')}
                            className={`px-3 py-1 text-xs font-medium rounded border ${
                              selectedInquiry.status === 'NEW'
                                ? 'bg-blue-100 text-blue-800 border-blue-300'
                                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                            }`}
                          >
                            New
                          </button>
                          <button
                            onClick={() => updateInquiryStatus(selectedInquiry.id, 'CONTACTED')}
                            className={`px-3 py-1 text-xs font-medium rounded border ${
                              selectedInquiry.status === 'CONTACTED'
                                ? 'bg-yellow-100 text-yellow-800 border-yellow-300'
                                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                            }`}
                          >
                            Contacted
                          </button>
                          <button
                            onClick={() => updateInquiryStatus(selectedInquiry.id, 'FOLLOW_UP')}
                            className={`px-3 py-1 text-xs font-medium rounded border ${
                              selectedInquiry.status === 'FOLLOW_UP'
                                ? 'bg-purple-100 text-purple-800 border-purple-300'
                                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                            }`}
                          >
                            Follow Up
                          </button>
                          <button
                            onClick={() => updateInquiryStatus(selectedInquiry.id, 'CONVERTED')}
                            className={`px-3 py-1 text-xs font-medium rounded border ${
                              selectedInquiry.status === 'CONVERTED'
                                ? 'bg-green-100 text-green-800 border-green-300'
                                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                            }`}
                          >
                            Converted
                          </button>
                          <button
                            onClick={() => updateInquiryStatus(selectedInquiry.id, 'NOT_INTERESTED')}
                            className={`px-3 py-1 text-xs font-medium rounded border ${
                              selectedInquiry.status === 'NOT_INTERESTED'
                                ? 'bg-red-100 text-red-800 border-red-300'
                                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                            }`}
                          >
                            Not Interested
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                        <div>
                          <h3 className="text-sm font-medium text-gray-500">Organization Name</h3>
                          <p className="mt-1 text-sm text-gray-900">{selectedInquiry.organizationName}</p>
                        </div>
                        
                        <div>
                          <h3 className="text-sm font-medium text-gray-500">Organization Type</h3>
                          <p className="mt-1 text-sm text-gray-900">{selectedInquiry.organizationType || 'N/A'}</p>
                        </div>
                        
                        <div>
                          <h3 className="text-sm font-medium text-gray-500">Contact Name</h3>
                          <p className="mt-1 text-sm text-gray-900">{selectedInquiry.contactName}</p>
                        </div>
                        
                        <div>
                          <h3 className="text-sm font-medium text-gray-500">Contact Email</h3>
                          <p className="mt-1 text-sm text-gray-900">{selectedInquiry.contactEmail}</p>
                        </div>
                        
                        <div>
                          <h3 className="text-sm font-medium text-gray-500">Contact Phone</h3>
                          <p className="mt-1 text-sm text-gray-900">{selectedInquiry.contactPhone || 'N/A'}</p>
                        </div>
                        
                        <div>
                          <h3 className="text-sm font-medium text-gray-500">Student Count</h3>
                          <p className="mt-1 text-sm text-gray-900">{selectedInquiry.studentCount || 'N/A'}</p>
                        </div>
                        
                        <div className="sm:col-span-2">
                          <h3 className="text-sm font-medium text-gray-500">Message</h3>
                          <p className="mt-1 text-sm text-gray-900">{selectedInquiry.message || 'N/A'}</p>
                        </div>
                        
                        <div>
                          <h3 className="text-sm font-medium text-gray-500">Created At</h3>
                          <p className="mt-1 text-sm text-gray-900">{formatDate(selectedInquiry.createdAt)}</p>
                        </div>
                        
                        <div>
                          <h3 className="text-sm font-medium text-gray-500">Follow Up Date</h3>
                          <p className="mt-1 text-sm text-gray-900">
                            {selectedInquiry.followUpDate ? formatDate(selectedInquiry.followUpDate) : 'Not set'}
                          </p>
                        </div>
                        
                        <div className="sm:col-span-2">
                          <h3 className="text-sm font-medium text-gray-500">Notes</h3>
                          <p className="mt-1 text-sm text-gray-900">{selectedInquiry.notes || 'No notes'}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="p-6 text-center text-gray-500">
                  <MessageSquare className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No Inquiry Selected</h3>
                  <p className="mt-1 text-sm text-gray-500">Select an inquiry from the list to view details.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* KPI Cards */}
            <div className="lg:col-span-3 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {/* Total Inquiries */}
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                      <Briefcase className="h-6 w-6 text-white" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">Total Inquiries</dt>
                        <dd>
                          <div className="text-lg font-medium text-gray-900">
                            {Array.isArray(analytics.inquiryStatusCounts) 
                              ? analytics.inquiryStatusCounts.reduce((sum, item) => sum + Number(item.count || 0), 0) 
                              : 0}
                          </div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>

              {/* Total Revenue */}
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                      <DollarSign className="h-6 w-6 text-white" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">Total Revenue</dt>
                        <dd>
                          <div className="text-lg font-medium text-gray-900">
                            ₹{Array.isArray(analytics.revenueByPlan) 
                              ? analytics.revenueByPlan.reduce((sum, item) => sum + Number(item.total || 0), 0) 
                              : 0}
                          </div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>

              {/* Active Leads */}
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-yellow-500 rounded-md p-3">
                      <Users className="h-6 w-6 text-white" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">Active Leads</dt>
                        <dd>
                          <div className="text-lg font-medium text-gray-900">
                            {Array.isArray(analytics.inquiryStatusCounts) 
                              ? analytics.inquiryStatusCounts.find(i => i.status === 'FOLLOW_UP')?.count || 0
                              : 0}
                          </div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>

              {/* Conversion Rate */}
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-purple-500 rounded-md p-3">
                      <TrendingUp className="h-6 w-6 text-white" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">Conversion Rate</dt>
                        <dd>
                          <div className="text-lg font-medium text-gray-900">
                            {(() => {
                              const totalInquiries = Array.isArray(analytics.inquiryStatusCounts) 
                                ? analytics.inquiryStatusCounts.reduce((sum, item) => sum + Number(item.count || 0), 0) 
                                : 0;
                              const converted = analytics.inquiryStatusCounts?.find(i => i.status === 'CONVERTED')?.count || 0;
                              return totalInquiries > 0 ? `${Math.round((converted / totalInquiries) * 100)}%` : '0%';
                            })()}
                          </div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Inquiry Status Distribution */}
            <div className="lg:col-span-2 bg-white shadow rounded-lg">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">Inquiry Status Distribution</h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-5">
                  {['NEW', 'CONTACTED', 'FOLLOW_UP', 'CONVERTED', 'NOT_INTERESTED'].map((status) => {
                    const count = Array.isArray(analytics.inquiryStatusCounts) 
                      ? analytics.inquiryStatusCounts.find(i => i.status === status)?.count || 0 
                      : 0;
                    const totalInquiries = Array.isArray(analytics.inquiryStatusCounts)
                      ? analytics.inquiryStatusCounts.reduce((sum, item) => sum + Number(item.count || 0), 0) || 1
                      : 1;
                    const percentage = calculatePercentage(count, totalInquiries);
                    
                    return (
                      <div key={status} className="bg-white overflow-hidden">
                        <div className="px-4 py-2">
                          <div className="flex justify-between items-center mb-1">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(status)} text-white`}>
                              {getStatusLabel(status)}
                            </span>
                            <span className="text-sm font-medium">{count}</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div
                              className={`h-2.5 rounded-full ${getStatusColor(status)}`}
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                          <div className="text-xs text-gray-500 mt-1 text-right">{percentage}%</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Revenue by Plan */}
            <div className="lg:col-span-1 bg-white shadow rounded-lg">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">Revenue by Plan</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {['STARTER', 'SOLO', 'PRO', 'INSTITUTIONAL'].map((planType) => {
                    // Map plan types to display names
                    const planDisplayNames = {
                      'STARTER': 'Starter Plan',
                      'SOLO': 'Solo Plan', 
                      'PRO': 'Pro Plan',
                      'INSTITUTIONAL': 'Institutional Plan'
                    };
                    
                    const revenue = Array.isArray(analytics.revenueByPlan) 
                      ? analytics.revenueByPlan.find(i => i.planType === planType)?.total || 0
                      : 0;
                    const totalRevenue = Array.isArray(analytics.revenueByPlan)
                      ? analytics.revenueByPlan.reduce((sum, item) => sum + Number(item.total || 0), 0) || 1
                      : 1;
                    const percentage = calculatePercentage(revenue, totalRevenue);
                    
                    return (
                      <div key={planType} className="bg-white overflow-hidden">
                        <div className="px-4 py-2">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm font-medium">{planDisplayNames[planType] || planType}</span>
                            <span className="text-sm font-medium">₹{revenue}</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div
                              className="h-2.5 rounded-full bg-green-500"
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                          <div className="text-xs text-gray-500 mt-1 text-right">{percentage}%</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default SalesDashboard;

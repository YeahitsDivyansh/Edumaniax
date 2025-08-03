import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const server = "https://edumaniax-api-343555083503.asia-south1.run.app";
  // const server = "http://localhost:3000";

  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [user, setUser] = useState(
    localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null
  );
  const [phonenumber, setPhonenumber] = useState("");
  const [role, setRole] = useState(localStorage.getItem("role") || "student");

  useEffect(() => {
    if (token && !user) fetchMe();
  }, [token]);

  useEffect(() => {
    role
      ? localStorage.setItem("role", role)
      : localStorage.removeItem("role");
  }, [role]);

  // 🔹 Send OTP for Register
  const sendOtpForRegister = async (phone) => {
    try {
      const res = await axios.post(`${server}/send-otp-register`, { phonenumber: phone });
      setPhonenumber(phone);
      toast.success("OTP sent for registration");
      return { success: true };
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send OTP");
      return { success: false, message: err.response?.data?.message || "Failed" };
    }
  };

  // 🔹 Send OTP for Login
  const sendOtpForLogin = async (phone) => {
    try {
      const res = await axios.post(`${server}/send-otp-login`, { phonenumber: phone });
      setPhonenumber(phone);
      toast.success("OTP sent for login"); 
      return { success: true };
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send OTP");
      return { success: false, message: err.response?.data?.message || "Failed" };
    }
  };

  // 🔹 Verify OTP and Register
  const verifyOtpAndRegister = async (formData, otp, navigate) => {
    try {
      const res = await axios.post(`${server}/verify-otp-register`, {
        ...formData,
        otp,
        phonenumber,
      });
      const { token, user } = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      setToken(token);
      setUser(user);
      toast.success("Registered successfully");
      navigate("/dashboard");
      return { success: true };
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
      return { success: false, message: err.response?.data?.message || "Failed" };
    }
  };

  // 🔹 Verify OTP and Login
  const verifyOtpAndLogin = async (otp, navigate) => {
    try {
      const res = await axios.post(`${server}/verify-otp-login`, {
        phonenumber,
        otp,
      });
      const { token, user } = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      setToken(token);
      setUser(user);
      toast.success("Logged in successfully");
      console.log("Redirecting...")
      navigate("/dashboard");
      return { success: true };
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
      return { success: false, message: err.response?.data?.message || "Failed" };
    }
  };

  // 🔹 Fetch Logged-in User
  const fetchMe = async () => {
    if (!token) return;
    try {
      const res = await axios.get(`${server}/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data.user);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      return { success: true };
    } catch (err) {
      console.error("Fetch /me failed:", err);
      return { success: false, message: err.response?.data?.message || "Fetch failed" };
    }
  };

  // 🔹 Logout
  const logout = (navigate) => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    setToken("");
    setUser(null);
    setRole("student");
    setPhonenumber("");
    navigate("/login");
  };

  // 🔹 Update User Profile
  const updateUser = async (field, value) => {
    if (!token) return { success: false, message: "Not authenticated" };
    
    try {
      const res = await axios.put(`${server}/update-profile`, {
        [field]: value
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      if (res.data.success) {
        // Update user state with the returned user data from server
        const updatedUser = res.data.user;
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
        toast.success("Profile updated successfully");
        return { success: true };
      } else {
        toast.error(res.data.message || "Update failed");
        return { success: false, message: res.data.message || "Update failed" };
      }
    } catch (err) {
      console.error("Update profile failed:", err);
      const errorMessage = err.response?.data?.message || "Update failed";
      toast.error(errorMessage);
      return { success: false, message: errorMessage };
    }
  };

  // 🔹 Admin login
  const loginAsAdmin = (username, password, navigate) => {
    if (username === "admin" && password === "admin123") {
      setRole("admin");
      localStorage.setItem("role", "admin");
      toast.success("Admin login successful");
      navigate("/");
      return { success: true };
    } else {
      toast.error("Invalid admin credentials");
      return { success: false, message: "Invalid credentials" };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        phonenumber,
        sendOtpForRegister,
        sendOtpForLogin,
        verifyOtpAndRegister,
        verifyOtpAndLogin,
        fetchMe,
        logout,
        updateUser,
        role,
        loginAsAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

import React, { useState } from "react";
import axios from "axios";
import {
  Mail,
  Phone,
  MapPin,
  AlertCircle,
  CheckCircle,
  Clock,
  Eye,
  EyeOff,
} from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import toast, { Toaster } from "react-hot-toast";
import AdminLoginModal from "../components/AdminModal";

export default function Home() {
  const [activeTab, setActiveTab] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const API_BASE_URL = "https://csp-7ud9.onrender.com/api/users";

  const handleLoginChange = (e) =>
    setLoginData({ ...loginData, [e.target.name]: e.target.value });

  const handleRegisterChange = (e) =>
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });

  // ✅ Login Submit
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!loginData.email || !loginData.password) {
      toast.error("All fields are required ");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post(`${API_BASE_URL}/login`, loginData);
      toast.success("Login successful! Redirecting...");
      sessionStorage.setItem("user", JSON.stringify(res.data.user));
      setTimeout(() => (window.location.href = "/home"), 1500);
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed ");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Register Submit
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (
      !registerData.name ||
      !registerData.email ||
      !registerData.password ||
      !registerData.confirmPassword
    ) {
      toast.error("All fields are required ");
      setLoading(false);
      return;
    }
    if (registerData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      setLoading(false);
      return;
    }

    if (registerData.password !== registerData.confirmPassword) {
      toast.error("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      await axios.post(`${API_BASE_URL}/register`, {
        name: registerData.name,
        email: registerData.email,
        password: registerData.password,
      });
      toast.success("Registration successful! Switching to login...");
      setTimeout(() => {
        setActiveTab("login");
        setRegisterData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
      }, 1500);
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed ");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Dummy Google Button
  const handleGoogleClick = () => {
    toast("Google auth clicked!", { position: "top-center" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Toaster position="top-center" reverseOrder={false} />{" "}
      {/* Toast top-center */}
      {/* Header */}
      <header className="bg-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center font-bold">
              MC
            </div>
            <div>
              <h1 className="text-xl font-bold">
                Municipality Complaint System
              </h1>
              <p className="text-xs text-blue-200">Serving Your Community</p>
            </div>
          </div>
          <button
            onClick={() => setIsAdminModalOpen(true)}
            className="px-4 py-2 bg-orange-500 hover:bg-orange-600 rounded font-semibold transition"
          >
            Admin Portal
          </button>
          <AdminLoginModal
            isOpen={isAdminModalOpen}
            onClose={() => setIsAdminModalOpen(false)}
          />
        </div>

        {/* Marquee */}
        <div className="overflow-hidden relative bg-orange-500">
          <div className="whitespace-nowrap animate-marquee inline-block py-2">
            <span className="inline-block mr-12">
              Welcome to Municipality Complaint Portal • Report issues and track
              status in real-time • Your grievance is our priority • Efficient
              resolution guaranteed
            </span>
            <span className="inline-block mr-12">
              Welcome to Municipality Complaint Portal • Report issues and track
              status in real-time • Your grievance is our priority • Efficient
              resolution guaranteed
            </span>
          </div>
        </div>
      </header>
      <style>{`
  @keyframes marquee {
    0% { transform: translateX(0%); }
    100% { transform: translateX(-50%); }
  }
  .animate-marquee {
    display: inline-block;
    animation: marquee 10s linear infinite;
  }
`}</style>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Hero + Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Hero */}
            <section className="bg-white p-6 md:p-8 rounded-lg shadow-md border-l-4 border-blue-900">
              <h2 className="text-2xl md:text-3xl font-bold text-blue-900 mb-2">
                Report Municipal Issues Easily
              </h2>
              <p className="text-gray-600 mb-4 text-sm md:text-base">
                Submit complaints about municipal issues and track their status
                in real-time. Whether it's road damage, street lights, water
                supply, or waste management — we're here to help.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
                <div className="flex items-center gap-2 text-sm">
                  <AlertCircle className="text-orange-500" size={20} />
                  <span>Easy Reporting</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="text-blue-600" size={20} />
                  <span>Real-time Status</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="text-green-600" size={20} />
                  <span>Quick Resolution</span>
                </div>
              </div>
            </section>

            {/* Common Issues */}
            <section>
              <h3 className="text-xl md:text-2xl font-bold text-blue-900 mb-4">
                Common Issues
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Repeat each issue box */}
                <div className="bg-white p-4 rounded-lg shadow border-l-4 border-orange-500 hover:shadow-lg transition">
                  <h4 className="font-semibold text-gray-800">
                    Road & Street Damage
                  </h4>
                  <p className="text-sm text-gray-600 mt-2">
                    Report potholes, broken sidewalks, or street damage
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow border-l-4 border-blue-600 hover:shadow-lg transition">
                  <h4 className="font-semibold text-gray-800">Street Lights</h4>
                  <p className="text-sm text-gray-600 mt-2">
                    Report non-functional or damaged street lights
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow border-l-4 border-green-600 hover:shadow-lg transition">
                  <h4 className="font-semibold text-gray-800">
                    Water & Sanitation
                  </h4>
                  <p className="text-sm text-gray-600 mt-2">
                    Report water leaks or sewage issues
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow border-l-4 border-red-600 hover:shadow-lg transition">
                  <h4 className="font-semibold text-gray-800">
                    Waste Management
                  </h4>
                  <p className="text-sm text-gray-600 mt-2">
                    Report garbage collection or cleanliness issues
                  </p>
                </div>
              </div>
            </section>

            {/* Contact Info */}
            <section className="bg-gradient-to-r from-blue-900 to-blue-800 text-white p-4 md:p-6 rounded-lg">
              <h3 className="text-lg md:text-xl font-bold mb-4">
                Contact Information
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex items-start gap-3">
                  <Phone size={20} className="mt-1" />
                  <div>
                    <p className="text-sm font-semibold">Helpline</p>
                    <p className="text-base">1800-MUNICIPALITY</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail size={20} className="mt-1" />
                  <div>
                    <p className="text-sm font-semibold">Email</p>
                    <p className="text-base">complaints@municipality.gov</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin size={20} className="mt-1" />
                  <div>
                    <p className="text-sm font-semibold">Address</p>
                    <p className="text-sm">Municipal Office, City Center</p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1 w-full">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden sticky top-4">
              {/* Tabs */}
              <div className="flex border-b border-gray-200">
                <button
                  onClick={() => setActiveTab("login")}
                  className={`flex-1 py-3 font-semibold text-center text-sm transition ${
                    activeTab === "login"
                      ? "bg-blue-900 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Login
                </button>
                <button
                  onClick={() => setActiveTab("register")}
                  className={`flex-1 py-3 font-semibold text-center text-sm transition ${
                    activeTab === "register"
                      ? "bg-blue-900 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Register
                </button>
              </div>

              {/* Auth Form */}
              <div className="p-4 md:p-6">
                {/* Google Button */}
                <button
                  onClick={handleGoogleClick}
                  className="w-full flex items-center justify-center gap-2 bg-blue-900 hover:bg-blue-800 text-white font-bold py-2 rounded transition mb-5"
                >
                  <FcGoogle size={20} />
                  {activeTab === "login"
                    ? "Continue with Google"
                    : "Sign up with Google"}
                </button>

                {activeTab === "login" ? (
                  <form className="space-y-4">
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      value={loginData.email}
                      onChange={handleLoginChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-900 focus:border-transparent outline-none"
                    />
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Enter your password"
                        value={loginData.password}
                        onChange={handleLoginChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-900 focus:border-transparent outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
                      >
                        {showPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </div>
                    <button
                      onClick={handleLoginSubmit}
                      disabled={loading}
                      className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 text-white font-bold py-2 rounded transition"
                    >
                      {loading ? "Logging in..." : "Login"}
                    </button>
                  </form>
                ) : (
                  <form className="space-y-4">
                    <input
                      type="text"
                      name="name"
                      placeholder="Enter your full name"
                      value={registerData.name}
                      onChange={handleRegisterChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-900 focus:border-transparent outline-none"
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      value={registerData.email}
                      onChange={handleRegisterChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-900 focus:border-transparent outline-none"
                    />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Create a password"
                      value={registerData.password}
                      onChange={handleRegisterChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-900 focus:border-transparent outline-none"
                    />
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      placeholder="Confirm password"
                      value={registerData.confirmPassword}
                      onChange={handleRegisterChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-900 focus:border-transparent outline-none"
                    />
                    <button
                      onClick={handleRegisterSubmit}
                      disabled={loading}
                      className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 text-white font-bold py-2 rounded transition"
                    >
                      {loading ? "Registering..." : "Register"}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

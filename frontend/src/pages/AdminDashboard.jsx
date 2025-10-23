import React, { useState, useEffect } from "react";
import { AlertCircle, CheckCircle, Clock, Menu, X, LogOut } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

export default function AdminDashboard() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("All");
  const [error, setError] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const API_BASE_URL = "https://csp-7ud9.onrender.com/api/complaints";

  // Fetch all complaints
  const fetchAllComplaints = async () => {
    try {
      setLoading(true);
      const res = await fetch(API_BASE_URL);
      if (!res.ok) throw new Error("Failed to fetch complaints");
      const data = await res.json();
      setComplaints(data || []);
    } catch (err) {
      console.error(err);
      setError("Failed to load complaints");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllComplaints();
  }, []);

  const handleLogout = () => {
    toast.success("Logged out successfully!");
    sessionStorage.removeItem("user");
    setTimeout(() => (window.location.href = "/"), 1500);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "In Progress":
        return "bg-blue-100 text-blue-800 border-blue-300";
      case "Resolved":
        return "bg-green-100 text-green-800 border-green-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Pending":
        return <Clock size={16} />;
      case "In Progress":
        return <AlertCircle size={16} />;
      case "Resolved":
        return <CheckCircle size={16} />;
      default:
        return null;
    }
  };

  const filteredComplaints =
    filterStatus === "All"
      ? complaints
      : complaints.filter((c) => c.status === filterStatus);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Toaster position="top-center" reverseOrder={false} />
      {/* Navbar */}
      <nav className="bg-blue-900 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          {/* Desktop Navbar */}
          <div className="hidden md:flex items-center justify-between h-20">
            {/* Left - Logo */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center font-bold">
                MC
              </div>
              <div>
                <h1 className="text-lg font-bold">Admin Dashboard</h1>
                <p className="text-xs text-blue-200">System</p>
              </div>
            </div>

            {/* Right - Logout */}
            <div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-lg font-semibold transition"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          </div>

          {/* Mobile Navbar */}
          <div className="md:hidden flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center font-bold">
                MC
              </div>
              <div>
                <h1 className="text-lg font-bold">Admin</h1>
                <p className="text-xs text-blue-200">System</p>
              </div>
            </div>

            {/* Hamburger */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 hover:bg-blue-800 rounded transition"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden pb-4 space-y-3 bg-blue-900 text-white">
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded font-semibold transition"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          )}
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Welcome Section */}
        <section className="bg-gradient-to-r from-blue-900 to-blue-800 text-white p-8 rounded-lg shadow-lg mb-8">
          <h2 className="text-3xl font-bold mb-2">All Complaints Overview</h2>
          <p className="text-blue-100">
            Monitor and manage all municipal complaints from users
          </p>
        </section>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-600">
            <p className="text-gray-600 text-sm">Total Complaints</p>
            <p className="text-3xl font-bold text-blue-900">
              {complaints.length}
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-yellow-500">
            <p className="text-gray-600 text-sm">Pending</p>
            <p className="text-3xl font-bold text-yellow-600">
              {complaints.filter((c) => c.status === "Pending").length}
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
            <p className="text-gray-600 text-sm">In Progress</p>
            <p className="text-3xl font-bold text-blue-600">
              {complaints.filter((c) => c.status === "In Progress").length}
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-600">
            <p className="text-gray-600 text-sm">Resolved</p>
            <p className="text-3xl font-bold text-green-600">
              {complaints.filter((c) => c.status === "Resolved").length}
            </p>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="mb-6 flex flex-wrap gap-2">
          {["All", "Pending", "In Progress", "Resolved"].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                filterStatus === status
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        {/* All Complaints */}
        <section>
          <h3 className="text-2xl font-bold text-blue-900 mb-4">
            {filterStatus === "All"
              ? "All Complaints"
              : `${filterStatus} Complaints`}
          </h3>
          {error && (
            <p className="text-red-600 bg-red-100 p-4 rounded-lg mb-4">
              {error}
            </p>
          )}
          {loading ? (
            <p className="text-gray-600 text-center py-8">
              Loading complaints...
            </p>
          ) : filteredComplaints.length === 0 ? (
            <p className="text-gray-600 text-center py-8">
              No complaints found.
            </p>
          ) : (
            <div className="space-y-4">
              {filteredComplaints.map((complaint) => (
                <div
                  key={complaint.id}
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition border-l-4 border-blue-600"
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-gray-800 mb-2">
                        {complaint.title}
                      </h4>
                      <p className="text-sm text-gray-600 mb-2">
                        👤 User: {complaint.userId}
                      </p>
                      <p className="text-sm text-gray-600 mb-2">
                        📍 {complaint.location}
                      </p>
                      {complaint.description && (
                        <p className="text-sm text-gray-600 mb-2">
                          {complaint.description}
                        </p>
                      )}
                      <p className="text-xs text-gray-500">
                        Reported on{" "}
                        {new Date(complaint.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div
                      className={`px-4 py-2 rounded-full border flex items-center gap-2 font-semibold text-sm whitespace-nowrap ${getStatusColor(
                        complaint.status
                      )}`}
                    >
                      {getStatusIcon(complaint.status)}
                      {complaint.status}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

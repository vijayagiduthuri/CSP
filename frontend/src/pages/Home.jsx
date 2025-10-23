import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import ComplaintFormModal from "../components/ComplaintForm";
import { AlertCircle, CheckCircle, Clock, Plus } from "lucide-react";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";

export default function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [recentComplaints, setRecentComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  const loggedInUser = JSON.parse(sessionStorage.getItem("user"));
  const API_BASE_URL = "http://localhost:9000/api/complaints";

  // Fetch complaints for logged-in user
  const fetchComplaints = async () => {
    if (!loggedInUser || !loggedInUser.id) return;
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE_URL}/user/${loggedInUser.id}`);
      setRecentComplaints(res.data || []);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load complaints");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const handleComplaintSubmit = async (complaintData) => {
    if (!loggedInUser || !loggedInUser.id) return;

    try {
      setIsModalOpen(false);
      const res = await axios.post(`${API_BASE_URL}/create`, {
        ...complaintData,
        userId: loggedInUser.id,
      });
      toast.success("Complaint submitted successfully!");
      // Add the new complaint at the top
      setRecentComplaints((prev) => [res.data, ...prev]);
    } catch (error) {
      console.error(error);
      toast.error("Failed to submit complaint");
    }
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Toaster position="top-center" reverseOrder={false} />
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Welcome Section */}
        <section className="bg-gradient-to-r from-blue-900 to-blue-800 text-white p-8 rounded-lg shadow-lg mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Welcome Back, {loggedInUser ? loggedInUser.name : "User"}!
          </h1>
          <p className="text-blue-100">
            Track your municipal complaints and help us improve our community
          </p>
        </section>

        {/* Action Button & Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <button
            onClick={() => setIsModalOpen(true)}
            className="md:col-span-1 bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-6 rounded-lg shadow-md transition flex items-center justify-center gap-2 text-lg"
          >
            <Plus size={24} />
            Raise Complaint
          </button>

          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-600">
            <p className="text-gray-600 text-sm">Total Complaints</p>
            <p className="text-3xl font-bold text-blue-900">
              {recentComplaints.length}
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-yellow-500">
            <p className="text-gray-600 text-sm">Pending</p>
            <p className="text-3xl font-bold text-yellow-600">
              {recentComplaints.filter((c) => c.status === "Pending").length}
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-600">
            <p className="text-gray-600 text-sm">Resolved</p>
            <p className="text-3xl font-bold text-green-600">
              {recentComplaints.filter((c) => c.status === "Resolved").length}
            </p>
          </div>
        </div>

        {/* Recent Complaints */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-blue-900 mb-4">
            Your Recent Complaints
          </h2>
          {loading ? (
            <p className="text-gray-600">Loading complaints...</p>
          ) : recentComplaints.length === 0 ? (
            <p className="text-gray-600">No complaints found.</p>
          ) : (
            <div className="space-y-4">
              {recentComplaints.map((complaint) => (
                <div
                  key={complaint.id}
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition border-l-4 border-blue-600"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">
                        {complaint.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-1">
                        📍 {complaint.location}
                      </p>
                      {complaint.description && (
                        <p className="text-sm text-gray-600 mb-1">
                          {complaint.description}
                        </p>
                      )}
                      <p className="text-xs text-gray-500">
                        Reported on{" "}
                        {new Date(complaint.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div
                      className={`px-4 py-2 rounded-full border flex items-center gap-2 font-semibold text-sm ${getStatusColor(
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

      {/* Complaint Form Modal */}
      <ComplaintFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleComplaintSubmit}
      />
    </div>
    
  );
}

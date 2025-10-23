import React, { useState, useEffect } from "react";
import { AlertCircle, CheckCircle, Clock } from "lucide-react";
import Navbar from "../components/Navbar";
export default function MyComplaintsPage() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      setLoading(true);
      setErrorMessage("");
      const user = JSON.parse(sessionStorage.getItem("user"));

      if (!user || !user.id) {
        setErrorMessage("User not found. Please login again.");
        window.location.href = "/";
        return;
      }

      const response = await fetch(
        `http://localhost:9000/api/complaints/user/${user.id}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch complaints");
      }

      const data = await response.json();
      setComplaints(data || []);
    } catch (error) {
      console.error("Error fetching complaints:", error);
      setErrorMessage("Failed to load complaints. Please try again.");
    } finally {
      setLoading(false);
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
      case "Rejected":
        return "bg-red-100 text-red-800 border-red-300";
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
      case "Rejected":
        return <AlertCircle size={16} />;
      default:
        return null;
    }
  };

  const filteredComplaints =
    filter === "All"
      ? complaints
      : complaints.filter((c) => c.status === filter);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        
        {/* Header Section */}
        <section className="bg-gradient-to-r from-blue-900 to-blue-800 text-white p-8 rounded-lg shadow-lg mb-8">
          <h1 className="text-3xl font-bold mb-2">My Complaints</h1>
          <p className="text-blue-100">
            Manage and track all your municipal complaints in one place
          </p>
        </section>

        {/* Error Message */}
        {errorMessage && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
            {errorMessage}
          </div>
        )}

        {/* Filter Section */}
        <div className="bg-white p-4 rounded-lg shadow-md mb-6 flex flex-wrap gap-2">
          {["All", "Pending", "In Progress", "Resolved", "Rejected"].map(
            (status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded-lg font-semibold transition ${
                  filter === status
                    ? "bg-blue-900 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {status}
              </button>
            )
          )}
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-blue-600">
            <p className="text-gray-600 text-sm">Total Complaints</p>
            <p className="text-3xl font-bold text-blue-900">
              {complaints.length}
            </p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-yellow-500">
            <p className="text-gray-600 text-sm">Pending</p>
            <p className="text-3xl font-bold text-yellow-600">
              {complaints.filter((c) => c.status === "Pending").length}
            </p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-blue-500">
            <p className="text-gray-600 text-sm">In Progress</p>
            <p className="text-3xl font-bold text-blue-600">
              {complaints.filter((c) => c.status === "In Progress").length}
            </p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-green-600">
            <p className="text-gray-600 text-sm">Resolved</p>
            <p className="text-3xl font-bold text-green-600">
              {complaints.filter((c) => c.status === "Resolved").length}
            </p>
          </div>
        </div>

        {/* Complaints List */}
        <section>
          <h2 className="text-2xl font-bold text-blue-900 mb-4">
            {filter === "All" ? "All Complaints" : `${filter} Complaints`}
          </h2>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900"></div>
              <p className="text-gray-600 mt-4">Loading complaints...</p>
            </div>
          ) : filteredComplaints.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow-md">
              <AlertCircle size={48} className="mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600 text-lg">
                {filter === "All"
                  ? "No complaints found"
                  : `No ${filter.toLowerCase()} complaints`}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredComplaints.map((complaint) => (
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
                      <p className="text-sm text-gray-600 mb-1">
                        {complaint.description}
                      </p>
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

      {/* Detail Modal */}
      {isDetailModalOpen && selectedComplaint && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full p-6">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold text-gray-800">
                {selectedComplaint.title}
              </h2>
              <button
                onClick={() => setIsDetailModalOpen(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-sm font-semibold text-gray-600">Status</p>
                <div
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border font-semibold text-sm mt-1 ${getStatusColor(
                    selectedComplaint.status
                  )}`}
                >
                  {getStatusIcon(selectedComplaint.status)}
                  {selectedComplaint.status}
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold text-gray-600">Location</p>
                <p className="text-gray-800">📍 {selectedComplaint.location}</p>
              </div>

              <div>
                <p className="text-sm font-semibold text-gray-600">
                  Description
                </p>
                <p className="text-gray-800">{selectedComplaint.description}</p>
              </div>

              <div>
                <p className="text-xs text-gray-500">
                  Reported on{" "}
                  {new Date(selectedComplaint.createdAt).toLocaleString()}
                </p>
              </div>

              {selectedComplaint.image && (
                <div>
                  <p className="text-sm font-semibold text-gray-600 mb-2">
                    Image
                  </p>
                  <img
                    src={selectedComplaint.image}
                    alt="Complaint"
                    className="max-w-full h-auto rounded-lg"
                  />
                </div>
              )}
            </div>

            <button
              onClick={() => setIsDetailModalOpen(false)}
              className="w-full mt-6 bg-blue-900 text-white py-2 rounded-lg font-semibold hover:bg-blue-800 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

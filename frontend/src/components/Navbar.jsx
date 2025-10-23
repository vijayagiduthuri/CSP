import React, { useState } from "react";
import { Menu, X, LogOut } from "lucide-react";
import toast from "react-hot-toast";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    toast.success("Logged out successfully!");
    sessionStorage.removeItem("user");
    setTimeout(() => (window.location.href = "/"), 1500);
  };

  return (
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
              <h1 className="text-lg font-bold">Municipality Complaint</h1>
              <p className="text-xs text-blue-200">System</p>
            </div>
          </div>

          {/* Center - Links */}
          <div className="flex-1 flex justify-center gap-10">
            <a href="/home" className="hover:text-orange-400 transition font-semibold">
              Home
            </a>
            <a
              href="/my-complaints"
              className="hover:text-orange-400 transition font-semibold"
            >
              My Complaints
            </a>
            <a href="/about" className="hover:text-orange-400 transition font-semibold">
              About
            </a>
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
              <h1 className="text-lg font-bold">Municipality</h1>
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
            <a
              href="/home"
              className="block px-4 py-2 hover:bg-blue-800 rounded transition"
            >
              Home
            </a>
            <a
              href="/my-complaints"
              className="block px-4 py-2 hover:bg-blue-800 rounded transition"
            >
              My Complaints
            </a>
            <a
              href="/about"
              className="block px-4 py-2 hover:bg-blue-800 rounded transition"
            >
              About
            </a>
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
  );
}

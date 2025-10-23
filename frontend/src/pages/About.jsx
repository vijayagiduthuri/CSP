import React from "react";
import { Mail, Phone } from "lucide-react";
import Navbar from "../components/Navbar";

export default function AboutPage() {

  const features = [
    {
      title: "Real-time Tracking",
      description:
        "Track your complaints in real-time and get instant updates on the status of your grievances.",
    },
    {
      title: "Community Driven",
      description:
        "Our platform brings the community together to address municipal issues collectively.",
    },
    {
      title: "Transparent Process",
      description:
        "Complete transparency in complaint handling and resolution process for all users.",
    },
    {
      title: "24/7 Support",
      description:
        "Round-the-clock customer support to assist you with any queries or issues.",
    },
  ];

  const statistics = [
    { number: "50K+", label: "Active Users" },
    { number: "15K+", label: "Resolved Issues" },
    { number: "98%", label: "Satisfaction Rate" },
    { number: "24/7", label: "Support Available" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-900 to-blue-800 text-white p-12 rounded-lg shadow-lg mb-8">
          <h1 className="text-4xl font-bold mb-4">About Municipality Complaint System</h1>
          <p className="text-xl text-blue-100">
            Empowering communities to address municipal issues and create positive change
          </p>
        </section>

        {/* Mission & Vision */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white p-8 rounded-lg shadow-md border-l-4 border-blue-600">
            <h2 className="text-2xl font-bold text-blue-900 mb-4">Our Mission</h2>
            <p className="text-gray-700 leading-relaxed">
              To provide a transparent, efficient, and user-friendly platform that enables citizens
              to report municipal issues, track their status, and contribute to building better
              communities. We believe in the power of collective action and accountability.
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md border-l-4 border-orange-500">
            <h2 className="text-2xl font-bold text-blue-900 mb-4">Our Vision</h2>
            <p className="text-gray-700 leading-relaxed">
              To create a world where every citizen's voice matters and municipal governments are
              responsive to community needs. We envision smart cities where technology and civic
              engagement work together for the greater good.
            </p>
          </div>
        </section>

        {/* Statistics */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-blue-900 mb-8 text-center">Our Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {statistics.map((stat, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md text-center border-t-4 border-blue-600"
              >
                <p className="text-4xl font-bold text-blue-900 mb-2">{stat.number}</p>
                <p className="text-gray-600 font-semibold">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Features */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-blue-900 mb-8 text-center">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition text-center"
              >
                <h3 className="text-lg font-bold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section className="bg-blue-50 p-8 rounded-lg mb-12">
          <h2 className="text-3xl font-bold text-blue-900 mb-8 text-center">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: 1, title: "Report", desc: "Submit your complaint with details and photos" },
              { step: 2, title: "Track", desc: "Monitor the status of your complaint in real-time" },
              { step: 3, title: "Engage", desc: "Receive updates and communicate with authorities" },
              { step: 4, title: "Resolve", desc: "See your issue resolved and provide feedback" },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 bg-blue-900 text-white rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="font-bold text-gray-800 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section className="bg-white p-8 rounded-lg shadow-md border-l-4 border-blue-600 mb-12">
          <h2 className="text-3xl font-bold text-blue-900 mb-8">Get In Touch</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-start gap-4">
              <div>
                <h3 className="font-bold text-gray-800 mb-1">Address</h3>
                <p className="text-gray-600">
                  123 Municipal Plaza
                  <br />
                  City Center, State 12345
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Phone size={28} className="text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-gray-800 mb-1">Phone</h3>
                <p className="text-gray-600">
                  +1 (555) 123-4567
                  <br />
                  +1 (555) 987-6543
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Mail size={28} className="text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-gray-800 mb-1">Email</h3>
                <p className="text-gray-600">
                  info@municipality.gov
                  <br />
                  support@municipality.gov
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-blue-900 to-blue-800 text-white p-12 rounded-lg shadow-lg text-center">
          <h2 className="text-3xl font-bold mb-4">Join Us In Making A Difference</h2>
          <p className="text-xl text-blue-100 mb-8">
            Be part of a community that cares. Start reporting and tracking municipal issues today.
          </p>
          <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-lg transition text-lg">
            Get Started Now
          </button>
        </section>
      </div>
    </div>
  );
}
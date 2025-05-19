import React from "react";
import { Routes, Route } from "react-router-dom";
import CreateLeadPage from "./pages/CreateLeadPage";
import DisplayLead from "./pages/DisplayLead";

function App() {
  const handleLogin = () => {
    window.location.href = `${import.meta.env.VITE_BACKEND_URL}/auth/google`;
  };

  return (
    <Routes>
      {/* Landing Page at "/" */}
      <Route
        path="/"
        element={
          <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex flex-col items-center px-4 py-10 text-center overflow-y-auto">
            <div className="w-full max-w-5xl">
              {/* Header */}
              <div className="flex justify-end items-center mb-8">
                <button
                  onClick={handleLogin}
                  className="bg-blue-600 text-white font-medium px-5 py-2 rounded-lg shadow-md hover:bg-blue-700 transition-all"
                >
                  Get Started →
                </button>
              </div>

              {/* Main Title */}
              <h2 className="text-5xl md:text-6xl font-extrabold leading-tight text-gray-900">
                Relationships <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">Simplified</span>
              </h2>

              {/* Subheading */}
              <p className="mt-6 text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
                "Great relationships don't happen by chance but through consistent connection and care. Let technology handle the details while you focus on what truly matters."
              </p>

              {/* CTA Button */}
              <div className="mt-8">
                <button
                  onClick={handleLogin}
                  className="bg-blue-600 text-white text-lg font-semibold px-6 py-3 rounded-xl shadow-lg hover:bg-blue-700 transition-all"
                >
                  Transform Your Business Today
                </button>
              </div>

              {/* Features */}
              <div className="mt-16 grid gap-6 grid-cols-1 md:grid-cols-3">
                <div className="bg-white p-6 rounded-xl shadow-md">
                  <h3 className="font-bold text-lg mb-2">Centralized Data</h3>
                  <p className="text-gray-600">All your customer information in one accessible place</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-md">
                  <h3 className="font-bold text-lg mb-2">Actionable Insights</h3>
                  <p className="text-gray-600">Turn data into decisions that grow your business</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-md">
                  <h3 className="font-bold text-lg mb-2">Seamless Workflow</h3>
                  <p className="text-gray-600">Automate repetitive tasks and focus on relationships</p>
                </div>
              </div>

              {/* Footer */}
              <p className="mt-20 text-sm text-gray-500">© 2025 LEAD-LOG. All rights reserved.</p>
            </div>
          </div>
        }
      />
    </Routes>
  );
}

export default App;


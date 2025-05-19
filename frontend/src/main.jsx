import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import AuthSuccess from "./AuthSuccess";
import Dashboard from "./Dashboard";
import CreateLeadPage from "./pages/CreateLeadPage";
import DisplayLead from "./pages/DisplayLead";
import LeadDetailsPage from "./pages/LeadDetailsPage";
import Logout from "./components/Logout";
import ProtectedRoute from "./ProtectedRoute"; 

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      {/* Public */}  
      <Route path="/" element={<App />} />
      <Route path="/auth-success" element={<AuthSuccess />} />

      {/* Protected */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/create-lead"
        element={
          <ProtectedRoute>
            <CreateLeadPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/leads"
        element={
          <ProtectedRoute>
            <DisplayLead />
          </ProtectedRoute>
        }
      />
      <Route
        path="/leads/:id"
        element={
          <ProtectedRoute>
            <LeadDetailsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/logout"
        element={
          <ProtectedRoute>
            <Logout />
          </ProtectedRoute>
        }
      />
    </Routes>
  </BrowserRouter>
);

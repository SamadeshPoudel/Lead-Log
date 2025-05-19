import React, { useState } from "react";
import { createLead } from "../services/leadService";
import { UserPlus, Mail, Phone, Building2, Globe } from "lucide-react";

export default function LeadForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    website: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createLead(formData);
      alert("Lead created successfully!");
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        website: "",
      });
    } catch (error) {
      alert("Error creating lead");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-white to-blue-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-2xl px-8 py-10 w-full max-w-lg space-y-5"
      >
        <div className="flex flex-col items-center">
          <div className="bg-blue-100 p-4 rounded-full mb-2">
            <UserPlus className="text-blue-600" size={32} />
          </div>
          <h2 className="text-xl font-bold text-blue-700 mb-4">Add New Lead</h2>
        </div>

        {/* Name */}
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Full Name
          </label>
          <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
            <UserPlus className="text-gray-400 mr-2" size={20} />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter name"
              className="w-full outline-none bg-transparent text-gray-800"
              required
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Email
          </label>
          <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
            <Mail className="text-gray-400 mr-2" size={20} />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@email.com"
              className="w-full outline-none bg-transparent text-gray-800"
              required
            />
          </div>
        </div>

        {/* Phone */}
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Phone
          </label>
          <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
            <Phone className="text-gray-400 mr-2" size={20} />
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="(123) 456-7890"
              className="w-full outline-none bg-transparent text-gray-800"
            />
          </div>
        </div>

        {/* Company */}
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Company
          </label>
          <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
            <Building2 className="text-gray-400 mr-2" size={20} />
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="Company name"
              className="w-full outline-none bg-transparent text-gray-800"
            />
          </div>
        </div>

        {/* Website */}
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Website
          </label>
          <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
            <Globe className="text-gray-400 mr-2" size={20} />
            <input
              type="text"
              name="website"
              value={formData.website}
              onChange={handleChange}
              placeholder="www.example.com"
              className="w-full outline-none bg-transparent text-gray-800"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            className="w-full flex justify-center items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition"
          >
            <UserPlus size={18} />
            Add Lead
          </button>
        </div>
      </form>
    </div>
  );
}

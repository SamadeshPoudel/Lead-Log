import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LeadCard = ({ lead, onUpdate }) => {
  
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    name: lead.name,
    email: lead.email,
    phone: lead.phone,
    company: lead.company,
    website: lead.website,
    status: lead.status,
  });

  const navigate = useNavigate();
  // Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Save edited lead
  const handleSave = async () => {
    try {
        const token = localStorage.getItem("token");
      await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/leads/${lead._id}`, form,{
        headers: {
            Authorization: `Bearer ${token}`, // Add Authorization header
          },
      });
      setIsEditing(false);
      onUpdate(); // refresh leads
    } catch (err) {
      console.error("Error updating lead", err);
    }
  };

  // Delete lead
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this lead?")) return;

    try {
        const token = localStorage.getItem("token"); 
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/leads/${lead._id}`,{
        headers: {
            Authorization: `Bearer ${token}`, // Add Authorization header
          },
      });
      onUpdate(); // refresh leads
    } catch (err) {
      console.error("Error deleting lead", err);
    }
  };

  return (
    <div style={{ border: "1px solid gray", padding: "10px", margin: "10px 0" }}>
      {isEditing ? (
        <div>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Name"
          />
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
          />
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Phone"
          />
          <input
            name="company"
            value={form.company}
            onChange={handleChange}
            placeholder="Company"
          />
          <input
            name="website"
            value={form.website}
            onChange={handleChange}
            placeholder="Website"
          />
          <input
            name="status"
            value={form.status}
            onChange={handleChange}
            placeholder="Status"
          />

          <button onClick={handleSave}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      ) : (
        <div>
      <p>
  <strong>Name:</strong>{" "}
  <span
    style={{ color: "blue", cursor: "pointer", textDecoration: "underline" }}
    onClick={() => navigate(`/leads/${lead._id}`)} 
  >
    {lead.name}
  </span>
</p>
          <p><strong>Email:</strong> {lead.email}</p>
          <p><strong>Phone:</strong> {lead.phone}</p>
          <p><strong>Company:</strong> {lead.company}</p>
          <p><strong>Website:</strong> {lead.website}</p>
          <p><strong>Status:</strong> {lead.status}</p>

          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default LeadCard;

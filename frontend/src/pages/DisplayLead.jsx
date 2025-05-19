import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // <-- Add this

const DisplayLead = () => {
  const [leads, setLeads] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editLead, setEditLead] = useState(null);

  const getLeads = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/leads`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (Array.isArray(res.data)) setLeads(res.data);
      else if (Array.isArray(res.data.data)) setLeads(res.data.data);
      else setLeads([]);
    } catch (err) {
      console.error("Error fetching leads", err);
    }
  };

  useEffect(() => {
    getLeads();
  }, []);

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this lead?");
    if (!confirm) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/leads/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      getLeads();
    } catch (err) {
      console.error("Failed to delete lead", err);
    }
  };

  const handleEdit = (lead) => {
    setEditLead(lead);
    setIsEditing(true);
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/leads/${editLead._id}`,
        editLead,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setIsEditing(false);
      setEditLead(null);
      getLeads();
    } catch (err) {
      console.error("Error updating lead", err);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">All Leads</h2>

      {leads.length === 0 ? (
        <p>No leads found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border border-gray-300 shadow-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Company</th>
                <th className="p-2 border">Email</th>
                <th className="p-2 border">Phone</th>
                <th className="p-2 border">Website</th>
                <th className="p-2 border">Status</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead._id} className="text-center">
                  <td className="p-2 border text-blue-600 hover:underline cursor-pointer">
                    <Link to={`/leads/${lead._id}`}>{lead.name}</Link>
                  </td>
                  <td className="p-2 border">{lead.company}</td>
                  <td className="p-2 border">{lead.email}</td>
                  <td className="p-2 border">{lead.phone}</td>
                  <td className="p-2 border">{lead.website}</td>
                  <td className="p-2 border">{lead.status}</td>
                  <td className="p-2 border space-x-2">
                    <button
                      onClick={() => handleEdit(lead)}
                      className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(lead._id)}
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Edit Modal */}
      {isEditing && editLead && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
            <h3 className="text-xl font-semibold mb-4">Edit Lead</h3>

            <div className="space-y-3">
              {["name", "company", "email", "phone", "website", "status"].map((field) => (
                <div key={field}>
                  <label className="block text-sm font-medium capitalize">{field}</label>
                  <input
                    type="text"
                    value={editLead[field]}
                    onChange={(e) =>
                      setEditLead((prev) => ({ ...prev, [field]: e.target.value }))
                    }
                    className="w-full border border-gray-300 rounded p-2"
                  />
                </div>
              ))}
            </div>

            <div className="flex justify-end space-x-3 mt-5">
              <button
                onClick={() => {
                  setIsEditing(false);
                  setEditLead(null);
                }}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DisplayLead;

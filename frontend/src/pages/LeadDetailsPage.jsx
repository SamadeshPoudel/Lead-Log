import { useParams } from "react-router-dom";
import axios from "axios";
import React, { useEffect, useState } from "react";
import TaskSection from "../components/TaskSection";
import ActivitySection from "../components/ActivitySection";

export default function LeadDetailsPage() {
  const { id } = useParams();
  const [lead, setLead] = useState(null);

  useEffect(() => {
    const fetchLead = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/leads/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setLead(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchLead();
  }, [id]);

  if (!lead) return <p className="text-gray-500 p-4">Loading lead...</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-2xl shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Lead Details</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <p><span className="font-semibold text-gray-700">Name:</span> {lead.name}</p>
          <p><span className="font-semibold text-gray-700">Email:</span> {lead.email}</p>
          <p><span className="font-semibold text-gray-700">Phone:</span> {lead.phone}</p>
        </div>
        <div>
          <p><span className="font-semibold text-gray-700">Company:</span> {lead.company}</p>
          <p><span className="font-semibold text-gray-700">Website:</span> {lead.website}</p>
          <p><span className="font-semibold text-gray-700">Status:</span> {lead.status}</p>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-6">
        <TaskSection leadId={id} />
      </div>

      <div className="border-t border-gray-200 pt-6 mt-6">
        <ActivitySection leadId={id} />
      </div>
    </div>
  );
}

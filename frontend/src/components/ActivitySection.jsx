import React, { useState, useEffect } from "react";
import axios from "axios";

export default function ActivitySection({ leadId }) {
  const [activities, setActivities] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newContent, setNewContent] = useState("");

  const fetchActivities = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/activities?leadId=${leadId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setActivities(res.data);
    } catch (err) {
      console.log(err);
      setActivities([]);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, [leadId]);

  const addActivity = async () => {
    if (!newContent.trim()) return alert("Please enter content");
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/activities`,
        {
          leadId,
          content: newContent,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setNewContent("");
      setShowForm(false);
      fetchActivities();
    } catch (err) {
      console.error(err);
      alert("Failed to add activity");
    }
  };

  return (
    <div className="mt-6 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">Activities</h3>
        {!showForm && (
          <button
            className="bg-blue-600 text-white px-2 py-2 rounded hover:bg-blue-700"
            onClick={() => setShowForm(true)}
          >
            Add Activity
          </button>
        )}
      </div>
  
      {activities.length === 0 ? (
        <p className="text-gray-500">No activities yet.</p>
      ) : (
        <div className="space-y-3">
          {activities.map((a) => (
            <div
              key={a._id}
              className="border rounded-xl p-4 bg-white shadow-sm"
            >
              <div className="text-gray-800">{a.content}</div>
              <div className="text-sm text-gray-500 mt-1">
                {new Date(a.createdAt).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      )}
  
      {showForm && (
        <div className="space-y-3 border rounded-xl p-4 bg-gray-50">
          <textarea
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            placeholder="What happened? (e.g. Called lead, sent proposal...)"
            className="w-full min-h-[100px] p-2 border rounded-lg focus:outline-none focus:ring"
          />
          <div className="flex gap-2">
            <button
              className="px-4 py-2 bg-black text-white rounded-lg text-sm"
              onClick={addActivity}
            >
              Save
            </button>
            <button
              className="px-4 py-2 text-sm text-gray-700 border rounded-lg hover:bg-gray-100"
              onClick={() => setShowForm(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
  
}

import React, { useState } from "react";
import axios from "axios";

export default function TaskForm({ leadId, onTaskAdded }) {
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/tasks`,
        { title, dueDate, leadId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setTitle("");
      setDueDate("");
      onTaskAdded(); // tell parent to refresh tasks
    } catch (err) {
      console.error(err);
      alert("Error adding task");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h4>Add Task</h4>
      <input
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        required
      />
      <button type="submit">Add</button>
    </form>
  );
}

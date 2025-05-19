import React, { useState, useEffect } from "react";
import axios from "axios";
import TaskForm from "./TaskForm";

export default function TaskSection({ leadId }) {
  const [tasks, setTasks] = useState([]);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editTaskId, setEditTaskId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDueDate, setEditDueDate] = useState("");

  const fetchTasks = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/tasks?leadId=${leadId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setTasks(Array.isArray(res.data) ? res.data : res.data?.data || []);
    } catch (err) {
      console.log(err);
      setTasks([]);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [leadId]);

  const deleteTask = async (taskId) => {
    if (!confirm("Are you sure you want to delete this task?")) return;
    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/tasks/${taskId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      fetchTasks();
    } catch (err) {
      console.error(err);
      alert("Failed to delete task");
    }
  };

  const markTaskAsDone = async (taskId) => {
    try {
      const task = tasks.find((task) => task._id === taskId);
      if (!task) throw new Error("Task not found");

      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/tasks/${taskId}`,
        { status: "done" },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/activities`,
        {
          leadId: task.leadId,
          content: `${task.title}`,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      fetchTasks();
    } catch (err) {
      console.error(err);
      alert("Failed to mark task as done");
    }
  };

  const startEdit = (task) => {
    setEditTaskId(task._id);
    setEditTitle(task.title);
    setEditDueDate(new Date(task.dueDate).toISOString().substr(0, 10));
  };

  const cancelEdit = () => {
    setEditTaskId(null);
    setEditTitle("");
    setEditDueDate("");
  };

  const saveTaskEdit = async (taskId) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/tasks/${taskId}`,
        {
          title: editTitle,
          dueDate: editDueDate,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      cancelEdit();
      fetchTasks();
    } catch (err) {
      console.error(err);
      alert("Failed to update task");
    }
  };

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-gray-800">Tasks</h3>
        {!showTaskForm && (
          <button
            onClick={() => setShowTaskForm(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Add Task
          </button>
        )}
      </div>

      {tasks.length === 0 ? (
        <p className="text-gray-600">No tasks yet.</p>
      ) : (
        <ul className="space-y-4">
          {tasks.map((task) => (
            <li
              key={task._id}
              className="bg-gray-50 border border-gray-200 rounded p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between"
            >
              {editTaskId === task._id ? (
                <div className="flex flex-col sm:flex-row gap-2 sm:items-center w-full">
                  <input
                    className="border rounded px-3 py-2 w-full sm:w-1/2"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    placeholder="Task Title"
                  />
                  <input
                    type="date"
                    className="border rounded px-3 py-2 w-full sm:w-1/4"
                    value={editDueDate}
                    onChange={(e) => setEditDueDate(e.target.value)}
                  />
                  <div className="flex gap-2 mt-2 sm:mt-0">
                    <button
                      className="text-white bg-green-600 px-3 py-1 rounded hover:bg-green-700"
                      onClick={() => saveTaskEdit(task._id)}
                    >
                      Save
                    </button>
                    <button
                      className="text-gray-700 border border-gray-300 px-3 py-1 rounded hover:bg-gray-100"
                      onClick={cancelEdit}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div>
                    <p className="font-medium text-gray-800">{task.title}</p>
                    <p className="text-sm text-gray-600">
                      Due: {new Date(task.dueDate).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-500">Status: {task.status}</p>
                  </div>
                  <div className="flex gap-2 mt-3 sm:mt-0 sm:ml-4">
                    {task.status !== "done" && (
                      <button
                        className="text-white bg-blue-600 px-3 py-1 rounded hover:bg-blue-700"
                        onClick={() => markTaskAsDone(task._id)}
                      >
                        Done
                      </button>
                    )}
                    <button
                      className="text-white bg-yellow-500 px-3 py-1 rounded hover:bg-yellow-600"
                      onClick={() => startEdit(task)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-white bg-red-600 px-3 py-1 rounded hover:bg-red-700"
                      onClick={() => deleteTask(task._id)}
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      )}

      {showTaskForm && (
        <div className="mt-6">
          <TaskForm
            leadId={leadId}
            onTaskAdded={() => {
              fetchTasks();
              setShowTaskForm(false);
            }}
          />
        </div>
      )}
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { format, formatDistanceToNow } from "date-fns";
import {
  PlusCircle,
  Home,
  ClipboardList,
  Clock,
  LogOut,
  UserPlus,
  Mail,
  ListTodo,
  Eye,
} from "lucide-react";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [loadingTasks, setLoadingTasks] = useState(true);
  const [errorTasks, setErrorTasks] = useState(null);

  const [activities, setActivities] = useState([]);
  const [loadingActivities, setLoadingActivities] = useState(true);
  const [errorActivities, setErrorActivities] = useState(null);

  const [leadStats, setLeadStats] = useState({ totalLeads: 0, leadsThisWeek: 0 });

  const [tasksCount, setTasksCount] = useState(0);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/tasks/upcoming`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const upcomingTasks = Array.isArray(res.data)
          ? res.data
          : res.data.tasks || [];
        setTasks(upcomingTasks);
        console.log("Fetched upcoming tasks:", res.data);
      } catch (err) {
        setErrorTasks(err.message || "Failed to fetch tasks");
      } finally {
        setLoadingTasks(false);
      }
    };

    const fetchRecentActivities = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/activities/recent`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setActivities(res.data);
        console.log("Fetched recent activities:", res.data);
      } catch (err) {
        setErrorActivities(err.message || "Failed to fetch activities");
      } finally {
        setLoadingActivities(false);
      }
    };

    const fetchLeadStats = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/leads/stats`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setLeadStats(res.data);
      } catch (err) {
        console.error("Failed to fetch lead stats", err);
      }
    };

    const fetchTasksDueThisWeek = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/tasks/due-this-week`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log('Tasks Due Today API response:', response.data);
        setTasksCount(response.data.count);
      } catch (err) {
        console.error('Failed to fetch tasks due this week', err);
      }
    };

    fetchTasks();
    fetchRecentActivities();
    fetchLeadStats();
    fetchTasksDueThisWeek();
  }, []);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md hidden md:flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-indigo-600">LEAD-LOG</h1>
        </div>
        <div className="px-4 py-6">
          <Link
            to="/create-lead"
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition w-full justify-center"
          >
            <PlusCircle size={18} /> Create New
          </Link>
        </div>
        <nav className="px-4 space-y-3">
          <Link to="/dashboard" className="flex items-center gap-2 text-gray-700 hover:text-indigo-600"><Home size={18} /> Home</Link>
          <Link to="/leads" className="flex items-center gap-2 text-gray-700 hover:text-indigo-600"><ClipboardList size={18} /> Leads</Link>
          <Link to="/logout" className="flex items-center gap-2 text-gray-700 hover:text-indigo-600"><LogOut size={18} /> Logout</Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-6">
        <h2 className="text-3xl font-semibold mb-6 text-gray-800">Welcome back!</h2>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
  <div className="bg-white rounded-2xl shadow-md p-6">
    <h3 className="text-sm font-medium text-gray-500">Total Leads</h3>
    <p className="text-4xl font-bold text-indigo-600 mt-1">{leadStats.totalLeads}</p>
  </div>
  <div className="bg-white rounded-2xl shadow-md p-6">
    <h3 className="text-sm font-medium text-gray-500">Leads This Week</h3>
    <p className="text-4xl font-bold text-indigo-600 mt-1">{leadStats.leadsThisWeek}</p>
  </div>
  <div className="bg-white rounded-2xl shadow-md p-6">
    <h3 className="text-sm font-medium text-gray-500">Tasks Due This Week</h3>
    <p className="text-4xl font-bold text-indigo-600 mt-1">{tasksCount}</p>
  </div>
</div>


        {/* Layout: Left (Quick + Tasks) | Right (Activity) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Side: Quick Actions + Upcoming Tasks */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                <Link to="/create-lead" className="flex flex-col items-center justify-center p-4 bg-indigo-50 rounded-xl hover:bg-indigo-100 transition">
                  <UserPlus size={28} className="text-indigo-600" />
                  <span className="mt-2 text-sm font-medium text-indigo-800">Add Lead</span>
                </Link>
                <Link to="#" className="flex flex-col items-center justify-center p-4 bg-indigo-50 rounded-xl hover:bg-indigo-100 transition">
                  <ListTodo size={28} className="text-indigo-600" />
                  <span className="mt-2 text-sm font-medium text-indigo-800">Create Task</span>
                </Link>
                <Link to="/leads" className="flex flex-col items-center justify-center p-4 bg-indigo-50 rounded-xl hover:bg-indigo-100 transition">
                  <Eye size={28} className="text-indigo-600" />
                  <span className="mt-2 text-sm font-medium text-indigo-800">View Leads</span>
                </Link>
                <Link to="#" className="flex flex-col items-center justify-center p-4 bg-indigo-50 rounded-xl hover:bg-indigo-100 transition">
                  <Mail size={28} className="text-indigo-600" />
                  <span className="mt-2 text-sm font-medium text-indigo-800">Send Email</span>
                </Link>
              </div>
            </div>

            {/* Upcoming Tasks */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Upcoming Tasks</h3>
              {loadingTasks ? (
                <p className="text-sm text-gray-500">Loading tasks...</p>
              ) : errorTasks ? (
                <p className="text-sm text-red-500">{errorTasks}</p>
              ) : tasks.length === 0 ? (
                <p className="text-sm text-gray-500">No upcoming tasks.</p>
              ) : (
                <ul className="space-y-4 text-sm">
                  {tasks.map((task) => (
                    <li key={task._id} className="flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className={task.done ? "line-through text-gray-400" : "text-gray-700"}>
                          {task.title}
                        </span>
                        {task.leadId && (
                          <Link
                            to={`/leads/${task.leadId._id}`}
                            className="text-indigo-600 hover:underline text-xs mt-0.5"
                            title={`View details for ${task.leadId.name}`}
                          >
                            {task.leadId.name}
                          </Link>
                        )}
                      </div>
                      <span className="text-xs px-2 py-0.5 rounded bg-green-100 text-green-600">
                        {task.dueDate ? format(new Date(task.dueDate), "MMM d, yyyy") : "No date"}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Right Side: Recent Activity */}
          <div className="bg-white rounded-2xl shadow-md p-6 h-full">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h3>
            {loadingActivities ? (
              <p className="text-sm text-gray-500">Loading activities...</p>
            ) : errorActivities ? (
              <p className="text-sm text-red-500">{errorActivities}</p>
            ) : activities.length === 0 ? (
              <p className="text-sm text-gray-500">No recent activities.</p>
            ) : (
              <ul className="space-y-4 text-sm">
                {activities.map((activity) => (
                  <li key={activity._id} className="flex items-start gap-2">
                    <span className="w-2 h-2 mt-2 rounded-full bg-green-500" />
                    <span>
  <strong>{activity.content}</strong>
  <br />
  {activity.leadId && (
    <Link
      to={`/leads/${activity.leadId._id}`}
      className="text-indigo-600 text-xs hover:underline"
      title={`View lead: ${activity.leadId.name}`}
    >
      {activity.leadId.name}
    </Link>
  )}
  <br />
  <span className="text-xs text-gray-500">
    {formatDistanceToNow(new Date(activity.createdAt), { addSuffix: true })}
  </span>
</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

import axios from "axios";

const API_URL = `${import.meta.env.VITE_BACKEND_URL}/api/leads`;

export const createLead = async (leadData) => {
  const token = localStorage.getItem("token");
  const res = await axios.post(API_URL, leadData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

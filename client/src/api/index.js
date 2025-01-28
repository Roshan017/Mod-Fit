import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api/",
});

export const UserReg = async (data) => API.post("/user/signup", data);
export const UserLogin = async (data) => API.post("/user/signin", data);
export const getuserDashboard = async (token) =>
  API.get("/user/dashboard", {
    headers: { Authorization: `Bearer ${token}` },
  });
export const getWorkouts = async (token, date) => {
  try {
    const response = await API.get(`/user/workout${date}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("Workouts fetched successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching workouts:", error);
    throw error; // This will trigger the 500 error on the frontend
  }
};

export const addWorkout = async (token, data) =>
  await API.post(`/user/workout`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

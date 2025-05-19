import express from "express";
import passport from "passport";
import "./auth.js";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import leadRoutes from './routes/leadRoutes.js';
import taskRoutes from "./routes/taskRoutes.js";
import activityRoutes from "./routes/activityRoutes.js";

dotenv.config();

const app = express();

//middleware to parse JSON request, (wriiten after installing mongo)
app.use(express.json());

//middleware for CORS
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
//initialize passport
app.use(passport.initialize());

//connect to mongoDB
mongoose.connect(process.env.MONGO_URI)
.then(()=> console.log("Connected to MongoDB"))
.catch((err)=> console.log("MongoDB connection error:", err));

// Google login route
app.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// Callback route
app.get("/auth/google/callback", passport.authenticate("google", { session: false }),
  (req, res) => {
    const token = req.user.token;
    console.log("Redirecting to:", `${process.env.FRONTEND_URL}/auth-success?token=${token}`);
    res.redirect(`${process.env.FRONTEND_URL}/auth-success?token=${token}`);
  }
);

app.use('/api/leads', leadRoutes);

app.use("/api/tasks", taskRoutes);

app.use("/api/activities", activityRoutes);

// app.get("/api/protected", verifyJWT, (req, res) => {
//   res.json({ message: `Hello, ${req.user.name}` });
// });

app.listen(3000, () => console.log("Backend running at http://localhost:3000"));

import express from "express";
import { verifyJWT } from "../middleware/authMiddleware.js";
import { addActivity, getActivities, getRecentActivities } from "../controllers/activityController.js";

const router = express.Router();

router.post("/", verifyJWT, addActivity); // POST /api/activities
router.get("/", verifyJWT, getActivities); // GET /api/activities?leadId=xxx
router.get("/recent", verifyJWT, getRecentActivities);


export default router;
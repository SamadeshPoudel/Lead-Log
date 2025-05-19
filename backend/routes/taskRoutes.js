import express from "express";
import { createTask, getTasks, updateTask, deleteTask, getUpcomingTasks, getTasksDueThisWeek } from "../controllers/taskController.js";
import { verifyJWT } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", verifyJWT, createTask);
router.get("/", verifyJWT, getTasks);
router.put("/:id", verifyJWT, updateTask);
router.delete("/:id", verifyJWT, deleteTask);
router.get("/upcoming", verifyJWT, getUpcomingTasks);
router.get('/due-this-week', verifyJWT, getTasksDueThisWeek);



export default router;

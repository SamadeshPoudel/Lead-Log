import task from "../models/Task.js";
import lead from "../models/Lead.js";
import { startOfToday } from 'date-fns';

//create a task
export const createTask = async (req, res)=>{
    try {
        const {title, dueDate, leadId} = req.body;
        const userId = req.user._id;

        //check if lead exists and belong to the user
        const leadExists = await lead.findOne({_id: leadId, userId});
        if(!leadExists) return res.status(404).json({message:"Lead not found"});
        
        const newTask = await task.create({title, dueDate, leadId, userId});
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

//get tasks
export const getTasks = async (req, res)=>{
    try {
        const userId = req.user._id;
        const {leadId} = req.query;

        let filter = {userId};
        if (leadId) filter.leadId = leadId;

        const tasks = await task.find(filter).sort({dueDate: 1}).populate('leadId', 'name email phone'); //while populating the lead on displaying tasks, it will only show the data mentioned here
        res.json(tasks);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
};

//update tasks (mark as done or edit/date)
export const updateTask = async(req, res)=>{
    try {
        const userId = req.user._id;
        const {id} = req.params;
        const {title, dueDate, status} = req.body;

        const existingTask = await task.findOne({_id:id, userId});
        if(!existingTask) return res.status(404).json({message:"Task not found"});

        if(title) existingTask.title = title;
        if(dueDate) existingTask.dueDate = dueDate;
        if(status) existingTask.status = status;

        await existingTask.save();
        res.json(existingTask);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
};

//Delete task
export const deleteTask = async (req, res)=>{
    try {
        const userId = req.user._id;
        const {id} = req.params;

        const existingTask = await task.findOneAndDelete({_id:id, userId});
        if(!existingTask) return res.status(404).json({message:"Task not found"});

        res.json({message:"Task deleted"});
    } catch (err) {
        res.status(500).json({message:err.message});
    }
};

// GET /api/tasks/upcoming
export const getUpcomingTasks = async (req, res) => {
    try {
      const start = startOfToday(); // gets today at 00:00:00
  
      const upcomingTasks = await task.find({
        userId: req.user._id,
        status: "pending",
        dueDate: { $gte: start }
      })
        .sort({ dueDate: 1 })
        .limit(5)
        .populate('leadId', 'name');
  
      res.status(200).json(upcomingTasks);
    } catch (err) {
      console.error("Error in getUpcomingTasks:", err); // log for debugging
      res.status(500).json({ message: "Error fetching upcoming tasks", error: err.message });
    }
  };

  //Route to find task due today, for the frontend card
  
  export const getTasksDueThisWeek = async (req, res) => {
    try {
      const userId = req.user._id;
  
      const now = new Date();
      const startOfWeek = new Date(now);
      startOfWeek.setDate(now.getDate() - now.getDay()); // Sunday (or adjust if Monday is start)
      startOfWeek.setHours(0, 0, 0, 0);
  
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6); // Saturday
      endOfWeek.setHours(23, 59, 59, 999);
  
      const tasksDueThisWeek = await task.find({
        userId,
  status: "pending", // Only count pending tasks
  dueDate: { $gte: startOfWeek, $lte: endOfWeek }
      });
  
      res.status(200).json({ count: tasksDueThisWeek.length, tasks: tasksDueThisWeek });
    } catch (error) {
      console.error("Error fetching tasks due this week:", error);
      res.status(500).json({ message: "Error fetching tasks due this week" });
    }
  };
  
  
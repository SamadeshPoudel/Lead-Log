import activity from "../models/Activity.js";

// Add activity log
export const addActivity = async (req, res) => {
  try {
    const userId = req.user._id;
    const { leadId, content } = req.body;

    const newActivity = new activity({
      leadId,
      userId,
      content,
    });

    await newActivity.save();
    res.status(201).json({ message: "Activity added", activity: newActivity });
  } catch (error) {
    res.status(500).json({ message: "Error adding activity", error });
  }
};

// Get activity logs for a lead
export const getActivities = async (req, res) => {
  try {
    const userId = req.user._id;
    const { leadId } = req.query;

    if (!leadId) {
      return res.status(400).json({ message: "leadId query param is required" });
    }

    const activities = await activity.find({ leadId, userId })
      .sort({ createdAt: -1 }); // newest first

    res.status(200).json(activities);
  } catch (error) {
    res.status(500).json({ message: "Error fetching activities", error });
  }
};

//Recent activity of a user, to show in dashboard
export const getRecentActivities = async (req, res) => {
  try {
    const userId = req.user._id;

    // Find recent activities for user, populate lead info, limit e.g. 5 or 10
    const activities = await activity.find({ userId })
      .sort({ createdAt: -1 })
      .limit(6)
      .populate('leadId', 'name');

    res.status(200).json(activities);
  } catch (error) {
    res.status(500).json({ message: "Error fetching recent activities", error });
  }
};

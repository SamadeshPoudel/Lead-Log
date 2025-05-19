import lead from "../models/Lead.js";
import { startOfWeek } from "date-fns";

export const addLead = async (req, res) => {
    try {
        const userId = req.user?._id; // assuming you have req.user from auth middleware
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const {status, ...otherData} = req.body;

        const newLead = new lead({
            ...otherData,
            userId, // attach userId to the lead
            status: status || "New", 
        });

        await newLead.save();
        res.status(201).json({ message: "Lead added successfully", lead: newLead });
    } catch (error) {
        res.status(500).json({ message: "Error adding lead", error });
    }
};

export const getLeads = async (req, res) => {
    try {
        const userId = req.user?._id;
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const {status} = req.query;
        let filter = {userId};
        if(status){
            filter.status = status;
        }

        const leads = await lead.find(filter).sort({ createdAt: -1 });
        res.status(200).json(leads);
    } catch (error) {
        res.status(500).json({ message: "Error fetching leads", error });
    }
};

export const updateLeads = async(req, res)=>{
    try{
        const leadId = req.params.id;
        const userId = req.user._id;

        //only update if the leads belong to the user
        const updatedLead = await lead.findOneAndUpdate(
            {_id: leadId, userId: userId}, //condition
            req.body, //data to update
            {new: true} //return updated doc
        );

        if(!updatedLead){
            return res.status(404).json({message: "Lead not found or unauthorized"});
        }
        res.status(200).json({message: "Lead updated", lead: updatedLead});
    } catch(error){
        res.status(500).json({message: "Error updating lead", error});
    }
};

export const deleteLead = async(req, res)=>{
    try {
        const leadId = req.params.id;
        const userId = req.user._id;

        //only delete if the lead belongs to the user
        const deletedLead = await lead.findOneAndDelete({_id: leadId, userId: userId});

        if(!deletedLead){
            return res.status(404).json({message: "Lead not found or unauthorized"});
        }
        res.status(200).json({message: "Lead deleted", lead: deleteLead});

    } catch (error) {
        res.status(500).json({message:"Error deleting lead", error});
    }
};

//update lead status API
export const updateLeadStatus = async(req, res)=>{
    try {
        const leadId = req.params.id;
        const userId = req.user._id;
        const {status} = req.body;

        const validStatus = ["New", "Contacted", "Interested", "Not Interested", "Converted", "Lost"];
        if (!validStatus.includes(status)){
            return res.status(400).json({message:"Invalid status"});
        }

        const updatedLead = await lead.findOneAndUpdate(
            {_id: leadId, userId: userId},
            {status: status},
            {new: true}
        );

        if (!updatedLead) {
            return res.status(404).json({ message: "Lead not found or unauthorized" });
          }
      
          res.status(200).json({ message: "Lead status updated", lead: updatedLead });
    } catch (error) {
        res.status(500).json({ message: "Error updating lead status", error });
    }
}

//GET AN INDIVIDUAL LEAD WITH THEIR ID
export const getSingleLead = async(req, res)=>{
    try {
        const userId = req.user._id;
        const {id} = req.params;
        //FIND THE LEAD WHICH MATCHES THE ID AND BELONGS TO THIS USER
        const existingLead = await lead.findOne({_id: id, userId});

        if(!existingLead){
            return res.status(404).json({msg:"Lead not found"})
        } 
        res.json(existingLead);
    } catch (err) {
        res.status(500).json({msg:err.message});
    }
}

//route to get the lead stats (for dynamic cards on frontedn which displays the no. of leads added and added this week)

export const getLeadStats = async (req, res) => {
    try {
      const userId = req.user?._id;
  
      console.log("Authenticated User ID:", userId);
  
      if (!userId) {
        return res.status(401).json({ message: "User not authenticated" });
      }
  
      const totalLeads = await lead.countDocuments({ userId });
      console.log("Total Leads:", totalLeads);
  
      const weekStart = startOfWeek(new Date(), { weekStartsOn: 1 });
      console.log("Week starts on:", weekStart);
  
      const leadsThisWeek = await lead.countDocuments({
        userId,
        createdAt: { $gte: weekStart },
      });
      console.log("Leads This Week:", leadsThisWeek);
  
      return res.status(200).json({ totalLeads, leadsThisWeek });
    } catch (error) {
      console.error("Lead stats error:", error);
      return res.status(500).json({ message: "Error fetching lead stats", error });
    }
  };
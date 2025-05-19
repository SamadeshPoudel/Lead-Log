import express from "express";
import { addLead, deleteLead, getLeads, getSingleLead, updateLeads, updateLeadStatus, getLeadStats } from "../controllers/leadController.js";
import { verifyJWT } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post('/',verifyJWT, addLead);
router.get('/',verifyJWT,  getLeads);
router.put('/:id', verifyJWT, updateLeads);
router.delete('/:id', verifyJWT, deleteLead)

router.patch('/:id/status', verifyJWT, updateLeadStatus);

//getting individual lead route
router.get('/stats', verifyJWT, getLeadStats )
router.get('/:id', verifyJWT, getSingleLead);

export default router;
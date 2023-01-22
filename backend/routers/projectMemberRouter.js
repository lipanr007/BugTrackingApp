import express from "express";
import * as PMController from "../controllers/projectMemberController.js";

const router=express.Router();

router.get('/:userId/projectsPM', PMController.getProjectsByUserId);
router.post("/newPM", PMController.insertPMIntoDatabase); // insert
router.get("/pms", PMController.getAllPMFromDB);  // get all
router.get("/pms/:pmId", PMController.getPMFromDBById); // get by id
router.put("/pms/:pmId", PMController.updatePMFromDBById); // update by id
router.delete("/pms/deletePMS", PMController.deletePM); // delete
router.post("/newPMs", PMController.addProjectMembers);

export {router as ProjectMemberRouter};
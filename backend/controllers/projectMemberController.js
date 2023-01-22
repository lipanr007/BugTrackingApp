import { ProjectMember } from "../models/projectMember.js";
import {Op} from "sequelize"
import {Project}    from "../models/project.js"

// INSERT INTO METHOD
const insertPMIntoDatabase=async (req,res)=>{
    try {
        const pm = await ProjectMember.create({
            projectId:req.body.projectId,
            userId: req.body.userId,
            memberType: req.body.memberType
        });
        res.status(201).json({data: pm});
    } catch(err) {
        res.status(500).json(err) 
    }
}

// GET ALL
const getAllPMFromDB=async (req,res)=>{

    try{
        const projectMembers=await ProjectMember.findAll();
        return res.status(200).json(projectMembers);

    }
    catch(err)
    {
        res.status(500).json(err) 
    }
}

// GET BY ID
const getPMFromDBById=async (req,res)=>{
    try{
        const projectMember=await projectMember.findByPk(req.params.id);
        if(projectMember)
        {
            return res.status(200).json(projectMember);
        }
        else
        {
            return res.status(404).json({error:"Not Found"});
        }
    }
    catch(err){
        res.status(500).json(err);
    }
};

// UPDATE BY ID
const updatePMFromDBById = async (req, res)=>{
    try {
        const projectMember=await projectMember.findByPk(req.params.id);
        if(projectMember) {
            const updatedPM = await projectMember.update(req.body);
            return res.status(200).json(updatedPM);
        } else {
            return res
            .status(404)
            .json({error: 'Project Member with id ${req.params.id} not found'});
        }
    } catch(err) {
        res.status(500).json(err);
    }
}

// DELETE
const deletePM = async (req, res) => {
    try {
        const { projectId, memberType, userId } = req.body; // destructuring payload
        const deletedPm = await ProjectMember.destroy({
            where: {
                projectId: projectId,
                memberType: memberType,
                userId: userId
            }
        });
        if (deletedPm) {
            return res.status(200).json({ message: "Project Member deleted successfully!" });
        } else {
            return res.status(404).json({ error: "Project Member not found" });
        }
    } catch (err) {
        res.status(500).json({ message: "Error deleting Project Member", error: err });
    }
}

  const addProjectMembers = async (req, res) => {
    try {
        const projectId = req.body.projectId
        const selectedMembers = req.body.members
        const newPms = []
        for (const member of selectedMembers) {
            const newPm = await ProjectMember.create({
                projectId: projectId,
                userId: member.id,
                memberType: 'pm'
            })
            newPms.push(newPm)
        }
        res.status(201).json({ data: newPms })
    } catch (err) {
        res.status(500).json({ message: 'Error adding members to project', error: err })
    }
}

const getProjectsByUserId = async (req, res) => {
    try {
      const userId = req.params.id;
      const projects = await ProjectMember.findAll({
        where: {
            userId: userId,
            memberType: 'pm'
        },
        include: [{
            model: Project
        }]
    });
      res.status(200).json({ data: projects });
    } catch (err) {
      res.status(500).json({ message: "Error getting projects by user ID", error: err });
    }
  };

export
{
    insertPMIntoDatabase,
    getAllPMFromDB,
    getPMFromDBById,
    updatePMFromDBById,
    deletePM,
    addProjectMembers,
    getProjectsByUserId
}
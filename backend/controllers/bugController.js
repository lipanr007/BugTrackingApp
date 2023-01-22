import { Bug } from "../models/bug.js";
import {Op} from "sequelize"

//INSERT INTO METHOD
const insertBugIntoDatabase=async (req,res)=>{
        try {
            const bug = await Bug.create({
                //bugId:req.body.bugId,
                severity: req.body.severity,
                description: req.body.description,
                link: req.body.link,
                status: req.body.status,
                projectId:req.body.projectId
            });
            res.status(201).json({data: bug});
        } catch(err) {
            res.status(500).json(err) 
        }
}

// GET ALL
const getAllBugsFromDB=async (req,res)=>{

    try{
        const bugs=await Bug.findAll();
        return res.status(200).json(bugs);
    }
    catch(err)
    {
        res.status(500).json(err) 
    }
}

// GET BY ID
const getBugFromDBById=async (req,res)=>{
    try{
        const bug=await Bug.findByPk(req.params.id);
        if(bug)
        {
            return res.status(200).json(bug);
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

// UPDATE BUG BY ID
const updateBugFromDBById = async (req, res)=>{
    try {
        const bug=await Bug.findByPk(req.params.id);
        if(bug) {
            const updatedBug = await bug.update(req.body);
            return res.status(200).json(updatedBug);
        } else {
            return res
            .status(404)
            .json({error: 'Bug with id ${req.params.id} not found'});
        }
    } catch(err) {
        res.status(500).json(err);
    }
}

// DELETE
const deleteBug = async (req, res) => {
    try {
      const bug = await Bug.findByPk(req.params.id);
      if (bug) {
        await bug.destroy();
        return res.status(200).json("Entity deleted successfully!");
      } else {
        return res
          .status(404)
          .json({ error: `Bug with id ${req.params.id} not found` });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  };

  const getBugsByProjId=async(req,res) => {
    try {
    const selectedBugProjId = req.params.projectId;
    const bugs = await Bug.findAll({
        where: 
            {
            projectId: selectedBugProjId
            }
        });
        res.status(200).json({ data: bugs });
        } catch (err) {
        res.status(500).json({ message: "Error getting bugs by project ID", error: err });
        }

  };

export
{
    insertBugIntoDatabase,
    getAllBugsFromDB,
    getBugFromDBById,
    updateBugFromDBById,
    deleteBug,
    getBugsByProjId
};
import { Project } from '../models/project.js'
import { ProjectMember } from '../models/projectMember.js'
import { Op } from 'sequelize'

//INSERT INTO METHOD
const insertProjectIntoDatabase = async (req, res) => {
  try {
    const project = await Project.create({
      name: req.body.name,
      description: req.body.description,
      repository: req.body.repository,
    })
    res.status(201).json({ data: project, id: project.id })
  } catch (err) {
    res.status(500).json(err)
  }
}

// GET ALL
const getAllProjectsFromDB = async (req, res) => {
  try {
    const projects = await Project.findAll()
    return res.status(200).json(projects)
  } catch (err) {
    res.status(500).json(err)
  }
}

// GET BY ID
const getProjectFromDBById = async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id)
    if (project) {
      return res.status(200).json(project)
    } else {
      return res.status(404).json({ error: 'Not Found' })
    }
  } catch (err) {
    res.status(500).json(err)
  }
}

// UPDATE BY ID
const updateProjectFromDBById = async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id)
    if (project) {
      const updatedProject = await project.update(req.body)
      return res.status(200).json(updatedProject)
    } else {
      return res
        .status(404)
        .json({ error: 'Project with id ${req.params.id} not found' })
    }
  } catch (err) {
    res.status(500).json(err)
  }
}

// DELETE
const deleteProject = async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id)
    if (project) {
      await project.destroy()
      return res.status(200).json('Entity deleted successfully!')
    } else {
      return res
        .status(404)
        .json({ error: `Project with id ${req.params.id} not found` })
    }
  } catch (err) {
    res.status(500).json(err)
  }
}

const getProjectsByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;
    const projects = await Project.findAll({
      include: [
        {
          model: ProjectMember,
          where: { userId: userId, memberType: "pm" }
        }
      ]
    });
    res.status(200).json({ data: projects });
  } catch (err) {
    res.status(500).json({ message: "Error getting projects by user ID", error: err });
  }
};

const getProjectsByUserIdTST = async (req, res) => {
  try {
    const userId = req.params.userId;
    const projects = await Project.findAll({
      include: [
        {
          model: ProjectMember,
          where: { userId: userId, memberType: "tst" }
        }
      ]
    });
    res.status(200).json({ data: projects });
  } catch (err) {
    res.status(500).json({ message: "Error getting projects by user ID", error: err });
  }
};

export {
  insertProjectIntoDatabase,
  getAllProjectsFromDB,
  getProjectFromDBById,
  updateProjectFromDBById,
  deleteProject,
  getProjectsByUserId,
  getProjectsByUserIdTST
}

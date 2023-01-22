import { User } from '../models/user.js'
import { Op } from 'sequelize'
import { Project } from '../models/project.js'
import { ProjectMember } from '../models/projectMember.js'

// INSERT INTO METHOD
const insertUserIntoDatabase = async (req, res) => {
  try {
    const user = await User.create({
      id: req.body.id,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role,
    })
    res.status(201).json({ data: user })
  } catch (err) {
    res.status(500).json(err)
  }
}

//create endpoint for loginUser
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ where: { email: email } })
    if (user) {
      if (user.password === password) {
        res.status(200).json({ data: user })
      } else {
        res.status(401).json({ message: 'Invalid password.' })
      }
    } else {
      res.status(404).json({ message: 'Professor not found.' })
    }
  } catch (error) {
    next(error)
  }
}

// GET ALL
const getAllUsersFromDB = async (req, res) => {
  try {
    const users = await User.findAll()
    return res.status(200).json(users)
  } catch (err) {
    res.status(500).json(err)
  }
}

// GET BY ID
const getUserFromDBById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id)
    if (user) {
      return res.status(200).json(user)
    } else {
      return res.status(404).json({ error: 'Not Found' })
    }
  } catch (err) {
    res.status(500).json(err)
  }
}

// UPDATE BY ID
const updateUSerFromDBById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id)
    if (user) {
      const updatedUser = await user.update(req.body)
      return res.status(200).json(updatedUser)
    } else {
      return res
        .status(404)
        .json({ error: 'User with id ${req.params.id} not found' })
    }
  } catch (err) {
    res.status(500).json(err)
  }
}

// DELETE
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id)
    if (user) {
      await user.destroy()
      return res.status(200).json('Entity deleted successfully!')
    } else {
      return res
        .status(404)
        .json({ error: `User with id ${req.params.id} not found` })
    }
  } catch (err) {
    res.status(500).json(err)
  }
}

// GET PROJECTS BY USER ID
const getProjectsByUserID = async (req, res) => {
  try {
    const { userId } = req.params
    const projects = await Project.findAll({
      include: [
        {
          model: ProjectMember,
          where: {
            userId: userId,
            memberType: 'PM',
          },
        },
      ],
    })
    res.send(projects)
  } catch (err) {
    console.log(err)
    res.status(500).send({ message: 'Error getting projects for user' })
  }
}

// GET PROJECTS WHERE THE USER IS TESTER
const getProjectsTester = async (req, res, next) => {
  try {
    const userId = req.params.id
    const userRole = req.params.role === 'tester'
    const projects = await Project.findAll({
      where: { userId },
      where: { userRole },
      include: [
        {
          model: Project,
          as: 'project',
        },
      ],
    })
    if (projects.length === 0)
      res.status(404).json({ message: 'No projects found.' })
    else res.status(200).json({ data: projects })
  } catch (error) {
    next(error)
  }
}

const getUserById = async (req, res) => {
  try {
  } catch (e) {
    res.status(400).json(err)
  }
}

export {
  insertUserIntoDatabase,
  getAllUsersFromDB,
  getUserFromDBById,
  updateUSerFromDBById,
  deleteUser,
  getProjectsByUserID,
  getProjectsTester,
  loginUser,
}

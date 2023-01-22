import express from 'express'
import * as UserController from '../controllers/userController.js'
import { User } from '../models/user.js'

const router = express.Router()

router.post('/newUser', UserController.insertUserIntoDatabase) // insert
router.post('/login', UserController.loginUser)
router.get('/users', UserController.getAllUsersFromDB) // get all
router.get('/users/:userId', UserController.getUserFromDBById) // get by id
router.put('/users/:userId', UserController.updateUSerFromDBById) // update by id
router.delete('/users/:userId', UserController.deleteUser) // delete

router.get('/users/:userId/projects', UserController.getProjectsByUserID) // get projects by user Id

router.get('/users/:userId/projects/tester', UserController.getProjectsTester) // get projects where user role is tester

router.get('/user/:id', (req, res) => {
  User.findByPk(req.params.id)
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: 'User not found' })
      } else {
        res.send(user)
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err.message })
    })
})

export { router as UserRouter }

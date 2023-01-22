import { DataTypes } from 'sequelize'
import { sequelize } from '../sequelize.js'
// import { Project } from './Project.js'
// import { User } from './User.js'

const ProjectMember = sequelize.define('ProjectMember', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  memberType: {
    type: DataTypes.STRING,
  },
  projectId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
}, {
  timestamps: false
});



export { ProjectMember }
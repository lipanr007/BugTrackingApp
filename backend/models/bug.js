import { DataTypes } from 'sequelize'
import { sequelize } from '../sequelize.js'

const Bug = sequelize.define('Bug', {
  bugId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  severity: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  link: {
    type: DataTypes.STRING,
    allowNull: false,
    isUrl: true,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  projectId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
})

export { Bug }

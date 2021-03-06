const Sequelize = require('sequelize');
const db = require('../db');

const Adventure = db.define('adventure', {
  name: Sequelize.STRING,
  description: Sequelize.TEXT,
  location: Sequelize.STRING,
  locationCount: Sequelize.INTEGER,
  photoUrl: Sequelize.STRING,
  status: {
    type: Sequelize.ENUM('active', 'inactive'),
    defaultValue: 'inactive'
  }
})

module.exports = Adventure;

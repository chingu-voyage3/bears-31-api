"use strict"
module.exports = (sequelize, DataTypes) => {
  const Groups = sequelize.define("groups", {
    name: { type: DataTypes.STRING, allowNull: false }
  })

  Groups.associate = models => {
    // associations defined here
  }
  return Groups
}

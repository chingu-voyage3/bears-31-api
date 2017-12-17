"use strict"
module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define("users", {
    username: { type: DataTypes.STRING, unique: true },
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: { type: DataTypes.STRING, unique: true },
    indexes: [
      {
        unique: true,
        fields: ["username"]
      },
      {
        unique: true,
        fields: ["email"]
      }
    ]
  })

  Users.associate = models => {
    // associations can be defined here
  }
  return Users
}

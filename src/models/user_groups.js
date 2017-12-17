"use strict"
module.exports = (sequelize, DataTypes) => {
  const UserGroups = sequelize.define("user_groups", {
    user_id: DataTypes.UUID,
    group_id: DataTypes.UUID,
    is_admin: DataTypes.BOOLEAN
  })

  UserGroups.associate = models => {
    // associations here
  }
  return UserGroups
}

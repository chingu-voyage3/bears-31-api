"use strict"
module.exports = (sequelize, DataTypes) => {
  const Meetings = sequelize.define("meetings", {
    group_id: DataTypes.UUID,
    title: DataTypes.STRING,
    location: DataTypes.STRING,
    details: DataTypes.TEXT,
    due: DataTypes.DATE
  })
  Meetings.associate = models => {
    // associations can be defined here
  }
  return Meetings
}

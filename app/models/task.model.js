
module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define("task", {
    type: {
      type: DataTypes.STRING
    }
  })
  return Task
}
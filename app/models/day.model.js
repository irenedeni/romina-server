
module.exports = (sequelize, DataTypes) => {
  const Day = sequelize.define("day", {
    name: {
      type: DataTypes.STRING
    },
    date: {
      type: DataTypes.DATE
    }
  })
  return Day
}
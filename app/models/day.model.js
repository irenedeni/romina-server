
module.exports = (sequelize, DataTypes) => {
  const Day = sequelize.define("day", {
    date: {
      type: DataTypes.DATE
    }
  })
  return Day
}
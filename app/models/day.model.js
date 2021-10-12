
module.exports = (sequelize, Sequelize) => {
  const Day = sequelize.define("day", {
    name: {
      type: Sequelize.STRING
    },
    date: {
      type: Sequelize.DATE
    }
  })
  return Day
}

module.exports = (sequelize, DataTypes) => {
  const Day = sequelize.define("day", {
    name: {
      type: DataTypes.STRING
    },
    date: {
      type: DataTypes.DATE
    }
  })
  // Day.associate = function(models) {
  //   Day.belongsTo(models.Trip, {
  //     foreignKey: 'tripId'    
  //   })
  // }
  return Day
}
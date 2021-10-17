
module.exports = (sequelize, DataTypes) => {
  const Slot = sequelize.define("slot", {
    timeframe: {
      type: DataTypes.ENUM('morning', 'afternoon', 'evening', 'overnight', 'general/unknown')
    },
    stayType: {
      type: DataTypes.ENUM('quick check', 'extended stay')
    }
  })
  return Slot
}
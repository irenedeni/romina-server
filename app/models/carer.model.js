
module.exports = (sequelize, DataTypes) => {
  const Carer = sequelize.define("carer", {
    name: {
      type: DataTypes.STRING
    },
    phone: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING
    },
  })
  return Carer
}
// This Sequelize model represents the 'trips' table in PostgreSQL DB.
// It will generate the following columns:
// id, name, confirmed, createdAt, updatedAt.

module.exports = (sequelize, DataTypes) => {
  const Trip = sequelize.define("trip", {
    name: {
      type: DataTypes.STRING
    },
    confirmed: {
      type: DataTypes.BOOLEAN
    }
  })
  return Trip
}
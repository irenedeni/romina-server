// This Sequelize model represents the 'trips' table in PostgreSQL DB.
// It will generate the following columns:
// id, name, startDate, endDate, createdAt, updatedAt.

module.exports = (sequelize, Sequelize) => {
  const Trip = sequelize.define("trip", {
    name: {
      type: Sequelize.STRING
    },
    startDate: {
      type: Sequelize.DATE
    },
    endDate: {
      type: Sequelize.DATE
    },
    published: {
      type: Sequelize.BOOLEAN
    }
  })
  return Trip
}

// NOTE: After initializing Sequelize, there is no need to write CRUD functions, 
// Sequelize supports all of them:

// - create a new Trip: create(object)
// - find a Trip by id: findByPk(id)
// - get all Trips: findAll()
// - update a Trip by id: update(data, where: { id: id })
// - remove a Trip: destroy(where: { id: id })
// - remove all Trips: destroy(where: {})
// - find all Trips by name: findAll({ where: { name: ... } })

// These functions will be used in the Controller.
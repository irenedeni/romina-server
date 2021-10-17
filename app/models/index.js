const dbConfig = require("../config/db.config.js")

const Sequelize = require("sequelize")
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.trips = require('./trip.model.js')(sequelize, Sequelize)
db.days = require('./day.model.js')(sequelize, Sequelize)
db.slots = require('./slot.model.js')(sequelize, Sequelize)
db.carers = require('./carer.model.js')(sequelize, Sequelize)

// One-to-many Trip -> Days
db.trips.hasMany(db.days, {
  as: "days",
  foreignKey: "tripId"
})

db.days.belongsTo(db.trips, {
  foreignKey: "tripId",
  as: "trip"
})

// One-to-many Day -> Slots
db.days.hasMany(db.slots, {
  as: "slots",
  foreignKey: "dayId"
})

db.slots.belongsTo(db.days, {
  foreignKey: "dayId",
  as: "day"
})

// One-to-many Carer -> Slots
db.carers.hasMany(db.slots, {
  as: "slots",
  foreignKey: "slotId"
})

db.slots.belongsTo(db.carers, {
  foreignKey: "carerId",
  as: "carer"
})

module.exports = db

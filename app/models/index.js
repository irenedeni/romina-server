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

// one trip with many days
db.trips.hasMany(db.days, { as: "days", })

// that one day is associated with that one trip only
db.days.belongsTo(db.trips, {
  foreignKey: "tripId",
  as: "trip"
})

module.exports = db

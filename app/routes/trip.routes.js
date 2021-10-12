module.exports = app => {
  const trips = require("../controllers/trip.controller.js")
  const days = require("../controllers/day.controller.js")

  var router = require("express").Router()

  // create new trip
  router.post("/", trips.create)

  // create days for the new trip
  router.post("/", days.create)

  // retrieve all trips
  router.get("/", trips.findAll)

  // retrieve all published trips
  router.get("/published", trips.findAllPublished)

  // retrieve one trip with id
  router.get("/:id", trips.findOne)

  // retrieve all days from 1 single trip
  router.get("/:id", trips.findDaysByTripId)

  // update a trip with id
  router.put("/:id", trips.update)

  // delete a trip with id
  router.delete("/:id", trips.delete)

  // delete all trips
  router.delete("/", trips.deleteAll)

  app.use("/api/trips", router)
}

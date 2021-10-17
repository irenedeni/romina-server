module.exports = app => {
  const trips = require("../controllers/trip.controller.js")
  const days = require("../controllers/day.controller.js")
  const slots = require("../controllers/slot.controller.js")

  var router = require("express").Router()

  // create new trip (which also creates new days)
  router.post("/", trips.create)

  // create new slot
  router.post(("/:tripId/days/:id/slots"), slots.create)

  // retrieve all trips
  router.get("/", trips.findAll)
  
  // retrieve all confirmed trips
  router.get("/confirmed", trips.findAllConfirmed)

  // retrieve one trip with id, including days
  router.get(("/:tripId/days/:id"), days.findOne)

  // retrieve all days from a trip (only days)
  router.get("/:id", days.findOne)

  // update a trip with id
  router.put("/:id", trips.update)

  // delete a trip with id
  router.delete("/:id", trips.delete)

  // delete all trips
  router.delete("/", trips.deleteAll)

  app.use("/api/trips", router)
}

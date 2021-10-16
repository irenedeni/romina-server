module.exports = app => {
  const trips = require("../controllers/trip.controller.js")

  var router = require("express").Router()

  // create new trip
  router.post("/", trips.create)

  // // create days for the new trip
  // router.post("/", days.create)

  // retrieve all trips
  router.get("/", trips.findAll)

  // retrieve all confirmed trips
  router.get("/confirmed", trips.findAllConfirmed)

  // retrieve one trip with id, including days
  router.get("/:id", trips.findOne)

  // update a trip with id
  router.put("/edit/:id", trips.update)

  // delete a trip with id
  router.delete("/:id", trips.delete)

  // delete all trips
  router.delete("/", trips.deleteAll)

  app.use("/api/trips", router)
}

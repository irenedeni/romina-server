module.exports = app => {
  const trips = require("../controllers/trip.controller.js")
  var router = require("express").Router()

  console.log('router', router)

  // create new trip
  router.post("/", trips.create)

  // retrieve all trips
  router.get("/", trips.findAll)

  // retrieve all published trips
  router.get("/published", trips.findAllPublished)

  // retrieve one trip with id
  router.get("/:id", trips.findOne)

  // update a trip with id
  router.put("/:id", trips.update)

  // delete a trip with id
  router.delete("/:id", trips.delete)

  // delete all trips
  router.delete("/", trips.deleteAll)

  app.use("/api/trips", router)
}
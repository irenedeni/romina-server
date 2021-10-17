module.exports = app => {
  const trips = require("../controllers/trip.controller.js")
  const days = require("../controllers/day.controller.js")
  const slots = require("../controllers/slot.controller.js")
  const carers = require("../controllers/carer.controller.js")

  var router = require("express").Router()

  // ** CREATE ** 

  // trip (with days)
  router.post("/trips", trips.create)

  // slot
  router.post(("/:tripId/days/:id/slots"), slots.create)

  // carer
  router.post(("/carers"), carers.create)


  // ** GET ALL **
  // trips
  router.get("/trips", trips.findAll)
  
  // confirmed trips
  router.get("/trips/confirmed", trips.findAllConfirmed)

  // ** GET ONE **

  // trip with days
  router.get("/trips/:id", trips.findOne)

  // day 
  router.get(("/trips/:tripId/days/:id"), days.findOne)


  // ** UPDATE **
  // trip
  router.put("/trips/:id", trips.update)


  // ** DELETE ONE **
  // trip
  router.delete("/trips/:id", trips.delete)

  
  // ** DELETE ALL **
  // trips
  router.delete("/trips", trips.deleteAll)

  app.use("/api", router)
}

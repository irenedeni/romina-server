module.exports = app => {
  const trips = require("../controllers/trip.controller.js")
  const days = require("../controllers/day.controller.js")
  const slots = require("../controllers/slot.controller.js")
  const carers = require("../controllers/carer.controller.js")
  const tasks = require("../controllers/task.controller.js")

  var router = require("express").Router()

  // ** CREATE ** 
  // trip (with days)
  router.post("/trips", trips.create)

  // day
  router.post("/trips/:tripId/days", days.create)

  // slot
  router.post(("/trips/:tripId/days/:dayId/slots"), slots.create)

  // carer
  router.post(("/carers"), carers.create)

  // task
  router.post(("/tasks"), tasks.create)


  // ** GET ALL **
  // trips
  router.get("/trips", trips.findAll)

  // days
  // router.get("/trips/:tripId/days", days.findAll)
  
  // confirmed trips
  router.get("/trips/confirmed", trips.findAllConfirmed)


  // ** GET ONE **
  // trip with days
  router.get("/trips/:id", trips.findOne)

  // day 
  router.get(("/trips/:tripId/days/:id"), days.findOne)

  // slot 
  router.get(("/trips/:tripId/days/:dayId/slots/:id"), slots.findOne)


  // ** UPDATE **
  // trip
  router.put("/trips/:id", trips.update)

  // day
  router.put("/trips/:tripId/days/:id", days.update)

  // slot
  router.put("/trips/:tripId/days/:dayId/slots/:id", slots.update)

  // add task to slot
  router.put("/trips/:tripId/days/:dayId/slots/:slotId/tasks/:taskId", slots.addTask)


  // ** DELETE ONE **
  // trip (and days)
  router.delete("/trips/:id", trips.delete)

  // day (and slots)
  router.delete("/trips/:tripId/days/:id", days.delete)

  // slot
  router.delete("/trips/:tripId/days/:dayId/slots/:id", slots.delete)

  
  // ** DELETE ALL **
  // trips
  router.delete("/trips", trips.deleteAll)

  app.use("/api", router)
}

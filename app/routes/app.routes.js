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
  router.post(("/days/:dayId/slots"), slots.create)

  // carer
  router.post(("/carers"), carers.create)

  // task
  router.post(("/tasks"), tasks.create)


  // ** GET ALL **
  // trips
  router.get("/trips", trips.findAll)

  // confirmed trips
  router.get("/trips/confirmed", trips.findAllConfirmed)

  // carers
  router.get("/carers", carers.findAll)

  // tasks
  router.get("/tasks", tasks.findAll)

  // days
  // router.get("/trips/:tripId/days", days.findAll)


  // ** GET ONE **
  // trip with days
  router.get("/trips/:id", trips.findOne)

  // day 
  router.get(("/trips/:tripId/days/:id"), days.findOne)

  // slot 
  router.get(("/days/:dayId/slots/:id"), slots.findOne)

  // carer 
  router.get(("/carers/:id"), carers.findOne)

  // task 
  router.get(("/tasks/:id"), tasks.findOne)


  // ** UPDATE **
  // trip
  router.put("/trips/:id", trips.update)

  // day
  router.put("/trips/:tripId/days/:id", days.update)

  // slot
  router.put("/days/:dayId/slots/:id", slots.update)

  // add task to slot
  router.put("/slots/:slotId/tasks/:taskId", slots.addTaskToSlot)

  // carer 
  router.put(("/carers/:id"), carers.update)

  // task 
  router.put(("/tasks/:id"), tasks.update)


  // ** DELETE ONE **
  // trip (and days)
  router.delete("/trips/:id", trips.delete)

  // day (and slots)
  router.delete("/trips/:tripId/days/:id", days.delete)

  // slot
  router.delete("/slots/:id", slots.delete)

  // carer 
  router.delete(("/carers/:id"), carers.delete)

  // task 
  router.delete(("/tasks/:id"), tasks.delete)

  // delete task / slot entry
  router.delete("/slots/:slotId/tasks/:taskId", slots.removeTaskToSlot)

  
  // ** DELETE ALL **
  // trips
  router.delete("/trips", trips.deleteAll)

  // carer 
  router.put(("/carers"), carers.deleteAll)

  // task 
  router.put(("/tasks"), tasks.deleteAll)

  app.use("/api", router)
}

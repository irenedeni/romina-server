const moment = require('moment')

const tripFunctions = require("../lib/daysAndTrips.js")
const dayController = require("./day.controller")

const db = require("../models")
const Trip = db.trips
const Day = db.days
const Slot = db.slots
const Carer = db.carers
const Task = db.tasks

const Op = db.Sequelize.Op

// create & save new trip
exports.create = (req, res) => {
  const request = req.body ? req.body : req
  
    // Validate request
    if (!request.name) {
      res.status(400).send({
        message: "Content can't be empty!"
      })
      return
    }

    const startDate = moment(request.startDate)
    const endDate = moment(request.endDate)
    if(startDate > endDate){
      console.log("ERROR: End date can't be before start date")
      res.status(400).send({
        message: "End date can't be before the start date"
      })
      return
    }

    // Create a Trip
    const trip = {
      name: request.name,
      confirmed: request.confirmed ? request.confirmed : false
    }
    // Save Trip in db
    Trip.create(trip)
      .then(trip => {
        console.log("Created trip: " + JSON.stringify(trip, null, 4))
        const daysArray = tripFunctions.createDaysFromTrip(request.startDate, request.endDate)
        daysArray && daysArray.length && daysArray.map(date => {
          day = {
            date: date,
            tripId: trip.id
          }
          Day.create(day)
          .then(day => {
            console.log("Created day" + JSON.stringify(day, null, 4))
            return day
          })
          .catch(e => {
            console.log(e)
          })
        })
      if(!daysArray || daysArray.length < 1){
        console.log(`There was an error while creating days in trip '${request.name}'`)
      }
      return trip
      })
      .catch(e => {
        console.log(e)
      })
      return trip
  }

  // get all trips from DB (including days)
exports.findAll = (req, res) => {

  const name = req.query.name
  var condition = name ? { name: {[Op.iLike]: `%${name}`} } : null

  Trip.findAll({ 
    where: condition, 
    include: [{
      model: Day,
      as: "days"
    }]
  })
  .then(data => {
    res.send(data)
  })
  .catch(e => {
    res.status(500).send({
      message: e.message || "Some error occurred while retrieving trips."
    })
  })
}

// find a single trip by id, including days
exports.findOne = (req, res) => {
  const id = req.params.id
  Trip.findByPk(id, { 
    include: [{
      model: Day,
      as: "days",
      include: [{
        model: Slot,
        as: "slots",
        include: [
          {
            model: Carer,
            as: "carer",
            foreignKey: "carerId"
          },
          {
            model: Task,
            through: "tasksSlots",
            as: "tasks",
            foreignKey: "slotId"
          }
      ]
      }]
    }]
  })
  .then(data => {
    if(data) {
      data.days?.sort(tripFunctions.sortDatesInArrayOfObjects)
      res.send(data)
    } else {
      res.status(400).send({
        message: `Cannot find Trip with id=${id}`
      })
    }
  })
  .catch(e => {
    res.status(500).send({
      message: e.message || "Error retrieving trip with id=" + id
    })
  })
}


// update trip by id (only name! To update trip length, delete or create days)
exports.update = (req, res) => {
  const id = req.params.id
  console.log("ïd", id)
  Trip.update(req.body, {
    where: { id: id }
  })
  .then(num => {
    if(num == 1){
     res.send({
        message: "Trip was updated successfully"
      })
    } else {
      res.send({
        message: `Can't find trip with id=${id}`
      })
    }
  })
  .catch(e => {
    res.status(500).send({
      message: e.message || "Error while updating trip with id=" + id
    })
  })

  // const allDaysArray = req.body?.days?.map(day => day.date)
  // allDaysArray.sort(tripFunctions.sortDatesInArray)
  // console.log("allDaysArray",allDaysArray)
  // const firstDay = new Date(allDaysArray[0])
  // const lastDay = new Date(allDaysArray[allDaysArray.length - 1])

  // const startDate = new Date(req.body.startDate)
  // const endDate = new Date (req.body.endDate)


  // if(firstDay > startDate || endDate > lastDay){
  //   const extraDaysBeginning = tripFunctions.getDatesWithinRange(startDate, firstDay)
  //   const extraDaysEnd = tripFunctions.getDatesWithinRange(lastDay, endDate)

  //   const dateRange = extraDaysBeginning.concat(extraDaysEnd)
    
  //   console.log("dateRange",dateRange)
  //   dateRange && dateRange.map(date => {
  //     const day = {
  //       name: "name",
  //       date: date,
  //       tripId: id
  //     }
  //     Day.create(day)
  //     .then(day => {
  //       console.log("Created day" + JSON.stringify(day, null, 4))
  //       return day
  //     })
  //   })
  //   console.log("we need to create days")
    
  // } else if (firstDay < startDate || endDate < lastDay) {
  //   console.log("we need to remove days")
  // } else console.log("no change - no need to do anything")
}

// delete trip by id 
exports.delete = (req, res) => {
  const id = req.params.id
  Trip.destroy({
    where: { id: id },
    cascade: true
  })
  .then(num => {
    Day.destroy({
      where: { tripId: id },
      cascade: true
    })
    if(num == 1){
      res.send({
        message: "Trip was deleted successfully"
      })
    } else {
      res.send({
        message: `There was an error while deleting trip with id=${id}`
      })
    }
  })
  .catch(e => {
    res.status(500).send({
      message: e.message || "Could not delete trip with id=" + id
    })
  })
}

// delete all trips from DB
exports.deleteAll = (req, res) => {
  Trip.destroy({
    where: {},
    truncate: false
  })
  .then(nums => {
    res.send({ 
      message: `${nums} trips were deleted successfully`
    })
  })
  .catch(e => {
    res.status(500).send({
      message: e.message || "Some error occurred while removing all trips"
    })
  })
}

// find all confirmed trips
exports.findAllConfirmed = (req, res) => {
  Trip.findAll({ where: { confirmed: true }})
  .then(data => {
    res.send(data)
  })
  .catch(e => {
    res.status(500).send({
      message: e.message || "Some error occurred while retrieving confirmed trips"
    })
  })
} 
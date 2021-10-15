const createDaysFromTrip = require("../lib/createDaysFromTrip")

const db = require("../models")
const Trip = db.trips
const Day = db.days
const Op = db.Sequelize.Op

// create & save new trip
exports.create = (req, res) => {

    // Validate request
    if (!req.name) {
      res.status(400).send({
        message: "Content can't be empty!"
      });
      return;
    }

    // Create a Trip
    const trip = {
      name: req.name,
      confirmed: req.confirmed ? req.confirmed : false
    }
  
    // Save Trip in db
    Trip.create(trip)
      .then(trip => {
        console.log("Created trip: " + JSON.stringify(trip, null, 4))
        const daysArray = createDaysFromTrip(req.startDate, req.endDate)
        daysArray && daysArray.length && daysArray.map(date => {
      console.log("TRIP ID",trip.id)
      day = {
        name: "day",
        date: date,
        tripId: trip.id
      }
      Day.create(day)
      .then(day => {
        console.log("created day" + JSON.stringify(day, null, 4))
        return day
      })
      .catch(e => {
        console.log(e)
      })
    })
    if(!daysArray || daysArray.length < 1){
      console.log(`There was an error while creating days in trip '${req.name}'`)
    }
      })
      .catch(e => {
        console.log(e)
      })
      return trip
  }

  // get all trips from DB
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

// find a single trip by id
exports.findOne = (req, res) => {
  const id = req.params.id
  Trip.findByPk(id, { 
    include: [{
      model: Day,
      as: "days"
    }]
  })
  .then(data => {
    if(data) {
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
// find trip by id
exports.findTripById = () => {
  const id = req.params.id

  return Trip.findByPk(id, { include: [{
    model: Day,
    as: "days"
  }]})
  .then(trip => {
    console.log("Found trip:", trip)
    return trip
  })
  .catch(e => console.log("Error while retrieving trip ", e))
}


// update trip by id
exports.update = (req, res) => {
  const id = req.params.id
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
}

// delete trip by id
exports.delete = (req, res) => {
  const id = req.params.id
  Trip.destroy({
    where: { id: id }
  })
  .then(num => {
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
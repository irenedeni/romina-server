const db = require("../models")
const Trip = db.trips
const Op = db.Sequelize.Op

// create & save new trip
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    // Create a Trip
    const trip = {
      name: req.body.name,
      startDate: req.body.startDate,
      endDate: req.body.endDate
    };
  
    // Save Trip in DB
    Trip.create(trip)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the trip."
        });
      });
  };

// get all trips from DB
exports.findAll = (req, res) => {

}

// find a single trip by id
exports.findOne = (req, res) => {

}

// update trip by id
exports.update = (req, res) => {

}

// delete trip by id
exports.delete = (req, res) => {

}

// delete all trips from DB
exports.deleteAll = (req, res) => {

}

// find all published trips
exports.findAllPublished = (req, res) => {

}
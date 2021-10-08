const db = require("../models")
const Trip = db.trips
const Op = db.Sequelize.Op

// create & save new trip
exports.create = (req, res) => {
  console.log("request in create Trip", req.body )
    // Validate request
    if (!req.body.name) {
      res.status(400).send({
        message: "Content can't be empty!"
      });
      return;
    }
  
    // Create a Trip
    const trip = {
      name: req.body.name,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      published: req.body.published ? req.body.published : false
    };
  
    // Save Trip in 
    Trip.create(trip)
      .then(data => {
        res.send(data);
      })
      .catch(e => {
        res.status(500).send({
          message: e.message || "Some error occurred while creating the trip."
        });
      });
  };

// get all trips from DB
exports.findAll = (req, res) => {
  console.log("req in findall",req.query)
  console.log("res in findall",res)

  const name = req.query.name
  var condition = name ? { name: {[Op.iLike]: `%${name}`} } : null

  // req.query.name to get query string from the Request 
  // and consider it as condition for findAll() method.
  Trip.findAll({ where: condition })
  .then(data => {
    console.log('data', data)
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
  Trip.findByPk(id)
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

// find all published trips
exports.findAllPublished = (req, res) => {
  Trip.findAll({ where: { published: true }})
  .then(data => {
    res.send(data)
  })
  .catch(e => {
    res.status(500).send({
      message: e.message || "Some error occurred while retrieving published trips"
    })
  })
} 
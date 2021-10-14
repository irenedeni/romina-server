const db = require("../models")
const Day = db.days
const Op = db.Sequelize.Op

// exports.create = (req, res) => {
//   // Validate request
//   if (!req.body.name) {
//     res.status(400).send({
//       message: "Content can't be empty!"
//     });
//     return;
//   }

//   // Create a Trip
//   const trip = {
//     name: req.body.name,
//     startDate: req.body.startDate,
//     endDate: req.body.endDate,
//     published: req.body.published ? req.body.published : false
//   };

//   // Save Trip in 
//   Trip.create(trip)
//     .then(trip => {
//       res.send(trip)
//       return trip
//     })
//     .catch(e => {
//       res.status(500).send({
//         message: e.message || "Some error occurred while creating the trip."
//       });
//     });
// };

// _____

// create & save new day
exports.create = (tripId, singleDay) => {  
  const day = {
    name: singleDay.name,
    date: singleDay.date,
    tripId: tripId
  }

  Day.create(day)
    .then(day => {
      console.log("Created day: " + JSON.stringify(day, null, 4))
      return day
    })
    .catch(e => {
      console.log("Error while creating comment: ", e)
    })
  }


// get days for a given trip id
// exports.findDaysByTripId = (tripId) => {
//   return Trip.findByPk(tripId, { include: ["days"] })
//   .then(trip => {
//     return trip
//   })
//   .catch(e => {
//     console.log("Error while finding trip: ", e);
//   })
// }

// // find a single trip by id
// exports.findOne = (req, res) => {
//   const id = req.params.id
//   Trip.findByPk(id)
//   .then(data => {
//     if(data) {
//       res.send(data)
//     } else {
//       res.status(400).send({
//         message: `Cannot find Trip with id=${id}`
//       })
//     }
//   })
//   .catch(e => {
//     res.status(500).send({
//       message: e.message || "Error retrieving trip with id=" + id
//     })
//   })
// }

// // update trip by id
// exports.update = (req, res) => {
//   const id = req.params.id
//   Trip.update(req.body, {
//     where: { id: id }
//   })
//   .then(num => {
//     if(num == 1){
//       res.send({
//         message: "Trip was updated successfully"
//       })
//     } else {
//       res.send({
//         message: `Can't find trip with id=${id}`
//       })
//     }
//   })
//   .catch(e => {
//     res.status(500).send({
//       message: e.message || "Error while updating trip with id=" + id
//     })
//   })
// }

// // delete trip by id
// exports.delete = (req, res) => {
//   const id = req.params.id
//   Trip.destroy({
//     where: { id: id }
//   })
//   .then(num => {
//     if(num == 1){
//       res.send({
//         message: "Trip was deleted successfully"
//       })
//     } else {
//       res.send({
//         message: `There was an error while deleting trip with id=${id}`
//       })
//     }
//   })
//   .catch(e => {
//     res.status(500).send({
//       message: e.message || "Could not delete trip with id=" + id
//     })
//   })
// }

// // delete all trips from DB
// exports.deleteAll = (req, res) => {
//   Trip.destroy({
//     where: {},
//     truncate: false
//   })
//   .then(nums => {
//     res.send({ 
//       message: `${nums} trips were deleted successfully`
//     })
//   })
//   .catch(e => {
//     res.status(500).send({
//       message: e.message || "Some error occurred while removing all trips"
//     })
//   })
// }

// // find all published trips
// exports.findAllPublished = (req, res) => {
//   Trip.findAll({ where: { published: true }})
//   .then(data => {
//     res.send(data)
//   })
//   .catch(e => {
//     res.status(500).send({
//       message: e.message || "Some error occurred while retrieving published trips"
//     })
//   })
// } 
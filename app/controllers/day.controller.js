const db = require("../models")
const Day = db.days
const Slot = db.slots
const Carer = db.carers

exports.create = (req, res) => {
  const request = req.body ? req.body : req
  const tripId = req.params.tripId

    if (!request.date) {
      res.status(400).send({
        message: "Content can't be empty!"
      })
      return
    }

    const day = {
      tripId: tripId,
      date: request.date,
    }
  
    Day.create(day)
      .then(day => {
        console.log("Created day: " + JSON.stringify(day, null, 4))
        return day
      })
      .catch(e => {
        console.log(e)
      })
    return day
}

// exports.findAll = (req, res) => {
//   Day.findAll({ 
//     include: [{
//       model: Slot,
//       as: "slots"
//     }]
//   })
//   .then(data => {
//     res.send(data)
//   })
//   .catch(e => {
//     res.status(500).send({
//       message: e.message || "Some error occurred while retrieving trips."
//     })
//   })
// }

exports.findOne = (req, res) => {
  const id = req.params.id
  Day.findByPk(id, { 
    include: [
    {
      model: Slot,
      as: "slots",
      include: [
        {
          model: Carer,
          as: "carer",
          foreignKey: "carerId"
        },
      ]
    },
  ]
  })
  .then(data => {
    if(data) {
      res.send(data)
    } else {
      res.status(400).send({
        message: `Cannot find day with id=${id}`
      })
    }
  })
  .catch(e => {
    res.status(500).send({
      message: e.message || "Error retrieving trip with id=" + id
    })
  })
}

exports.update = (req, res) => {
  const id = req.params.id
  Day.update(req.body, {
    where: { id: id }
  })
  .then(num => {
    if(num == 1){
     res.send({
        message: "Day was updated successfully"
      })
    } else {
      res.send({
        message: `Can't find day with id=${id}`
      })
    }
  })
  .catch(e => {
    res.status(500).send({
      message: e.message || "Error while updating day with id=" + id
    })
  })
}

exports.delete = (req, res) => {
  const id = req.params.id
  Day.destroy({
    where: { id: id }
  })
  .then(num => {
    Slot.destroy({
      where: { dayId: id }
    })
    if(num == 1){
      res.send({
        message: "Day was deleted successfully"
      })
    } else {
      res.send({
        message: `There was an error while deleting day with id=${id}`
      })
    }
  })
  .catch(e => {
    res.status(500).send({
      message: e.message || "Could not delete day with id=" + id
    })
  })
}

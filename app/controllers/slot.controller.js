const db = require("../models")
const Slot = db.slots
const Task = db.tasks

exports.create = (req, res) => {
  const request = req.body ? req.body : req
  const dayId = req.params.dayId
    if (!request.timeframe) {
      res.status(400).send({
        message: "Content can't be empty!"
      })
      return
    }

    const slot = {
      dayId: dayId,
      timeframe: request.timeframe,
      stayType: request.stayType,
      carerId: request.carerId,
      notes: request.notes
    }
  
    Slot.create(slot)
      .then(slot => {
        console.log("Created slot: " + JSON.stringify(slot, null, 4))
        return slot
      })
      .catch(e => {
        console.log(e)
      })
    return slot
}

exports.addTask = (req, res) => {
  const slotId = req.params.slotId
  const taskId = req.params.taskId

  return Slot.findByPk(slotId)
    .then((slot) => {
      if (!slot) {
        console.log("Slot not found!")
        return null
      }
      return Task.findByPk(taskId).then((task) => {
        if (!task) {
          console.log("Task not found!")
          return null
        }
        slot.addTask(task)
        console.log(`>> added Task id=${task.id} to Slot id=${slot.id}`)
        return slot
      })
    })
    .catch((err) => {
      console.log(">> Error while adding Task to a Slot: ", err)
    })
}

exports.findOne = (req, res) => {
  const id = req.params.id
  Slot.findByPk(id)
  .then(data => {
    if(data) {
      console.log("Found slot: " + JSON.stringify(data, null, 4))
      res.send(data)
    } else {
      res.status(400).send({
        message: `Cannot find slot with id=${id}`
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
  Slot.update(req.body, {
    where: { id: id }
  })
  .then(num => {
    if(num == 1){
     res.send({
        message: "Slot was updated successfully"
      })
    } else {
      res.send({
        message: `Can't find slot with id=${id}`
      })
    }
  })
  .catch(e => {
    res.status(500).send({
      message: e.message || "Error while updating slot with id=" + id
    })
  })
}

exports.delete = (req, res) => {
  const id = req.params.id
  Slot.destroy({
    where: { id: id }
  })
  .then(num => {
    if(num == 1){
      res.send({
        message: "Slot was deleted successfully"
      })
    } else {
      res.send({
        message: `There was an error while deleting slot with id=${id}`
      })
    }
  })
  .catch(e => {
    res.status(500).send({
      message: e.message || "Could not delete day with id=" + id
    })
  })
}

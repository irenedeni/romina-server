const db = require("../models")
const Task = db.tasks

exports.create = (req, res) => {
  const request = req.body ? req.body : req
    if (!request.type) {
      res.status(400).send({
        message: "Content can't be empty!"
      })
      return
    }

    const task = {
      type: request.type
    }
  
    Task.create(task)
      .then(task => {
        console.log("Created task: " + JSON.stringify(task, null, 4))
        return task
      })
      .catch(e => {
        console.log(e)
      })
    return task
}

exports.findOne = (req, res) => {
  const id = req.params.id
  Task.findByPk(id)
  .then(data => {
    if(data) {
      console.log("Found task: " + JSON.stringify(data, null, 4))
      res.send(data)
    } else {
      res.status(400).send({
        message: `Cannot find task with id=${id}`
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
  Task.update(req.body, {
    where: { id: id }
  })
  .then(num => {
    if(num == 1){
     res.send({
        message: "Task was updated successfully"
      })
    } else {
      res.send({
        message: `Can't find task with id=${id}`
      })
    }
  })
  .catch(e => {
    res.status(500).send({
      message: e.message || "Error while updating task with id=" + id
    })
  })
}

exports.delete = (req, res) => {
  const id = req.params.id
  Task.destroy({
    where: { id: id }
  })
  .then(num => {
    if(num == 1){
      res.send({
        message: "Task was deleted successfully"
      })
    } else {
      res.send({
        message: `There was an error while deleting task with id=${id}`
      })
    }
  })
  .catch(e => {
    res.status(500).send({
      message: e.message || "Could not delete day with id=" + id
    })
  })
}

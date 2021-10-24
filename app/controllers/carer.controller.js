const db = require("../models")
const Carer = db.carers
const Op = db.Sequelize.Op


exports.create = (req, res) => {
  const request = req.body ? req.body : req
    // Validate request
    if (!request.name) {
      res.status(400).send({
        message: "Content can't be empty!"
      })
      return
    }
    const carer = {
      name: request.name,
      email: request.email ? request.email : "",
      phone: request.phone ? request.phone : "",
      professional: request.professional ? request.professional : false
    }
  
    Carer.create(carer)
      .then(carer => {
        console.log("Created carer: " + JSON.stringify(carer, null, 4))
        return carer
      })
      .catch(e => {
        console.log(e)
      })
    return carer
  }


  exports.findAll = (req, res) => {

    const name = req.query.name
    var condition = name ? { name: {[Op.iLike]: `%${name}`} } : null
  
    Carer.findAll({ 
      where: condition
    })
    .then(data => {
      console.log("CARER!!!", data)
      res.send(data)
    })
    .catch(e => {
      res.status(500).send({
        message: e.message || "Some error occurred while retrieving carers."
      })
    })
  }

  exports.findOne = (req, res) => {
    console.log("req", req)
    const id = req.params.id
    Carer.findByPk(id)
    .then(data => {
      if(data) {
        console.log("Found carer: " + JSON.stringify(data, null, 4))
        res.send(data)
      } else {
        res.status(400).send({
          message: `Cannot find carer with id=${id}`
        })
      }
    })
    .catch(e => {
      res.status(500).send({
        message: e.message || "Error retrieving carer with id=" + id
      })
    })
  }
  
  exports.update = (req, res) => {
    const id = req.params.id
    Carer.update(req.body, {
      where: { id: id }
    })
    .then(num => {
      if(num == 1){
       res.send({
          message: "Carer was updated successfully"
        })
      } else {
        res.send({
          message: `Can't find carer with id=${id}`
        })
      }
    })
    .catch(e => {
      res.status(500).send({
        message: e.message || "Error while updating carer with id=" + id
      })
    })
  }

  exports.delete = (req, res) => {
    const id = req.params.id
    Carer.destroy({
      where: { id: id },
    })
    .then(num => {
      if(num == 1){
        res.send({
          message: "Carer was deleted successfully"
        })
      } else {
        res.send({
          message: `There was an error while deleting carer with id=${id}`
        })
      }
    })
    .catch(e => {
      res.status(500).send({
        message: e.message || "Could not delete carer with id=" + id
      })
    })
  }
  
  // delete all carers from DB
  exports.deleteAll = (req, res) => {
    Carer.destroy({
      where: {},
      truncate: false
    })
    .then(nums => {
      res.send({ 
        message: `${nums} carers were deleted successfully`
      })
    })
    .catch(e => {
      res.status(500).send({
        message: e.message || "Some error occurred while removing all carers"
      })
    })
  }
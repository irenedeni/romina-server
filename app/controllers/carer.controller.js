const db = require("../models")
const Carer = db.carers

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
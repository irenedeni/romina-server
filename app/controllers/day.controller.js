const db = require("../models")
const Day = db.days


exports.findOne = (req, res) => {
  console.log("req.params", req.params)
  const id = req.params.id
  Day.findByPk(id)
  .then(data => {
    console.log("DATA", data)
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
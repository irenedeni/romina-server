const db = require("../models")
const Slot = db.slots


exports.create = (req, res) => {
  const request = req.body ? req.body : req
  console.log("req", req.timeframe)
  const dayId = req.params.id
  console.log("dayId", dayId)
    // Validate request
    if (!request.timeframe) {
      res.status(400).send({
        message: "Content can't be empty!"
      })
      return
    }

    // Create a Slot
    const slot = {
      dayId: dayId,
      timeframe: request.timeframe,
      stayType: request.stayType
    }
  
    // Save Slot in db
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
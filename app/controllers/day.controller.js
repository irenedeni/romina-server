const db = require("../models")
const Day = db.days
const Op = db.Sequelize.Op

// create & save new day
exports.create = (req, res) => {
  const request = req.body ? req.body : req
  
    // Validate request
    if (!request.name) {
      res.status(400).send({
        message: "Content can't be empty!"
      })
      return
    }

    const startDate = moment(request.startDate)
    const endDate = moment(request.endDate)
    if(startDate > endDate){
      console.log("ERROR: End date can't be before start date")
      res.status(400).send({
        message: "End date can't be before the start date"
      })
      return
    }

    // Create a Trip
    const trip = {
      name: request.name,
      confirmed: request.confirmed ? request.confirmed : false
    }
  
    // Save Trip in db
    Trip.create(trip)
      .then(trip => {
        console.log("Created trip: " + JSON.stringify(trip, null, 4))
        const daysArray = tripFunctions.createDaysFromTrip(request.startDate, request.endDate)
        daysArray && daysArray.length && daysArray.map(date => {
          day = {
            name: "day",
            date: date,
            tripId: trip.id
          }
          Day.create(day)
            .then(day => {
              console.log("Created day" + JSON.stringify(day, null, 4))
              return day
            })
      .catch(e => {
        console.log(e)
      })
    })
    if(!daysArray || daysArray.length < 1){
      console.log(`There was an error while creating days in trip '${request.name}'`)
    }
      })
      .catch(e => {
        console.log(e)
      })
      return trip
  }
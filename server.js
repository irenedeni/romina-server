const express = require('express')
const cors = require('cors')
const tripController = require("./app/controllers/trip.controller");
const dayController = require("./app/controllers/day.controller");

const app = express()

// middleware for Express to enable CORS. Origin to frontend app.
var corsOptions = {
	origin: "http://localhost:8081"
}

app.use(cors(corsOptions))

// parse requests for json content-type to create req.body object
app.use(express.json())

// parse requests for www-url content-type
app.use(express.urlencoded({
	extended: true
}))

const db = require("./app/models")

// run below is just for testing
const run = async () => {

	await tripController.create({
		name: "irene 10",
		startDate: new Date(),
		endDate: new Date(),
		published: true
	})

	await dayController.create(1, {
		name: "thursday",
		date: new Date(),
		tripId: 1
	})

}

// drop table if it already exists, useful for development
db.sequelize.sync
// ({ force: true })
()
.then(() => {
  console.log("Drop DB (when force=true) and re-sync")

	// run() below is just for testing. 
	// run()
	// await tripController.findAll()

	// await tripController.findTripById(1)
})

// basic route
app.get("/", (req, res) => {
	res.json({ message: "Welcome to the Romina application" })
})

// set the routes for the app
require('./app/routes/trip.routes')(app)
// set port and listen for requests
const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})
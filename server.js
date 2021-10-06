const express = require('express')
const cors = require('cors')

const app = express()

// middleware for Express to enable CORS. Origin to frontend app.
const corsOptions = {
	origin: "http://localhost:3000"
}

app.use(cors(corsOptions))

// parse requests for json content-type to create req.body object
app.use(express.json())

// parse requests for www-url content-type
app.use(express.urlencoded({
	extended: true
}))

// basic route
app.get("/", (req, res) => {
	res.json({ message: "Welcome to the Romina application" })
})

// set port and listen for requests
const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})
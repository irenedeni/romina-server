module.exports = {
	HOST: "localhost",
	USER: "postgres",
	PASSWORD: "romina123",
	DB: "rominadb",
	dialect: "postgres",
	// pool: {
	// 	max: 5,
	// 	min: 0,
	// 	acquire: 30000,
	// 	idle: 10000
	// }
}

// "pool" is used for Sequelize connection pool config. 
// Max/min=max&min num of connections in pool,
// idle = max time in millisecs that a connection can be idle before being released
// acquire = max time in millisecs that pool will try to get connection before throwing error
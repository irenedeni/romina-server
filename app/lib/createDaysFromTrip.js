var moment = require('moment')

module.exports = (start, end) => {
  let dateArray = []
  let startDate = moment(start)
  const endDate = moment(end)
  while(startDate <= endDate){
    dateArray.push(moment(startDate).format("YYYY-MM-DD"))
    startDate = moment(startDate).add(1, "days")
  }
  return dateArray
}
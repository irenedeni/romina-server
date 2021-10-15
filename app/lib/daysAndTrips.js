const moment = require('moment')

const createDaysFromTrip = (start, end) => {
  let dateArray = []
  let startDate = moment(start)
  const endDate = moment(end)
  while(startDate <= endDate){
    dateArray.push(moment(startDate).format("YYYY-MM-DD"))
    startDate = moment(startDate).add(1, "days")
  }
  return dateArray
}


const getDatesWithinRange = (start, end) => {
  const startDate = new Date(start)
  const endDate = new Date(end)
  for(var arr=[]; startDate < endDate; startDate.setDate(startDate.getDate()+1)){
    arr.push(new Date(startDate))
  }
  return arr
}



module.exports = { createDaysFromTrip, getDatesWithinRange }
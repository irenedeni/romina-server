const moment = require('moment')

const createDaysFromTrip = (start, end) => {
  let dateArray = []
  let startDate = moment(start)
  const endDate = moment(end)
  while(startDate <= endDate){
    dateArray.push(moment(startDate).format("YYYY-MM-DD HH:mm:ss"))
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

const sortDatesInArray = (date1, date2) => {
  if(date1 > date2) return 1
  if(date1 < date2) return -1
  return 0
}


module.exports = { createDaysFromTrip, getDatesWithinRange, sortDatesInArray }
//Fetch list of special_days
//Bubble sort the list
//Get startdate, total sessions of class
//for each start date, construct the next matched date with the day_session's value in class
//if that new date matches the special_days'one, set the date_so_far to this new date then continue to repeat
//otherwise, 1 session is counted, set the date_so_far to this new date

const mongoose = require("mongoose");
const SpecialDays = require("../../models/special_days");

// mongoose
//   .connect(
//     "mongodb+srv://Trung:0125114735@cluster0.nhi8c.mongodb.net/Gemmy?retryWrites=true&w=majority"
//   )
//   .then(() => {
//     console.log("Connected to database!");
//   })
//   .catch(() => {
//     console.log("Connection failed!");
//   });

function bubble_sort(dates) {
  flag = false;
  var n = dates.length;
  for (var i = 0; i < n; i++) {
    for (var j = 0; j < n - i - 1; j++) {
      if (dates[j] > dates[j + 1]) {
        flag = true;
        date_temp = dates[j];
        dates[j] = dates[j + 1];
        dates[j + 1] = date_temp;
      }
    }
    if (flag == false) {
      break;
    }
  }
}

//find all special days, exclude _id fields
let special_days = SpecialDays.find({}, function (err, specialDays) {
  if (err) return handleError(err);

  special_days = specialDays.map((specialDay) => {
    const eachDay = specialDay;
    return eachDay.toObject({
      transform: (eachDay, ret) => {
        delete ret._id;
        return ret;
      },
    });
  });
});

// setTimeout(() => {
//   console.log(special_days);
// }, 5000);

function binary_search_in_dates(date_to_find, dates, low, high) {
  if (low > high) {
    return false;
  }
  mid = Math.floor((low + high) / 2);
  if (dates[mid].getTime() === date_to_find.getTime()) {
    return true;
  }
  if (dates[mid].getTime() > date_to_find.getTime()) {
    return binary_search_in_dates(date_to_find, dates, low, mid - 1);
  } else {
    return binary_search_in_dates(date_to_find, dates, mid + 1, high);
  }
}

//add 1 to current day
//constantly check if this day matches 1 element in the day_session list

//this function will return the numeric value for the week day
//Sun - Sar <=> 0 - 6
function get_numeric_given_day_in_week(given_day){
  var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  for(var i = 0, n = days.length; i < n; i++){
    if(given_day === days[i]){
      return i;
    }
  }
}

function get_next_matched_day(date_so_far, class_session) {
  let numeric_day = -1;
  do{
    //find next date's value ( +1) and reassign to the same date_so_far variable
    date_so_far.setDate(date.date_so_far.getDay() + 1);
    
    for(var i = 0, n = class_session.length; i < n; i++){
      numeric_day = get_numeric_given_day_in_week(class_session[i].day);
      if(date_so_far.getDay() == numeric_day){
        return date_so_far;
      }
    }
  }while(true);
}

//for each start date, construct the next matched date with the day_session's value in class
//if that new date matches the special_days'one, set the date_so_far to this new date then continue to repeat
//otherwise, 1 session is counted, set the date_so_far to this new date

//sort dates to perform binary search
let sorted_special_days = bubble_sort(special_days);
exports.get_class_end_date = (start_date, total_session, class_session) => {
  //start date takes 1 session
  total_session--;
  
  condition_decisor = 0;
  let date_so_far;
  while (total_session != 0) {
    
    if(condition_decisor == 0){
      //for the first time this loop is triggered, calculate the next date given start_date
      date_so_far = get_next_matched_day(start_date,class_session);
    }
    else{
      //any other time, dynamically pass the current date as argument 
      date_so_far = get_next_matched_day(date_so_far,class_session);
      condition_decisor = 1;
    }
    
    //if the date is not in special_days list
    //it takes 1 session
    if (!binary_search_in_dates(date_so_far,sorted_special_days,0,sorted_special_days.length)) {
      total_session--;
    }
  }
  //if the while loop ends, total_session will be equal to 0
  //date_so_far now takes the last study date
  return date_so_far;
}

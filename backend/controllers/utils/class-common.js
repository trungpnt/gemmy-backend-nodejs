//Fetch list of special_days
//Bubble sort the list
//Get startdate, total sessions of class
//for each start date, construct the next matched date with the day_session's value in class
//if that new date matches the special_days'one, set the date_so_far to this new date then continue to repeat
//otherwise, 1 session is counted, set the date_so_far to this new date

const mongoose = require("mongoose");
const SpecialDays = require("../../models/special_days");

mongoose
  .connect(
    "mongodb+srv://Trung:0125114735@cluster0.nhi8c.mongodb.net/Gemmy?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

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

//find all special days
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

setTimeout(() => {
  console.log(special_days);
}, 5000);

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
function get_next_matched_day(current_date, day_session) {
  
}

//for each start date, construct the next matched date with the day_session's value in class
//if that new date matches the special_days'one, set the date_so_far to this new date then continue to repeat
//otherwise, 1 session is counted, set the date_so_far to this new date
function get_class_end_date( start_date, total_session, special_days, day_session ) {
  let sorted_special_days = bubble_sort( special_days );
  let current_date = start_date;
  while ( total_session != 0) {
    new_date = get_next_matched_day (current_date);
    if( binary_search_in_dates ( new_date, special_days, 0, special_days.length )){
      get_next_matched_day( new_date, day_session);
    } 
    else{
      current_date = new_date;
      total_session--;
    }
  }
}

/**
 * @author culi_dev
** @function fetch_list_of_special_days - fetch a list of special days using SpecialDays Model  
** @function bubble_sort(@param fetch_list_of_special_days)
** for each start date, construct the next matched date with the day_session's value in class
** if that new date matches the special_days'one, set the date_so_far to this new date then continue to repea
** otherwise, 1 session is counted, set the date_so_far to this new date
 */

const SpecialDays = require("../../models/special_days");

const specialDaysQuery = SpecialDays.find();
let special_days;

/**
 * @returns all special days []
 */
specialDaysQuery
  .then((specialDays) => {
    special_days = specialDays.map((specialDay) => {
      return specialDay.toObject();
    });
  })
  .catch((error) => {
    console.log("Fetching special days failed!");
  });

/**
 * 
 * @param {} ms 
 * @returns Promise instance  
 */
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * @param {*} dates 
 * sort special days in ascending order
 */
async function bubble_sort(dates) {
  await sleep(3000);
  dates = special_days;
  flag = false;
  var n = dates.length;
  for (var i = 0; i < n; i++) {
    for (var j = 0; j < n - i - 1; j++) {
      if (dates[j].date > dates[j + 1].date) {
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
/**
 * 
 * @param {*} date_to_find 
 * @param {*} dates 
 * @param {*} low 
 * @param {*} high 
 * @returns if date_to_find is found
 */
function binary_search_in_dates(date_to_find, dates, low, high) {
  if (low > high) {
    return false;
  }
  mid = Math.floor((low + high) / 2);
  if (dates[mid].date.getTime() === date_to_find.getTime()) {
    return true;
  }
  if (dates[mid].date > date_to_find) {
    return binary_search_in_dates(date_to_find, dates, low, mid - 1);
  } else {
    return binary_search_in_dates(date_to_find, dates, mid + 1, high);
  }
}

/**
 * 
 * @returns a map 
 */
function initDayMap() {
  var map = {};
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  for (let i = 0, n = days.length; i < n; i++) {
    map[days[i]] = i;
  }
  return map;
}
/**
 * initDayMap()
 */
var map = initDayMap();

/**
 * 
 * @param {*} date_so_far 
 * @param {*} class_session 
 * @returns 
 */
function is_day_in_class_session(date_so_far, class_session) {
  for (var i = 0, n = class_session.length; i < n; i++) {
    if (date_so_far.getDay() == map[class_session[i].day]) {
      return true;
    }
  }
}

/**
 * this function repeats until the next matched day is found.
 * date_so_far gets updated at every iteration 
 * validate against the class session'
 * @param {*} date_so_far 
 * @param {*} class_session 
 * @returns the next day that matches the class session's  
 */
function get_next_matched_day(date_so_far, class_session) {
  
  do {
    date_so_far.setDate(date_so_far.getDate() + 1);
    if (is_day_in_class_session(date_so_far, class_session)) {
      return date_so_far;
    }
  } while (true);
}


/**
 * for each date, construct the next matched date with the day_session's value in class
 * if that new date matches the special_days'one, set the date_so_far to this new date then continue the loop to find the next date
 * otherwise, 1 session is counted, also set the date_so_far to this new date
 * @param {*} start_date 
 * @param {*} total_session 
 * @param {*} class_session 
 * @returns end_date
 */
exports.get_class_end_date = (start_date, total_session, class_session) => {
  bubble_sort(special_days);

  /**
   * initialize Javascript date object 
   */
  let iso_start_date = new Date(start_date);
  let date_so_far;

  /**
   * separately handle the first inputted date
   * does it fall within class sessions?
   */
  if (is_day_in_class_session(iso_start_date, class_session)) {
    total_session--;
  } else {
    exact_start_date = get_next_matched_day(iso_start_date, class_session);
    total_session--;
    date_so_far = exact_start_date;
  }

  /**
   * enter the loop for the remaining days.
   */
  while (total_session != 0) {
    date_so_far = get_next_matched_day(date_so_far, class_session);
    /**
     * if the date is not in special_days list, it takes 1 session
     */
    if (!binary_search_in_dates(date_so_far, special_days, 0, special_days.length)) {
      total_session--;
    }
    
  }
  /**
   * when the while loop ends, total_session will be equal to 0
   * date_so_far now takes the last date as output
   */ 
  console.log(date_so_far.getDay());
  return date_so_far;
};


//
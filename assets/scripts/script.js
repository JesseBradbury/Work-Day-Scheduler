// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //


  // This is the code that creates the time boxes on the page.

  // This converts the time to an AM/PM format.
  function hourAmPm(hour) {
    if (hour === 0) {
      return "12AM";
    } else if (hour === 12) {
      return "12PM";
    } else if (hour < 12) {
      return hour + "AM";
    } else {
      return (hour - 12) + "PM";
    }
  }

  // Start time of the Day
  var startingTime = 9

  // Loop that creates the blocks on the page 9 time currently
  // TODO: Could add user entry so they can select tehir start and end time from a drop down menu. 
  for (let i = 0; i < 9; i++) {

    var convertedTime = hourAmPm(startingTime);
    var scheduleBlock = $("<section></section>");
    var blockId = "hour-" + startingTime;
    scheduleBlock.addClass("row time-block past");
    scheduleBlock.attr("id", blockId);
    $(".container-lg").append(scheduleBlock);

    var calendarTime = $("<section></section>");
    calendarTime.addClass("col-2 col-md-1 hour text-center py-3")
    calendarTime.text(convertedTime);
    scheduleBlock.append(calendarTime);

    var calendarTask = $("<textarea></textarea>");
    calendarTask.addClass("col-8 col-md-10 description");
    calendarTask.attr("rows", "3");
    scheduleBlock.append(calendarTask);

    var calendarSave = $("<button></button>");
    calendarSave.addClass("btn saveBtn col-2 col-md-1");
    calendarSave.attr("aria-label", "save");
    scheduleBlock.append(calendarSave);

    var saveAnimation = $("<i></i>");
    saveAnimation.addClass("fas fa-save");
    saveAnimation.attr("aria-hidden", "true");
    calendarSave.append(saveAnimation);

    startingTime++;
  }

  // This is the button logic, it stores the ID of the text box and the value 
  // that is writen into the textentry and stores it to the local storage. 
  $(".btn").on("click", function () {
    console.log("Button Clicked");

    var timeBlock = $(this).parent().attr("id");
    console.log("time: ", timeBlock);

    var userTask = $(this).prev().val();
    console.log(userTask)

    // ?????????????
    function storeTasks(workTime, workTask) {
      var savedSchedule = JSON.parse(localStorage.getItem("savedSchedule")) || [];

      var newTask = {
        workTime: timeBlock,
        workTask: userTask
      };
      savedSchedule.push(newTask);

      localStorage.setItem("savedSchedule", JSON.stringify(savedSchedule));
    }
    storeTasks(timeBlock, userTask);

  });


  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //

  // Variable for the current time
  var currentTime = dayjs().hour();

  // We need to set up some if statements that will check the time ID of the box to 
  // the currentTime varriable. Then adds the class of past present or future. 

  // We need to make the variable that will get a comparable value from the box div
  function colorTime() {
    if (currentTime > startingTime) {
      // Make color green
    }
    if (currentTime == startingTime) {
      // Make color red
    }
    if (currentTime < boxTime) {
      // Make color gray
    }
  }
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //

  $(document).ready(function () {
    // Retrieve saved tasks from local storage
    var savedSchedule = JSON.parse(localStorage.getItem("savedSchedule")) || [];

    // Loop through each saved task
    savedSchedule.forEach(function (task) {
      var textarea = $("#" + task.workTime).find("textarea");
      textarea.val(task.workTask);
    });
  });


  // TODO: Add code to display the current date in the header of the page.
  var currentDate = dayjs().format("dddd, MMMM DD");

  $("#currentDay").text(currentDate);

});

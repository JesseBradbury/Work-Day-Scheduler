
$(function () {

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


  // Sets the current time from Dayjs. 
  var currentTime = dayjs().hour();


  // This is the function that creates the boxes and sets their colors 
  // based on the time from Dayjs. 
  function colorTime(startingTime) {

    var convertedTime = hourAmPm(startingTime);
    var scheduleBlock = $("<section></section>");
    if (currentTime > startingTime) {
      // Make color green
      scheduleBlock.addClass("past");
    }
    if (currentTime === startingTime) {
      // Make color red
      scheduleBlock.addClass("present");
    }
    if (currentTime < startingTime) {
      // Make color gray
      scheduleBlock.addClass("future");
    }
    var blockId = "hour-" + startingTime;
    scheduleBlock.addClass("row time-block");
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
  // This is the loop that will create the boxes, right now it is set from 9AM to 5PM
  for (let i = 9; i <= 17; i++) {
    colorTime(i);
  }

  // This will display a mesage informing the user when they have saved something to localstorage.
  var saveMessageDisplayed = false;

  function displaySaveNotification(message) {
    if (!saveMessageDisplayed) {
      var saveNotification = $("<section></section>");
      saveNotification.addClass("save-message text-center");
      saveNotification.text(message);
      $(".container-lg").prepend(saveNotification);
      saveMessageDisplayed = true;
    }
  }
  // This is the button logic, it stores the ID of the text box and the value 
  // that is writen into the textentry and stores it to the local storage. 
  $(".btn").on("click", function () {

    displaySaveNotification("Appointment Added to localstorage")
    console.log("Button Clicked");

    var timeBlock = $(this).parent().attr("id");
    console.log("time: ", timeBlock);

    var userTask = $(this).prev().val();
    console.log(userTask)

    // This stores the tasks once the save button is pressed. Tasks and the ID are saved as a Time!
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

  $(document).ready(function () {
    // Retrieve saved tasks from local storage
    var savedSchedule = JSON.parse(localStorage.getItem("savedSchedule")) || [];

    // Loop through each saved task
    savedSchedule.forEach(function (task) {
      var textarea = $("#" + task.workTime).find("textarea");
      textarea.val(task.workTask);
    });
  });


  // This displays the current date in the header of the page.
  var currentDate = dayjs().format("dddd, MMMM DD");

  $("#currentDay").text(currentDate);

});

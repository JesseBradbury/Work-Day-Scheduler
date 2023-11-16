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
    if (currentTime > boxTime) {
      // Make color green
    }
    if (currentTime == boxTime) {
      // Make color red
    }
    if (currentTime < boxTme) {
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

//for all things javascript

//https://github.com/davidshimjs/qrcodejs
//https://youtu.be/oR_u2TbHwC8


var time = {}; //stores time variables ('minutes' and 'seconds') in this globally scoped variable 'time'

function startTimer() { //this function is used to start the timer countdown
  var timer = document.getElementById("timerButton"); //getting the timer button id...
  timer.style.display = "none"; //... to be able to hide it (to prevent timer resets). If the user does happen to need to reset the timer they can refresh the page
  var gameButtons = document.getElementById("gameTrackerButtons");
  gameButtons.style.display = "block";
  var review = document.getElementById("reviewButton"); //here we'll hide the button that gives access to the next page to avoid accidental clicks. when the page is loaded, the button is already hidden
  var countDownDate = new Date(); //get the current time, then find the time in 2:30 minutes later
  countDownDate.setSeconds(countDownDate.getSeconds() + 151); //+1 for delay | 150 seconds = 2:30 minutes
  //'repeat' is used to loop the following code block
  var repeat = setInterval(function() {
    var currentTime = new Date().getTime(); //get the current time
    var timeLeft = countDownDate - currentTime; //calculate how much time is left
    time.minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60)); //calculate minutes
    time.seconds = Math.floor((timeLeft % (1000 * 60)) / 1000); //calculate seconds (credits to https://www.w3schools.com/howto/howto_js_countdown.asp)
    document.getElementById("timer").innerHTML = time.minutes + "m " + time.seconds + "s "; //print the timer
    if (timeLeft < 0) { //if the timer goes to 0, prints that the game is over
      clearInterval(repeat); //stops repeating
      document.getElementById("timer").innerHTML = "GAME OVER"; //prints 'GAME OVER'
      review.style.display = "block"; //show the review button
    }
  }, 1000);
}

function checkTime() { //this function is used to check the time left, it's used when logging robot actions
  return [time.minutes, time.seconds];
}

function confirmation(page) { //to use this function pass the 'return' location in the 'page' variable. Ex: onclick='confirmation("index.html");'
  if (window.confirm('Are you sure you want to return?\nAll progress on this page will be lost.')) { //just double checking :)
    window.location = page;
  }
}

function preGameData() {
  localStorage.cleaer("alliancePosition"); //clears localStorage
  localStorage.clear("startingPosition");

  if(document.getElementById('alliancePosition').checked) {
    localStorage.setItem("alliancePosition", 'r1');
  } //else if

  if(document.getElementById('pos1').checked) { //saves robots starting position in localStorage
    localStorage.setItem("startingPosition", '1');
  } else if (document.getElementById('pos2').checked) {
    localStorage.setItem("startingPosition", '2');
  } else if (document.getElementById('pos3').checked){
    localStorage.setItem("startingPosition", '3');
  } else {
    alert("eyo you forgor to select");
  }

  if (localStorage.getItem("startingPosition") != null) {
    window.location = 'recording.html';
  }
  
}

//game type dependent functions below

var highGoals = [];
var lowGoals = [];

function fetchData() {
  document.getElementById("highGoalBox").value = localStorage.getItem("highGoalAmount");
  //add for other boxes
}

function highGoal() {
  t = checkTime(); //gets the current time
  highGoals.push(t); //logs the time in the 'highGoals' array | the length of this array is results in the number of scores
  localStorage.setItem("highGoalAmount", highGoals.length); //logs data to show on review page (see fetchData())
}
//for all things javascript

//https://github.com/davidshimjs/qrcodejs
//https://youtu.be/oR_u2TbHwC8


var time = {}; //stores time variables ('minutes' and 'seconds') in this globally scoped variable 'time'

function startTimer() { //this function is used to start the timer countdown
  var timer = document.getElementById('timerButton'); //getting the timer button id...
  timer.style.display = 'none'; //... to be able to hide it (to prevent timer resets). If the user does happen to need to reset the timer they can refresh the page
  var gameButtons = document.getElementById('gameTrackerButtons');
  gameButtons.style.display = 'block';
  var review = document.getElementById('reviewButton'); //here we'll hide the button that gives access to the next page to avoid accidental clicks. when the page is loaded, the button is already hidden
  var countDownDate = new Date(); //get the current time, then find the time in 2:30 minutes later
  countDownDate.setSeconds(countDownDate.getSeconds() + 151); //+1 for delay | 150 seconds = 2:30 minutes
  //'repeat' is used to loop the following code block
  var repeat = setInterval(function() {
    var currentTime = new Date().getTime(); //get the current time
    var timeLeft = countDownDate - currentTime; //calculate how much time is left
    time.minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60)); //calculate minutes
    time.seconds = Math.floor((timeLeft % (1000 * 60)) / 1000); //calculate seconds (credits to https://www.w3schools.com/howto/howto_js_countdown.asp)
    document.getElementById('timer').innerHTML = time.minutes + 'm ' + time.seconds + 's '; //print the timer
    if (timeLeft < 0) { //if the timer goes to 0, prints that the game is over
      clearInterval(repeat); //stops repeating
      document.getElementById('timer').innerHTML = 'GAME OVER'; //prints 'GAME OVER'
      review.style.display = 'block'; //show the review button
    }
  }, 1000);
}

function checkTime() { //this function is used to check the time left, it's used when logging robot actions
  return [time.minutes + 'm' + time.seconds + 's'];
}

function confirmation(page) { //to use this function pass the 'return' location in the 'page' variable. Ex: onclick='confirmation("index.html");'
  if (window.confirm('Are you sure you want to return?\nAll progress on this page will be lost.')) { //just double checking :)
    window.location = page;
  }
}

function preGameData() {
  localStorage.clear('matchNumber');
  localStorage.clear('scoutName'); //clears localStorage
  localStorage.clear('teamNumber');
  localStorage.clear('alliancePosition');
  localStorage.clear('startingPosition');

  localStorage.setItem('matchNumber', (document.getElementById('matchNumber')).value);
  localStorage.setItem('scoutName', (document.getElementById('scoutName')).value);
  localStorage.setItem("teamNumber", (document.getElementById('teamNumber')).value);

  if(document.getElementById('posr1').checked) { //saves robot's alliance position in localStorage
    localStorage.setItem('alliancePosition', 'r1');
  } else if (document.getElementById('posr2').checked) {
    localStorage.setItem('alliancePosition', 'r2');
  } else if (document.getElementById('posr3').checked) {
    localStorage.setItem('alliancePosition', 'r3');
  } else if (document.getElementById('posb1').checked) {
    localStorage.setItem('alliancePosition', 'b1');
  } else if (document.getElementById('posb2').checked) {
    localStorage.setItem('alliancePosition', 'b2');
  } else if (document.getElementById('posb3').checked) {
    localStorage.setItem('alliancePosition', 'b3');
  }

  if(document.getElementById('pos1').checked) { //saves robot's starting position in localStorage
    localStorage.setItem('startingPosition', 'pos1');
  } else if (document.getElementById('pos2').checked) {
    localStorage.setItem('startingPosition', 'pos2');
  } else if (document.getElementById('pos3').checked){
    localStorage.setItem('startingPosition', 'pos3');
  }

  if (localStorage.getItem('scoutName') != '' && localStorage.getItem('teamNumber') != '' && localStorage.getItem('alliancePosition') != null && localStorage.getItem('startingPosition') != null) {
    window.location = 'recording.html';
  } else {
    alert('Some information is missing!');
  }
  
}

//game type dependent functions below

var highGoals = [];
var lowGoals = [];

function fetchData() {
  document.getElementById('matchNumber').value = localStorage.getItem('matchNumber'); //adds prefill
  document.getElementById('scoutName').value = localStorage.getItem('scoutName');
  document.getElementById('teamNumber').value = localStorage.getItem('teamNumber');
  document.getElementById('alliancePositionSpot').value = localStorage.getItem('alliancePosition');
  document.getElementById('robotPosition').value = localStorage.getItem('startingPosition');

  highGoalReview();
}

function highGoal() {
  t = checkTime(); //gets the current time
  highGoals.push(t); //logs the time in the 'highGoals' array | the length of this array is results in the number of scores
  localStorage.setItem('highGoals', highGoals); //logs data to show on review page (see fetchData())
}

function highGoalReview() {
  highGoalsString = localStorage.getItem('highGoals'); //retreives 'localStorage' data (but it returns as a string)
  highGoalsString += ','; //just add a comma at the end. This is a work around to a bug that would miss the last time stamp
  var highGoalAmount = highGoalsString.split(",").length - 1; //checks the amount of time stamps by checking how many commas seperate them
  var tmpList = '';
  for (i=0;i<highGoalsString.length;i++) { //this loop just compiles all characters that represent one time stamp into one value..
    if (highGoalsString[i] != ',') {
      tmpList += highGoalsString[i];
    } else {
      highGoals.push(tmpList); //..and then that value is placed back into 'highGoals'
      tmpList = [];
    }
  }
  for (i=0;i<highGoalAmount;i++) { //for every goal, it calls 'createCheckbox()' for that timestamp
    var goalTime = highGoals[i];
    createCheckbox(goalTime);
  }
}

function createCheckbox(checkboxLabel) { //this function creates a checkbox when it is called
  var highGoalDiv = document.getElementById('highGoal');
  var checkbox = document.createElement('input');
  var label = document.createElement('label');
  var br = document.createElement('br');
  checkbox.type = 'checkbox';
  checkbox.name = "name"; //might add these in the for loop too to be able to check which one is checked
  checkbox.id = "id";
  label.appendChild(document.createTextNode(checkboxLabel));// this will display the time
  //add for loop
  highGoalDiv.appendChild(checkbox);
  highGoalDiv.appendChild(label);
  highGoalDiv.appendChild(br);
}
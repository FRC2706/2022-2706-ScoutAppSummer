//for all things javascript

function startTimer() { //this function is used to start the timer countdown
  var rev = document.getElementById("reviewButton"); //here we'll hide the button that gives access to the next page to avoid accidental clicks. when the page is loaded, the button is already hidden
  var countDownDate = new Date(); //get the current time, then find the time in 2:30 minutes later
  countDownDate.setSeconds(countDownDate.getSeconds() + 151); //+1 for delay | 150 seconds = 2:30 minutes
  //'repeat' is used to loop the following code block
  var repeat = setInterval(function() {
    var currentTime = new Date().getTime(); //get the current time
    var timeLeft = countDownDate - currentTime; //calculate how much time is left
    var minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60)); //calculate minutes
    var seconds = Math.floor((timeLeft % (1000 * 60)) / 1000); //calculate seconds (credits to https://www.w3schools.com/howto/howto_js_countdown.asp)
    document.getElementById("timer").innerHTML = minutes + "m " + seconds + "s "; //print the timer
    if (timeLeft < 0) { //if the timer goes to 0, prints that the game is over
      clearInterval(repeat); //stops repeating
      document.getElementById("timer").innerHTML = "GAME OVER"; //prints 'GAME OVER'
      rev.style.display = "block"; //show the review button
    }
  }, 1000);
}

function confirmation(page) { //to use this function pass the 'return' location in the 'page' variable. Ex: onclick='confirmation("index.html");'
  if (window.confirm('Are you sure you want to return?\nAll progress on this page will be lost.')) { //just double checking :)
    window.location = page;
  }
}
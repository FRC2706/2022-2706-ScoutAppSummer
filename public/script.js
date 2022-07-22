//for all things javascript

function startTimer() {
    // Set the date we're counting down to
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
        clearInterval(repeat);
        document.getElementById("timer").innerHTML = "GAME OVER";
      }
    }, 1000);
  }
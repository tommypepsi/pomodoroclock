var currentInfo = {
  workTime : 25,
  breakTime : 5,
  currentTimer : "workTime",
  remainingTime : 25 * 60
};
var audio = new Audio("http://soundbible.com/grab.php?id=1815&type=mp3")

var timeout;
function timer(time){
  currentInfo.remainingTime = time;
  rotation(time);
  document.getElementById("changeTimer").style.display = "inline-block";
  timeout = setTimeout(function(){

    document.getElementById("timeDisplay").innerHTML = getRemainingTime(time - 1);
    if(time-1 === 0){
      audio.play();
      if(currentInfo.currentTimer == "workTime"){
        currentInfo.currentTimer = "breakTime";
        currentInfo.remainingTime = currentInfo.breakTime * 60;
        document.getElementById("changeTimer").innerHTML = "Start working";
      }
      else{
        currentInfo.currentTimer = "workTime";
        currentInfo.remainingTime = currentInfo.workTime * 60;
        document.getElementById("changeTimer").innerHTML = "Take a break";
      }
      return timer(currentInfo.remainingTime)
    }
    timer(time - 1)
  }, 1000)
}
function getRemainingTime(time){
  var minutes = Math.floor(time/60)
  time %= 60;
  var seconds = Math.floor(time)
  return ("0" + minutes).slice(-2) + ":" + ("0" + seconds).slice(-2)
}
function rotation(time){
  var percent = 100 * time / 1500;
  var rotation = percent * 360 / 100;

  if(time > 1500){
    document.getElementById("numberTimer").innerHTML = "x" + Math.ceil(time / 1500);
  }
  else{
    document.getElementById("numberTimer").innerHTML = "";
  }
  console.log(-rotation)
  document.getElementById("fullClock").style.transform = "translate(-50%, -50%) rotate(" + -rotation + "deg)";
}

window.onload = function(){


  document.getElementById("pause").onclick = function(){
    if(document.getElementById("pause").innerHTML == "pause"){
      clearTimeout(timeout);
      document.getElementById("pause").innerHTML = "Continue";
      console.log(currentInfo.remainingTime);
    }
    else if(document.getElementById("pause").innerHTML == "Start"){
      document.getElementById("changeTimer").innerHTML = "Take a break";
      currentInfo.remainingTime = currentInfo.workTime * 60;
      document.getElementById("pause").innerHTML = "pause";
      document.getElementById("timeDisplay").innerHTML = getRemainingTime(currentInfo.remainingTime);
      timer(currentInfo.remainingTime)
    }
    else{
      timer(currentInfo.remainingTime)
      document.getElementById("pause").innerHTML = "pause";
    }
  }
  document.getElementById("reset").onclick = function() {
    document.getElementById("changeTimer").style.display = "none";
    currentInfo.currentTimer = "workTime"
    document.getElementById("changeTimer").innerHTML = "";
    clearTimeout(timeout);
    document.getElementById("pause").innerHTML = "Start";
    document.getElementById("timeDisplay").innerHTML = "";
    currentInfo.remainingTime = currentInfo.workTime * 60;
    rotation(currentInfo.remainingTime)
  }
  document.getElementById("workSubs").onclick = function(){
    if(document.getElementById("workMinutes").innerHTML > 1){
      document.getElementById("workMinutes").innerHTML -= 1;
      currentInfo.workTime = parseInt(document.getElementById("workMinutes").innerHTML);
    }

  }
  document.getElementById("workPlus").onclick = function(){
    document.getElementById("workMinutes").innerHTML = parseInt(document.getElementById("workMinutes").innerHTML) + 1;
    currentInfo.workTime = parseInt(document.getElementById("workMinutes").innerHTML);
  }
  document.getElementById("breakSubs").onclick = function(){
    if(document.getElementById("breakMinutes").innerHTML > 1){
      document.getElementById("breakMinutes").innerHTML -= 1;
      currentInfo.breakTime = parseInt(document.getElementById("breakMinutes").innerHTML);
    }
  }
  document.getElementById("breakPlus").onclick = function(){
    document.getElementById("breakMinutes").innerHTML = parseInt(document.getElementById("breakMinutes").innerHTML) + 1;
    currentInfo.breakTime = parseInt(document.getElementById("breakMinutes").innerHTML);
  }
  document.getElementById("changeTimer").onclick = function(){
    clearTimeout(timeout);
    if(document.getElementById("changeTimer").innerHTML == "Take a break"){
      currentInfo.currentTimer = "breakTime";
      currentInfo.remainingTime = currentInfo.breakTime * 60;
      document.getElementById("changeTimer").innerHTML = "Start working";
    }
    else{
      currentInfo.currentTimer = "workTime";
      currentInfo.remainingTime = currentInfo.workTime * 60;
      document.getElementById("changeTimer").innerHTML = "Take a break";
    }
    document.getElementById("timeDisplay").innerHTML = getRemainingTime(currentInfo.remainingTime);
    timer(currentInfo.remainingTime);
  }
}

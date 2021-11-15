const buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let startGame = false;
let level = 0;

//first keydown to remove listener and run nextSequence without any more clicks
function hasGameStarted() {
  if (!startGame) { //if starGame not equal to false then click has occured.
    setTimeout(function() {
        $("h2").remove();
        startGame = true;
        level = 0;
        gamePattern = [];
        nextSequence();
      },400);
    }
  }



function nextSequence() {
  //the start of every gamesequence.
  level++;
  userClickedPattern = [];
  //target h1 to change to "level" + level and increase by 1
  $("h1").text("Level " + level);
  //randomly select a button.
  const randomChosenColor = buttonColors[Math.floor(Math.random() * buttonColors.length)];
  //animate and play sound to buttons when randomly interatced by game.
  $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
  //record game sequence.
  gamePattern.push(randomChosenColor);
  //play button sound
  playSound(randomChosenColor);
  checkAnswer(gamePattern.slice(-1))// ************CODE WORKS EVEN WITHOUT THIS LINE WHY!????.
}

//Users button clicks.
function userClicks() {
    const userChosenColor = this.id;
    //animate button when clicked.
    animatePress(userChosenColor);
    //play button sound when clicked.
    playSound(userChosenColor);
    //record user sequence.
    userClickedPattern.push(userChosenColor);
    checkAnswer(userClickedPattern.length - 1); // returns the last index that this.id is positioned in the array, should always be last position.
}
//animate button when clicked
function animatePress(currentColor) {
    $('#' + currentColor).addClass("pressed");
    //take css styling away after 100 milliseconds.
    setTimeout(function() {
      $("#"+ currentColor).removeClass("pressed")
    },100);
  }

function checkAnswer(currentLevel) {
  // Check if the LAST button clicked is right
  if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
    // set a variable to count how many colors the user got right
    let count = 0;
    // loop through the two arrays, and compare if EACH ONE of the values is the same as the other
      for (let i = 0; i < gamePattern.length; i++) {
        if (gamePattern[i] === userClickedPattern[i]) {
          // if the two values match, count + 1
          count++;
        }
      }
      // ONLY if the count is the same number as gamePattern length,
      // (meaning each one of the colors was right) then it's success
      if (count === gamePattern.length) {
        console.log("success");
        setTimeout(function(){
            nextSequence();
          }, 1000);
      }
        //otherwise its the wrong trigger, game over.
      } else {

          console.log("wrong");
            var wrongAudio = new Audio("sounds/wrong.mp3");
            wrongAudio.play();
            $("body").addClass("game-over");
            $("h1").text("Game Over");

            startGame = false;
            // hasGameStarted();

            setTimeout(function() {
              $("body").removeClass("game-over")

            },1000);
            $("h1").text("Press any key to restart.")
        }

    }


//was originally in nextSequence function, but refactored so that it is passed into two functions.
function playSound(name) {
  const colourSound = new Audio("sounds/" + name + ".mp3");
  colourSound.play();
}





$(".btn").on("click", userClicks);
document.addEventListener("keydown", hasGameStarted);

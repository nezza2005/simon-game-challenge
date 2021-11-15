const colorArray = ["red", "blue", "green", "yellow"];
const randomColor = colorArray[Math.floor(Math.random() * colorArray.length)];
let gamePattern = [];
const playerPattern = [];
let level = 0;
let startGame = false;




//record and store game sequence and play sound to button game chooses..
function gameSequence(event) {
//toggle startGame to true.
  startGame = true;
//animate buttons when interatced with.
  if ($(".btn").hasClass(randomColor)) {
      $("#" + randomColor).fadeOut(100).fadeIn(100);
      gamePattern.push(randomColor);
      playSound(randomColor);
//target h1 to change to "level" + level and increase by 1
      $("h1").text("Level " + level);
    }

//if gameStart === true remove click listener.
  if (startGame === true) {
    document.removeEventListener("keydown", gameSequence);
  }
}


//animate the button that gets clicked by the player.
function playerSequence(event) {
  const userChosenColor = this.id;
  let activeButton = $(".btn");
//record and store player click and sequences.
  playerPattern.push(userChosenColor);
//add sound to button when clicked.
  playSound(this.id);
  console.log(playerPattern)
//add animation to button when clicked.
  this.classList.add("pressed");

//remove animation from all buttons shortly after clicked.
  setTimeout(function() {
    activeButton.removeClass("pressed");
    }, 100);
}

//write a function to compare if the player follows the correct sequence or not.
function checkAnswer(currentLevel) {
const playerLastChoice = playerPattern.slice(-1);
const gameLastChoice = gamePattern.slice(-1);

  for (const i = 0; i <gamePattern.length; i++) {
    if (playerPattern[i] === gamePattern[i] && playerPattern.slice(-1) === gamePattern.slice(-1) && startGame === true) {
      gameSequence();
    } else startGame = false;

  }
}



//was originally in playGame function, but refactored so that it is passed into two functions.
function playSound(name) {
  const colourSound = new Audio("sounds/" + name + ".mp3");
  colourSound.play();
}



//listeners
document.addEventListener("keydown", gameSequence);
$(".btn").on("click", playerSequence);

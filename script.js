const buttonColours = ['red', 'blue', 'green', 'yellow']
let gamePattern = [];
let userClickedPattern = [];

let gameStart = false;
let level = 0;

$('h1').text("Press A Key to Start");
$(document).on('keydown', () => {
    if (!gameStart) {
        console.log(gameStart);
        $('h1').text(`Level ${level}`);
        setTimeout(() => {
            nextSequence();
            gameStart = true;
        }, 500)
    }
})

$('.btn').on('click', function () {
    let userChosenColour = this.id;
    console.log(userChosenColour);
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    let x = userClickedPattern.length - 1
    checkAnswer(x);
})

function nextSequence() {
    level++;
    $('h1').text(`Level ${level}`);
    let randomNumber = Math.floor(Math.random() * 3) + 1;
    let randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);
    $(`#${randomChosenColour}`).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour)
    animatePress(randomChosenColour);


}

function playSound(element) {
    let sound = new Audio(`sounds/${element}.mp3`);
    sound.play();
}

function animatePress(currentColour) {
    $(`.${currentColour}`).addClass('pressed');
    setTimeout(() => {
        $(`.${currentColour}`).removeClass('pressed');
    }, 100)
}


function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
        console.log("success")
        if (userClickedPattern.length == gamePattern.length) {
            setTimeout(() => {
                nextSequence();
                userClickedPattern = [];
            }, 1000)

        }
    } else {
        let gameOver = new Audio(`sounds/wrong.mp3`);
        gameOver.play();
        $('body').addClass('game-over')
        setTimeout(() => {
            $('body').removeClass('game-over');
        }, 200)
        $('h1').text('Game Over, Press Any Key to Restart')
        startOver();

    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    gameStart = false;
    userClickedPattern = [];
}